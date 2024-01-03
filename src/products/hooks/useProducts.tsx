import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Props {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Props) => {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
    isFetching,
  } = useQuery({
    queryFn: () => productActions.getProducts({ filterKey }),
    queryKey: ['products', { filterKey }],
    staleTime: 1000 * 60 * 60,
  });

  return { isLoading, isError, error, products, isFetching };
};
