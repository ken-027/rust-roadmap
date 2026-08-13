import { useEffect, useRef } from 'react';
import { animate, inView } from 'motion';

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return inView(el, () => {
      animate(el, { opacity: [0, 1], y: [18, 0] }, { duration: 0.45, ease: 'easeOut' });
    });
  }, []);

  return ref;
}
