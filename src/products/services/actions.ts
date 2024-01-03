import { Product, productsApi } from '..';

interface Props {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: Props) => {
  const { data } = await productsApi.get<Product[]>('/products');
  return data;
};
