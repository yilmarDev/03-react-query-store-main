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

      return { optimisticProduct };
    },
    onSuccess: (product, variables, context) => {
      //   queryClient.invalidateQueries({
      //     queryKey: ['products', { filterKey: data.category }],
      //   });

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id],
        exact: false,
      });

      queryClient.setQueryData(
        ['products', { filterKey: product.category }],
        (old: Product[]) => {
          if (!old) return [];

          return old.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },
  });

  return mutation;
};
