import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';

interface ITypesCounter {
  [key: string]: number;
}

const BotonesTipos = () => {
  const [typesCounter, setTypesCounter] = useState<ITypesCounter>({
    A: 0,
    B: 0,
    C: 0,
  });

  const { selectedMaterials } = useAppSelector((state) => state.material.data);

  useEffect(() => {
    const updatedCounter: ITypesCounter = {
      A: 0,
      B: 0,
      C: 0,
    };

    selectedMaterials.forEach((material) => {
      updatedCounter[material.tipo] += 1;
    });
    setTypesCounter(updatedCounter);
  }, [selectedMaterials]);

  return (
    <div className='form-group mt-5'>
      <Link to='/material?tipo=A' className='tipo-boton'>
        <div className='tipo-boton__wrapper'>
          A<span className='counter-circle'>{typesCounter['A']}</span>
        </div>
      </Link>
      <Link to='/material?tipo=B' className='tipo-boton'>
        <div className='tipo-boton__wrapper'>
          B<span className='counter-circle'>{typesCounter['B']}</span>
        </div>
      </Link>
      <Link to='/material?tipo=C' className='tipo-boton'>
        <div className='tipo-boton__wrapper'>
          C<span className='counter-circle'>{typesCounter['C']}</span>
        </div>
      </Link>
    </div>
  );
};

export default BotonesTipos;
