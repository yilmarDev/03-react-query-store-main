import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      console.log('Muting - Optimistic update');
      const optimisticProduct: Product = { id: Math.random(), ...product };
      console.log(optimisticProduct);

      queryClient.setQueryData(
        ['products', { filterKey: optimisticProduct.category }],
        (old: Product[]) => {
          if (!old) return [];
          return [...old, optimisticProduct];
        }
      );
    },
    onSuccess: (data: Product) => {
      console.log('Producto creado');

      //   queryClient.invalidateQueries({
      //     queryKey: ['products', { filterKey: data.category }],
      //   });

      queryClient.setQueryData(
        ['products', { filterKey: data.category }],
        (old: Product[]) => {
          if (!old) return [];
          return [...old, data];
        }
      );
    },
  });

  return mutation;
};
