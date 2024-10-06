import React, { ReactElement, useRef, useState, useEffect } from "react";
import { IconButton } from "@volvo-cars/react-icons";
import slideStyle from "./slider.module.css";

interface CustomSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactElement;
}

const styles = {
  dotStyle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    margin: "0 4px",
    cursor: "pointer",
  },
};

const CustomSlider = <T,>({ items, renderItem }: CustomSliderProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * index;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="p-16 mt-24">
      <div className="w-full">
        <div
          ref={containerRef}
          className="overflow-x-hidden"
          style={{
            scrollSnapType: "x",
          }}
        >
          <div className="flex gap-24">
            {items.map((item, index) => (
              <div
                key={index}
                className={slideStyle.sliderItem}
                style={{
                  scrollSnapAlign: isMobile ? "start" : "none",
                }}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="flex gap-x-16 pr-16 mt-24 justify-end">
          <IconButton
            aria-label="Previous Car"
            icon="chevron-back"
            onClick={() => scroll("left")}
            tabIndex={-1}
            variant="filled"
            className="border rounded-full"
            style={{ borderRadius: "100%" }}
          />
          <IconButton
            aria-label="Next Car"
            icon="chevron-forward"
            onClick={() => scroll("right")}
            tabIndex={-1}
            variant="filled"
            className="border rounded-full"
            style={{ borderRadius: "100%" }}
          />
        </div>
      )}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dotStyle,
                backgroundColor: activeIndex === index ? "black" : "lightgray",
              }}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
