import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllMaterials } from '../features/materialThunks';
import { toast } from 'react-toastify';
import { selectMaterial } from '../features/materialSlice';

const Registro = () => {
  const [inputCode, setInputCode] = useState('');

  const dispatch = useAppDispatch();
  const { allMaterials, selectedMaterials } = useAppSelector((state) => state.material.data);

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

      await fetch('http://localhost:5001/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      });
      navigate('/');
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
                <div className='form-group'>
                  <label className='control-label mb-2'>Intervención:</label>
                  <input name='intervencion' required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='form-group'>
                  <label className='control-label mb-2'>Gabinete:</label>
                  <input name='gabinete' required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='d-flex align-items-center gap-3 justify-content-between'>
                  <div className='form-group'>
                    <label className='control-label mb-2'>Nº Historial Clínico:</label>
                    <input name='numeroHistoriaClinica' required className='form-control mb-3' />
                    <span className='text-danger'></span>
                  </div>
                  <div className='form-group'>
                    <label className='control-label mb-2'>Fecha:</label>
                    <input
                      name='fecha'
                      required
                      type='datetime-local'
                      defaultValue={new Date().toISOString().slice(0, 16)}
                      className='form-control mb-3'
                    />
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
                <div className='form-group mt-5'>
                  <Link to='/material?tipo=A' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      A<span className='counter-circle'>0</span>
                    </div>
                  </Link>
                  <Link to='/material?tipo=B' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      B<span className='counter-circle'>0</span>
                    </div>
                  </Link>
                  <Link to='/material?tipo=C' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      C<span className='counter-circle'>0</span>
                    </div>
                  </Link>
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
