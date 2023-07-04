import { useEffect, useState } from 'react';
import { IMaterial } from '../types/models';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toast } from 'react-toastify';
import { selectMaterial, deleteMaterial } from '../features/materialSlice';
import { getAllMaterials } from '../features/materialThunks';

const Materiales = () => {
  const { selectedMaterials, allMaterials } = useAppSelector((state) => state.material.data);
  const [materialList, setMaterialList] = useState<IMaterial[]>([]);

  const [addInputCode, setAddInputCode] = useState('');
  const [deleteInputCode, setDeleteInputCode] = useState('');
  const dispatch = useAppDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('tipo');

  const searchAll = async () => {
    const res = await fetch(`http://localhost:5001/material?tipo=${type}`);
    setMaterialList(await res.json());
  };

  useEffect(() => {
    setMaterialList(selectedMaterials.filter((material) => material.tipo === type));
    if (allMaterials.length === 0) {
      dispatch(getAllMaterials());
    }
  }, [selectedMaterials, type, allMaterials.length, dispatch]);

  const addMaterial = () => {
    if (!/^[A-C][0-9]{4}$/.test(addInputCode)) {
      toast.error('Código de material inválido');
      return;
    }

    for (let material of selectedMaterials) {
      if (material.codigo === addInputCode) {
        toast.error('El material ya está añadido');
        return;
      }
    }

    let found = false;
    for (let material of allMaterials) {
      if (material.codigo === addInputCode) {
        dispatch(selectMaterial(material));
        found = true;
        break;
      }
    }
    if (found) {
      setAddInputCode('');
      toast.success('Material Añadido!');
    } else {
      toast.error('Material No encontrado');
    }
  };

  const remove = () => {
    if (!/^[A-C][0-9]{4}$/.test(deleteInputCode)) {
      toast.error('Código de material inválido');
      return;
    }
    dispatch(deleteMaterial(deleteInputCode));
    setDeleteInputCode('');
    toast.success('Material eliminado!');
  };

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
              <tr key={material.id}>
                <td className='fw-semibold'>{material.tipo}</td>
                <td>{material.nombre}</td>
                <td>{material.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {materialList.length === 0 && (
          <div className='mt-3'>
            <p>No has añadido ningún material</p>
            <p>Presiona "Buscar" para ver los materiales disponibles</p>
          </div>
        )}
      </div>
      <div className='col-md-4 d-flex align-items-start mt-5'>
        <div className='d-flex flex-column align-items-center'>
          <div className='d-flex gap-2 my-4'>
            <input type='text' value={addInputCode} onChange={(e) => setAddInputCode(e.target.value)} className='form-control' />
            <button onClick={addMaterial} className='btn form-boton'>
              Añadir
            </button>
          </div>
          <div className='d-flex gap-2 my-4'>
            <input type='text' value={deleteInputCode} onChange={(e) => setDeleteInputCode(e.target.value)} className='form-control' />
            <button onClick={remove} className='btn form-boton'>
              Eliminar
            </button>
          </div>
          <div className='d-flex gap-2 mt-4'>
            <button onClick={searchAll} className='btn form-boton'>
              Buscar
            </button>
            <Link to='/' className='btn form-boton'>
              Aceptar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materiales;
