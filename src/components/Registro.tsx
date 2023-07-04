import React from 'react';
import logoImg from '../img/logo.jpg';

const Registro = () => {
  return (
    <div className='text-center'>
      <h1 className='display-5 mt-5 mb-4 color-dark'>Guardar Registro</h1>
      <div className='row'>
        <div className='col-md-10 m-auto mt-4'>
          <form asp-action='Create' className='mb-3'>
            <div asp-validation-summary='ModelOnly' className='text-danger'></div>
            <div className='d-flex justify-content-between'>
              <div className='col-md-5'>
                <div className='form-group'>
                  <label asp-for='Intervencion' className='control-label mb-2'>
                    Intervención:
                  </label>
                  <input asp-for='Intervencion' required className='form-control mb-3' />
                  <span asp-validation-for='Intervencion' className='text-danger'></span>
                </div>
                <div className='form-group'>
                  <label asp-for='Gabinete' className='control-label mb-2'>
                    Gabinete:
                  </label>
                  <input asp-for='Gabinete' className='form-control mb-3' />
                  <span asp-validation-for='Gabinete' className='text-danger'></span>
                </div>
                <div className='d-flex align-items-center gap-3 justify-content-between'>
                  <div className='form-group'>
                    <label asp-for='NumeroHistoriaClinica' className='control-label mb-2'>
                      Nº Historial Clínico:
                    </label>
                    <input asp-for='NumeroHistoriaClinica' className='form-control mb-3' />
                    <span asp-validation-for='NumeroHistoriaClinica' className='text-danger'></span>
                  </div>
                  <div className='form-group'>
                    <label asp-for='Fecha' className='control-label mb-2'>
                      Fecha:
                    </label>
                    <input id='dateInput' asp-for='Fecha' className='form-control mb-3' />
                    <span asp-validation-for='Fecha' className='text-danger'></span>
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
                  <a href='/material?tipo=A' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      A<span className='counter-circle'>0</span>
                    </div>
                  </a>
                  <a href='/material?tipo=B' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      B<span className='counter-circle'>0</span>
                    </div>
                  </a>
                  <a href='/material?tipo=C' className='tipo-boton'>
                    <div className='tipo-boton__wrapper'>
                      C<span className='counter-circle'>0</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='form-group m-auto'>
              <input type='submit' value='Guardar' className='btn guardar-boton form-boton mt-3' />
            </div>
          </form>
        </div>
      </div>

      <img src={logoImg} className='mt-5' width='275' height='200' alt='Traz Ins Logo' />
    </div>
  );
};

export default Registro;
