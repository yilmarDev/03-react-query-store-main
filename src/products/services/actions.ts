import { Product, productsApi } from '..';

interface ProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: ProductsOptions): Promise<Product[]> => {
  const urlFilter = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${urlFilter}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  // const urlFilter = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};
