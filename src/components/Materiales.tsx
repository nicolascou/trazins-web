import React, { useEffect, useState } from 'react';
import { IMaterial } from '../types/models';
import { Link } from 'react-router-dom';

const Materiales = () => {
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5001/material');
      setMateriales(await res.json());
    };
    fetchData();
  }, []);

  return (
    <div className='row gap-5'>
      <div className='col-md-6'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Tipo</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Código</th>
            </tr>
          </thead>
          <tbody>
            {materiales.map((material: IMaterial) => (
              <tr>
                <td>{material.tipo}</td>
                <td>{material.nombre}</td>
                <td>{material.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='col-md-4 d-flex align-items-center'>
        <div className='d-flex flex-column align-items-center'>
          <Link to='/material?tipo=all' className='btn form-boton mb-4'>
            Buscar
          </Link>
          <div className='d-flex gap-2 my-4'>
            <input type='text' className='form-control' />
            <button className='btn form-boton'>Añadir</button>
          </div>
          <div className='d-flex gap-2 my-4'>
            <input type='text' className='form-control' />
            <button className='btn form-boton'>Eliminar</button>
          </div>
          <Link to='/' className='btn form-boton mt-4'>
            Aceptar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Materiales;
