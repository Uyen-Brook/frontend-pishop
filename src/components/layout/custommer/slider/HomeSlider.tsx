"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  userSliderService,
  UserSliderResponse,
} from "../../../../service/public/SliderService";

export default function HomeSlider() {
  const [sliders, setSliders] = useState<UserSliderResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
 useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await userSliderService.getAll();

        // Sort theo sortOrder nếu có
        const sorted = [...data].sort(
          (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)
        );

        setSliders(sorted);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
      }
    };
        fetchSliders();
  }, []);

  // Auto slide
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentIndex((prev) =>
        prev === sliders.length - 1
          ? 0
          : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  // Next
  const nextSlide = () => {

    setCurrentIndex((prev) =>
      prev === sliders.length - 1
        ? 0
        : prev + 1
    );
  };

  // Prev
  const prevSlide = () => {

    setCurrentIndex((prev) =>
      prev === 0
        ? sliders.length - 1
        : prev - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">

      {/* SLIDER */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >

        {sliders.map((slider) => (

          <div
            key={slider.id}
            className="min-w-full"
          >

            <a href={slider.redirectUrl}>

              <img
                src={slider.imageUrl}
                alt={slider.title}
                className="
                  w-full
                  h-[220px]
                  md:h-[420px]
                  object-cover
                "
              />

            </a>

          </div>
        ))}

      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="
          absolute
          top-1/2
          left-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          p-2
          rounded-full
          transition
        "
      >
        <ChevronLeft size={22} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="
          absolute
          top-1/2
          right-4
          -translate-y-1/2
          bg-black/40
          hover:bg-black/60
          text-white
          p-2
          rounded-full
          transition
        "
      >
        <ChevronRight size={22} />
      </button>

      {/* DOTS */}
      <div
        className="
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          flex
          gap-2
        "
      >

        {sliders.map((_, index) => (

          <button
            key={index}
            onClick={() =>
              setCurrentIndex(index)
            }
            className={`
              w-3
              h-3
              rounded-full
              transition-all
              ${
                currentIndex === index
                  ? "bg-white w-7"
                  : "bg-white/50"
              }
            `}
          />

        ))}

      </div>

    </div>
  );
}