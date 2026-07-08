import { useEffect, useRef, useCallback } from "react";

type UseInViewOptions = {
  /** Root margin for IntersectionObserver (default: "0px 0px -60px 0px") */
  rootMargin?: string;
  /** Trigger once or every time (default: true) */
  triggerOnce?: boolean;
  /** Threshold (default: 0.15) */
  threshold?: number;
};

/**
 * Adds `.is-visible` to the target element when it enters the viewport.
 * Combine with `.anim-scroll` / `.anim-scroll-left` / `.anim-scroll-right` / `.anim-scroll-scale`
 * for CSS-driven reveal animations.
 *
 * @returns A `ref` callback to attach to the element.
 */
export function useInView({
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
  threshold = 0.15,
}: UseInViewOptions = {}) {
  const refCallback = useRef<((node: Element | null) => void) | null>(null);
  const seen = useRef(false);

  const setRef = useCallback(
    (node: Element | null) => {
      // cleanup previous observer
      if (refCallback.current) {
        refCallback.current(null);
        refCallback.current = null;
      }

      if (!node) return;
      if (triggerOnce && seen.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (triggerOnce) {
              seen.current = true;
              observer.disconnect();
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove("is-visible");
          }
        },
        { rootMargin, threshold }
      );

      observer.observe(node);
      refCallback.current = () => observer.disconnect();
    },
    [rootMargin, triggerOnce, threshold]
  );

  useEffect(() => {
    return () => {
      if (refCallback.current) refCallback.current(null);
    };
  }, []);

  return setRef;
}
