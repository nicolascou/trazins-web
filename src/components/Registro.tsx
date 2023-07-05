import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllMaterials } from '../features/materialThunks';
import { toast } from 'react-toastify';
import { selectMaterial } from '../features/materialSlice';
import BotonesTipos from './BotonesTipos';
import { cleanRegistro, setRegistro } from '../features/registroSlice';

const Registro = () => {
  const [inputCode, setInputCode] = useState('');

  const dispatch = useAppDispatch();
  const { allMaterials, selectedMaterials } = useAppSelector((state) => state.material.data);
  const { intervencion, fecha, gabinete, numeroHistoriaClinica } = useAppSelector((state) => state.registro);

  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(getAllMaterials());
  }, [dispatch]);

  const addMaterial = () => {
    for (let material of selectedMaterials) {
      if (material.codigo === inputCode) {
        toast.error('El material ya está añadido');
        return;
      }
    }

    let found = false;
    for (let material of allMaterials) {
      if (material.codigo === inputCode) {
        dispatch(selectMaterial(material));
        found = true;
        break;
      }
    }
    if (found) {
      setInputCode('');
      toast.success('Material Añadido!');
    } else {
      toast.error('Material No encontrado');
    }
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);

      let bodyObj = {
        registro: {
          intervencion: formData.get('intervencion')?.toString(),
          gabinete: formData.get('gabinete')?.toString(),
          numeroHistoriaClinica: formData.get('numeroHistoriaClinica')?.toString(),
          fecha: formData.get('fecha')?.toString(),
        },
        materiales: selectedMaterials,
      };

      await fetch(process.env.REACT_APP_API_URL + '/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      });

      dispatch(cleanRegistro());

      navigate('/');
    }
  };

  const saveRegistro = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      console.log(formData);

      dispatch(
        setRegistro({
          intervencion: formData.get('intervencion')?.toString() || '',
          gabinete: formData.get('gabinete')?.toString() || '',
          numeroHistoriaClinica: formData.get('numeroHistoriaClinica')?.toString() || '',
          fecha: formData.get('fecha')?.toString() || '',
        })
      );
    }
  };

  return (
    <div className='text-center'>
      <h1 className='display-5 mt-5 mb-4 color-dark'>Guardar Registro</h1>
      <div className='row'>
        <div className='col-md-10 m-auto mt-4'>
          <form ref={formRef} onSubmit={handleSubmit} className='mb-3'>
            <div asp-validation-summary='ModelOnly' className='text-danger'></div>
            <div className='d-flex justify-content-between'>
              <div className='col-md-5'>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Intervención:</label>
                  <input name='intervencion' defaultValue={intervencion} required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Gabinete:</label>
                  <input name='gabinete' defaultValue={gabinete} required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='d-flex align-items-center gap-3 justify-content-between'>
                  <div className='form-group text-start'>
                    <label className='control-label mb-2 ms-2'>Nº Historial Clínico:</label>
                    <input name='numeroHistoriaClinica' defaultValue={numeroHistoriaClinica} required className='form-control mb-3' />
                    <span className='text-danger'></span>
                  </div>
                  <div className='form-group text-start'>
                    <label className='control-label mb-2 ms-2'>Fecha:</label>
                    <input name='fecha' required type='datetime-local' defaultValue={fecha} className='form-control mb-3' />
                    <span className='text-danger'></span>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Código Material:</label>
                  <div className='d-flex mb-3 align-items-center'>
                    <input className='form-control me-2' value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
                    <button onClick={addMaterial} type='button' className='btn form-boton'>
                      Añadir Material
                    </button>
                  </div>
                  <span className='text-danger'></span>
                </div>
                <div onClick={saveRegistro}>
                  <BotonesTipos />
                </div>
              </div>
            </div>
            <div className='form-group m-auto'>
              <input type='submit' value='Guardar' className='btn guardar-boton form-boton mt-3' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
