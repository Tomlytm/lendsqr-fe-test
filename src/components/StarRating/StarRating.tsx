import React from 'react';
import './StarRating.scss';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: string;
  color?: string;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 3,
  size = '16px',
  color = '#E9B200',
  className = '',
}) => {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starNumber = index + 1;
    const isFilled = starNumber <= rating;

    return (
      <span
        key={index}
        className={`star ${isFilled ? 'filled' : 'empty'} ${className}`}
        style={{
          fontSize: size,
          color: color,
        }}
      >
        {isFilled ? '★' : '☆'}
      </span>
    );
  });

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;