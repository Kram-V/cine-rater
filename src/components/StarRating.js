import { useState } from "react";
import Star from "./Star";

const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };
const starContainerStyle = { display: "flex", gap: "4px" };

export default function StarRating({
  maxRating = 3,
  color = "#fcc419",
  size = 35,
  messages = [],
  defaultRating = 0,
  getRating,
  userRating,
}) {
  const [rating, setRating] = useState(userRating ? userRating : defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${18}px`,
  };

  const handleRating = (rating) => {
    setRating(rating);
    getRating(rating);
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
