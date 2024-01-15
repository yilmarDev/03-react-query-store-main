import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
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
