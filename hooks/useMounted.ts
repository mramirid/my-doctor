import { useCallback, useEffect, useRef } from 'react';

export default function useMounted() {
  const isMountedRef = useRef(true);

  const isMounted = () => isMountedRef.current;

  const runInMounted = (callback: () => void) => {
    if (isMountedRef.current) {
      callback();
    }
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    isMounted,
    runInMounted,
  };
}
