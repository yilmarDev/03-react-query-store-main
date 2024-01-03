import { Product, productsApi } from '..';

interface Props {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }: Props) => {
  const urlFilter = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${urlFilter}`);
  return data;
};
