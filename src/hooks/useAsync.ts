import { useCallback, useEffect, useState } from 'react';

/**
 * The return type for the useAsync custom hook.
 * @template T The type of the value returned by the asynchronous callback.
 */
type UseAsyncReturn<T> = {
  loading: boolean;
  error?: any;
  value?: T;
};

/**
 * Custom hook to handle asynchronous operations and provide loading, error, and value states.
 * @template T The type of the value returned by the asynchronous callback.
 * @param {() => Promise<T>} callback The asynchronous callback function to be executed.
 * @param {any[]} dependencies An optional array of dependencies to trigger the asynchronous callback when changed.
 * @returns {UseAsyncReturn<T>} An object containing loading, error, and value states.
 */
export default function useAsync<T>(
  callback: () => Promise<T>,
  dependencies: any[] = []
): UseAsyncReturn<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T>();

  const callbackMemoized = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);
    try {
      const result = await callback();
      setValue(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [dependencies]);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, value };
}
