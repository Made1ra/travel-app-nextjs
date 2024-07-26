import { formatDate } from "@/app/lib/utils";

export default function BookingCard({
  title,
  guests,
  date,
  totalPrice,
  cancelBooking,
}: {
  title: string;
  guests: number;
  date: string;
  totalPrice: number;
  cancelBooking: () => void;
}) {
  return (
    <li data-test-id="booking" className="booking">
      <h3 data-test-id="booking-title" className="booking__title">
        {title}
      </h3>
      <span data-test-id="booking-guests">{guests} guests</span>
      <span data-test-id="booking-date">{formatDate(date)}</span>
      <span data-test-id="booking-total">${totalPrice}</span>
      <button
        data-test-id="booking-cancel"
        className="booking__cancel"
        title="Cancel booking"
        onClick={() => cancelBooking()}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
}
