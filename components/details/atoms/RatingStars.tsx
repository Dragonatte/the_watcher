import React, { useState, MouseEvent, FC, JSX, KeyboardEvent } from "react";

import { EmptyStar, HalfStar, Star } from "@/components/common/atoms/icons";
import { IconSvgProps } from "@/types";

interface RatingStarsProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
}

const RatingStars: FC<RatingStarsProps> = ({
  initialRating = 0,
  onChange,
}: RatingStarsProps): JSX.Element => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const computeHover = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ): number => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent: number = (e.clientX - left) / width;

    return percent < 0.5 ? index - 0.5 : index;
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    setHoverRating(computeHover(e, index));
  };

  const handleMouseLeave = (): void => setHoverRating(0);

  const handleClick = (value: number): void => {
    setRating(value);
    onChange?.(value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = hoverRating || index;

      handleClick(value);
    }
  };

  const currentValue: number = hoverRating || rating;

  return (
    <div
      aria-label="Calificación"
      className="inline-flex"
      role="radiogroup"
      tabIndex={0}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: 5 }, (_: unknown, i: number): number => i + 1).map(
        (index: number): JSX.Element => {
          const isSelected: boolean = currentValue === index;
          const ariaLabel = `${index} estrella${index > 1 ? "s" : ""}`;
          let IconComponent: FC<IconSvgProps> = EmptyStar;

          if (currentValue >= index) IconComponent = Star;
          else if (currentValue >= index - 0.5) IconComponent = HalfStar;

          return (
            <button
              key={index}
              aria-checked={isSelected}
              aria-label={ariaLabel}
              className="cursor-pointer focus:outline-none"
              role="radio"
              type="button"
              onClick={() => handleClick(currentValue || index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
            >
              <IconComponent
                className={`h-6 w-6 ${currentValue >= index - 0.5 ? "fill-yellow-500" : "fill-gray-300"}`}
              />
            </button>
          );
        },
      )}
    </div>
  );
};

export default RatingStars;
