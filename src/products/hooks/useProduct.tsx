import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Props {
  id: number;
}

export const useProduct = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: product,
    isFetching,
  } = useQuery({
    queryFn: () => productActions.getProductById(id),
    queryKey: ['product', { id }],
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isError, error, product, isFetching };
};
