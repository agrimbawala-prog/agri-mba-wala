"use client";

import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  items: string[];
};

export function StatsCounter({ items }: StatsCounterProps) {
  const reference = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = reference.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={reference} className={`proof-strip ${visible ? "proof-visible" : ""}`} aria-label="Platform promises">
      {items.map((item, index) => (
        <div className="proof-item" key={item}>
          <span className="proof-number">0{index + 1}</span>
          <span>{item}</span>
        </div>
      ))}
    </section>
  );
}
