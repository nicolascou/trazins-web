import { useAppDispatch, useAppSelector } from './../app/hooks';
import { deleteMaterial, selectMaterial } from '../features/materialSlice';
import { toast } from 'react-toastify';

const useMaterialActions = () => {
  const dispatch = useAppDispatch();
  const { selectedMaterials, allMaterials } = useAppSelector((state) => state.material.data);

  const addMaterial = (inputCode: string) => {
    if (!/^[A-C][0-9]{4}$/.test(inputCode)) {
      toast.error('Código de material inválido');
      return;
    }

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
      toast.success('Material Añadido!');
    } else {
      toast.error('Material No encontrado');
    }
  };

  const removeMaterial = (deleteInputCode: string) => {
    if (!/^[A-C][0-9]{4}$/.test(deleteInputCode)) {
      toast.error('Código de material inválido');
      return;
    }
    dispatch(deleteMaterial(deleteInputCode));
    toast.success('Material eliminado!');
  };

  return { addMaterial, removeMaterial };
};

export default useMaterialActions;
