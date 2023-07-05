import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getAllMaterials } from '../features/materialThunks';
import BotonesTipos from './BotonesTipos';
import { cleanRegistro, setRegistro } from '../features/registroSlice';
import useMaterialActions from '../hooks/useMaterialActions';
import { toast } from 'react-toastify';

const Registro = () => {
  const [inputCode, setInputCode] = useState('');
  const [formData, setFormData] = useState(useAppSelector((state) => state.registro));

  const dispatch = useAppDispatch();
  const { status, selectedMaterials } = useAppSelector((state) => state.material);
  const { addMaterial } = useMaterialActions();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAllMaterials());
    }
  }, [dispatch, status]);

  const handleAddMaterial = () => {
    try {
      addMaterial(inputCode);
      toast.success('Material añadido!');
      setInputCode('');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(process.env.REACT_APP_API_URL + '/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registro: formData,
        materiales: selectedMaterials,
      }),
    });

    dispatch(cleanRegistro());

    if (res.status === 201) {
      window.location.reload();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='text-center'>
      <h1 className='display-5 mt-5 mb-4 color-dark'>Guardar Registro</h1>
      <div className='row'>
        <div className='col-md-10 m-auto mt-4'>
          <form onSubmit={handleSubmit} className='mb-3'>
            <div asp-validation-summary='ModelOnly' className='text-danger'></div>
            <div className='d-flex justify-content-between'>
              <div className='col-md-5'>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Intervención:</label>
                  <input name='intervencion' value={formData.intervencion} onChange={handleInputChange} required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Gabinete:</label>
                  <input name='gabinete' value={formData.gabinete} onChange={handleInputChange} required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='d-flex align-items-center gap-3 justify-content-between'>
                  <div className='form-group text-start'>
                    <label className='control-label mb-2 ms-2'>Nº Historial Clínico:</label>
                    <input
                      name='numeroHistoriaClinica'
                      value={formData.numeroHistoriaClinica}
                      onChange={handleInputChange}
                      required
                      className='form-control mb-3'
                    />
                    <span className='text-danger'></span>
                  </div>
                  <div className='form-group text-start'>
                    <label className='control-label mb-2 ms-2'>Fecha:</label>
                    <input
                      name='fecha'
                      required
                      type='datetime-local'
                      value={formData.fecha}
                      onChange={handleInputChange}
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
                    <button onClick={handleAddMaterial} type='button' className='btn form-boton'>
                      Añadir Material
                    </button>
                  </div>
                  <span className='text-danger'></span>
                </div>
                <div onClick={() => dispatch(setRegistro(formData))}>
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
