import Image from "next/image";
import Link from "next/link";
import TripInfo from "@/app/components/trip-info";
import TripPrice from "@/app/components/trip-price";

export default function TripCard({
  id,
  title,
  duration,
  price,
  level,
  image,
}: {
  id: string;
  title: string;
  duration: number;
  price: number;
  level: string;
  image: string;
}) {
  return (
    <li data-test-id="trip-card" className="trip-card">
      <div className="relative w-full">
        <Image
          data-test-id="trip-card-image"
          src={image}
          alt="trip photo"
          sizes="100%"
          width={320}
          height={190}
          priority
        />
      </div>
      <div className="trip-card__content">
        <TripInfo title={title} duration={duration} level={level} />
        <TripPrice price={price} />
      </div>
      <Link
        data-test-id="trip-card-link"
        href={`/trip/${id}`}
        className="button"
      >
        Discover a trip
      </Link>
    </li>
  );
}
