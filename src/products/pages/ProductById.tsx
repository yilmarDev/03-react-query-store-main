// import { ProductList, useProducts } from '..';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard, useProduct } from '..';

export const ProductById = () => {
  const { id } = useParams();
  const { isLoading, product } = useProduct({ id: +id! });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      {isLoading && 'Loading ...'}
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
