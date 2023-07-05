import { useAppDispatch, useAppSelector } from './../app/hooks';
import { deleteMaterial, selectMaterial } from '../features/materialSlice';

const useMaterialActions = () => {
  const dispatch = useAppDispatch();
  const { selectedMaterials, allMaterials } = useAppSelector((state) => state.material);

  const addMaterial = (code: string) => {
    if (!/^[A-C][0-9]{4}$/.test(code)) {
      throw new Error('Código de material inválido');
    }

    for (let material of selectedMaterials) {
      if (material.codigo === code) {
        throw new Error('El material ya está añadido');
      }
    }

    for (let material of allMaterials) {
      if (material.codigo === code) {
        dispatch(selectMaterial(material));
        return;
      }
    }

    throw new Error('Material no encontrado');
  };

  const removeMaterial = (code: string) => {
    if (!/^[A-C][0-9]{4}$/.test(code)) {
      throw new Error('Código de material inválido');
    }
    dispatch(deleteMaterial(code));
  };

  return { addMaterial, removeMaterial };
};

export default useMaterialActions;
