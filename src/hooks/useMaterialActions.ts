import { useAppDispatch, useAppSelector } from './../app/hooks';
import { deleteMaterial, selectMaterial } from '../features/materialSlice';
import { toast } from 'react-toastify';

const useMaterialActions = () => {
  const dispatch = useAppDispatch();
  const { selectedMaterials, allMaterials } = useAppSelector((state) => state.material);

  const addMaterial = (code: string) => {
    if (!/^[A-C][0-9]{4}$/.test(code)) {
      toast.error('Código de material inválido');
      return;
    }

    for (let material of selectedMaterials) {
      if (material.codigo === code) {
        toast.error('El material ya está añadido');
        return;
      }
    }

    let found = false;
    for (let material of allMaterials) {
      if (material.codigo === code) {
        dispatch(selectMaterial(material));
        found = true;
        break;
      }
    }
    if (found) {
      toast.success('Material Añadido!');
    } else {
      toast.error('Material No encontrado');
    }
  };

  const removeMaterial = (code: string) => {
    if (!/^[A-C][0-9]{4}$/.test(code)) {
      toast.error('Código de material inválido');
      return;
    }
    dispatch(deleteMaterial(code));
    toast.success('Material eliminado!');
  };

  return { addMaterial, removeMaterial };
};

export default useMaterialActions;
