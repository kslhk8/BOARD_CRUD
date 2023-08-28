import { QueryFunction, useQuery } from "@tanstack/react-query"
export const useGetItem = (key: string[], func: QueryFunction<undefined | String[]>) => {
    const {
        isLoading,
        isError,
        data,
        isSuccess,
    } = useQuery(key, func)
    return { isLoading, isError, data, isSuccess }
}