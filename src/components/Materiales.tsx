import { useEffect, useState } from 'react';
import { IMaterial } from '../types/models';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

const Materiales = () => {
  const { selectedMaterials } = useAppSelector((state) => state.material.data);
  const [materialList, setMaterialList] = useState<IMaterial[]>([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('tipo');

  const searchAll = async () => {
    const res = await fetch(`http://localhost:5001/material?tipo=${type}`);
    setMaterialList(await res.json());
  };

  useEffect(() => {
    setMaterialList(selectedMaterials.filter((material) => material.tipo === type));
  }, []);

  return (
    <div className='row gap-5 mt-5'>
      <h2 className='text-center color-dark mb-0'>Materiales</h2>
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
            {materialList.map((material: IMaterial) => (
              <tr>
                <td className='fw-semibold'>{material.tipo}</td>
                <td>{material.nombre}</td>
                <td>{material.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='col-md-4 d-flex align-items-start mt-5'>
        <div className='d-flex flex-column align-items-center'>
          <button onClick={searchAll} className='btn form-boton mb-4'>
            Buscar
          </button>
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
