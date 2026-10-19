import React, { useRef, useEffect } from "react";

const SpotlightCard = ({
  children,
  className = "",
  as: Tag = "article",
  style,
  ...rest
}) => {
  const containerRef = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    rectRef.current = el.getBoundingClientRect();

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect();
      }
    });
    resizeObserver.observe(el);

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", `${x.toFixed(2)}%`);
      el.style.setProperty("--mouse-y", `${y.toFixed(2)}%`);
    };

    el.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return React.createElement(
    Tag,
    {
      ref: containerRef,
      className: `spotlight-container ${className}`.trim(),
      style,
      ...rest,
    },
    <div className="reveal-layer" aria-hidden="true" />,
    <div className="spotlight-content">{children}</div>
  );
};

export default SpotlightCard;
