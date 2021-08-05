import { useEffect, useRef, useState } from 'react';

type Props = {
  root?: React.RefObject<HTMLDivElement>;
  target: React.RefObject<HTMLDivElement>;
  threshold?: 1.0;
  rootMargin?: '0px';
  enabled: boolean;
};

export const usePagination = ({ target, threshold = 1.0, enabled }: Props) => {
  const [page, setPage] = useState(0);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!enabled || !target.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPage(prev => prev + 1),
      {
        threshold,
      },
    );

    observer.observe(target.current);
    observerRef.current = observer;

    return () => {
      target.current && observer.unobserve(target.current);
    };
  }, []);

  return [page, setPage];
};
