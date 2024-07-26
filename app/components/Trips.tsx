import { Trip } from "@/app/lib/definitions";
import TripCard from "@/app/components/TripCard";

export default function Trips({ trips }: { trips: Trip[] }) {
  return (
    <section className="trips">
      <h2 className="visually-hidden">Trips List</h2>
      <ul className="trip-list">
        {trips.map((trip) => (
          <TripCard
            key={trip.id}
            id={trip.id}
            title={trip.title}
            duration={trip.duration}
            price={trip.price}
            level={trip.level}
            image={trip.image}
          />
        ))}
      </ul>
    </section>
  );
}
