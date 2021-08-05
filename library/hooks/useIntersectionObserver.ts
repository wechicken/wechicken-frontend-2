import { useEffect, useRef } from 'react';

type Props = {
  target: React.RefObject<HTMLDivElement>;
  onIntersect: () => void;
  threshold?: number;
  enabled?: boolean;
};

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 1.0,
  enabled = true,
}: Props) => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && onIntersect()),
      { threshold },
    );
    observerRef.current = observer;

    const el = target && target.current;

    if (!el) return;

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return { observer: observerRef.current };
};
