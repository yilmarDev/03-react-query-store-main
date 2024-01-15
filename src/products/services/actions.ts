import { Product, productsApi } from '..';

interface ProductsOptions {
  filterKey?: string;
}

export interface ProductLike {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: ProductsOptions): Promise<Product[]> => {
  const urlFilter = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${urlFilter}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: ProductLike) => {
  // await sleep(2);

  const { data } = await productsApi.post(`/products`, product);
  return data;
};
