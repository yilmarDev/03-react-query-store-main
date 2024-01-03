import { Product, ProductCard } from '..';

interface Props {
  productsList: Product[];
}

export const ProductList = ({ productsList }: Props) => {
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
      {productsList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
