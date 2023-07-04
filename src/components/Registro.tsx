import React from 'react';
import { Link } from 'react-router-dom';

const Registro = () => {
  const handleSubmit = () => {
    return;
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
                <div className='form-group'>
                  <label className='control-label mb-2'>Intervención:</label>
                  <input required className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='form-group'>
                  <label className='control-label mb-2'>Gabinete:</label>
                  <input className='form-control mb-3' />
                  <span className='text-danger'></span>
                </div>
                <div className='d-flex align-items-center gap-3 justify-content-between'>
                  <div className='form-group'>
                    <label className='control-label mb-2'>Nº Historial Clínico:</label>
                    <input required className='form-control mb-3' />
                    <span className='text-danger'></span>
                  </div>
                  <div className='form-group'>
                    <label className='control-label mb-2'>Fecha:</label>
                    <input type='datetime-local' defaultValue={new Date().toISOString().slice(0, 16)} className='form-control mb-3' />
                    <span className='text-danger'></span>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
                <div className='form-group text-start'>
                  <label className='control-label mb-2 ms-2'>Código Material:</label>
                  <div className='d-flex mb-3 align-items-center'>
                    <input className='form-control me-2' />
                    <button type='button' className='btn form-boton'>
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
