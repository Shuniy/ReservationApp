import Image from "next/image";
import React from "react";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/helpers/ReviewHelpers";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  const ratings = rating || calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = ratings - i;
      if (difference >= 1) {
        stars.push(fullStar);
      } else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) {
          stars.push(emptyStar);
        } else if (difference > 0.2 && difference <= 0.6) {
          stars.push(halfStar);
        } else {
          stars.push(fullStar);
        }
      } else {
        stars.push(emptyStar);
      }
    }
    return stars.map((star, index) => {
      return (
        <Image key={index} src={star} alt={star.src} className="w-4 h-4 mr-1" />
      );
    });
  };
  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
