"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { JSX } from "react";

const images = [
  "/screenshot-1.png",
  "/screenshot-2.png",
  "/screenshot-3.png",
  "/screenshot-4.png",
  "/screenshot-5.png",
  "/screenshot-6.png",
];

export default function ImageSlider(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow < images.length ? prevIndex + 1 : 0,
    );
  }, [slidesToShow]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full max-w-[1440px] mx-auto mt-4 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`w-full ${slidesToShow === 3 ? "md:w-1/3" : "w-full"} flex-shrink-0`}
          >
            <Image
              src={src}
              alt={`Screenshot ${index + 1}`}
              width={1440}
              height={700}
              className="rounded-lg object-contain w-full h-auto md:h-[600px]"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
