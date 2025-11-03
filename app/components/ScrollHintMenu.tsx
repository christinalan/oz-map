import React, { useEffect, useRef, useState } from "react";

export interface ScrollHintMenuProps {
    children: React.ReactNode;
    /** Max height for the scroll area (Tailwind-compatible string like "60vh" or any CSS length). */
    maxHeight?: string;
    /** Optional className applied to the scroll container (inside the wrapper). */
    className?: string;
    /** Optional: starts the component "open" calculation once mounted (useful if your Menu renders conditionally). */
    recalcOnMount?: boolean;
  }

  export const ScrollHintMenu: React.FC<ScrollHintMenuProps> = ({
    children,
    maxHeight="60vh",
    className,
    recalcOnMount = true,
  }) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const [canScroll, setCanScroll] = useState<boolean>(false);
   const [atBottom, setAtBottom] = useState<boolean>(false);
   
   //Recalc on mount/resize/content changes
   useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const calc = () => {
        const overflow = el.scrollHeight > el.clientHeight + 1;
        setCanScroll(overflow);
        setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
    };

    if (recalcOnMount) calc();

    //Guard for SSR and older browsers
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => calc());
      ro.observe(el);
    }
    const onResize = () => calc();
    window.addEventListener("resize", onResize);

    return () => {
        if (ro) ro.disconnect();
        window.removeEventListener("resize", onResize);;
    }
   }, [recalcOnMount])

   const onScroll: React.UIEventHandler<HTMLDivElement> = () => {
    const el = ref.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
  };

  return (
    <div className="relative">
        <div
            ref={ref}
            onScroll={onScroll}
            style={{ maxHeight }}
            className={[
                "bg-black/90 rounded-lg p-2 overflow-y-auto mt-2 mb-2",
                "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20",
                className ?? "",
            ].join(" ")}
            >
                {children}
        </div>

              {/* Bottom gradient + hint */}
        {canScroll && !atBottom && (
            <>
           <div
            className="pointer-events-none absolute inset-x-2 bottom-2 h-16 rounded-b-lg
                       bg-gradient-to-t from-black/90 via-black/70 to-transparent"
          />
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5
                         rounded-full bg-white/10 backdrop-blur-sm
                         text-white text-xs font-pt-monument
                         ring-1 ring-white/15"
            >
              <span>Scroll for all locations</span>
              <svg
                className="w-4 h-4 animate-bounce"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </div>
          </div>
        </>
        )}
    </div>
  );
  };