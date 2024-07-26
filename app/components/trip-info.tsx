import { Playfair_Display } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export default function TripInfo({
  title,
  duration,
  level,
}: {
  title: string;
  duration: number;
  level: string;
}) {
  return (
    <div className="trip-info">
      <h3
        data-test-id="trip-card-title"
        className={`trip-info__title ${playfairDisplay.className}`}
      >
        {title}
      </h3>
      <div className="trip-info__content">
        <span data-test-id="trip-card-duration" className="trip-info__duration">
          <strong>{duration}</strong> days
        </span>
        <span data-test-id="trip-card-level" className="trip-info__level">
          {level}
        </span>
      </div>
    </div>
  );
}
