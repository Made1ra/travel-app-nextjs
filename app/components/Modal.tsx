"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "next/navigation";
import { postBookings } from "@/app/lib/actions";
import TripInfo from "@/app/components/trip-info";

export default function Modal({
  open,
  title,
  duration,
  level,
  price,
  notifySuccess,
  notifyError,
  onClose,
}: {
  open: boolean;
  title: string;
  duration: number;
  level: string;
  price: number;
  notifySuccess: () => void;
  notifyError: (error: string) => void;
  onClose: () => void;
}) {
  const minDate = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split("T")[0];

  const [date, setDate] = useState(minDate);
  const [guests, setGuests] = useState(1);

  const { id } = useParams();

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleChangeGuests = (event: ChangeEvent<HTMLInputElement>) => {
    setGuests(+event.target.value);
  };

  const handleClose = () => {
    setDate(minDate);
    setGuests(1);
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
      try {
        await postBookings(
          typeof window !== "undefined"
            ? localStorage.getItem("token") || ""
            : "",
          typeof id === "string" ? id : id[0],
          guests,
          date
        );
        notifySuccess();
      } catch (error) {
        notifyError(`${error}`);
      }
    }

    handleClose();
  };

  return (
    <div hidden={!open}>
      <div className="modal">
        <div data-test-id="book-trip-popup" className="book-trip-popup">
          <button
            data-test-id="book-trip-popup-close"
            className="book-trip-popup__close"
            onClick={handleClose}
          >
            ×
          </button>
          <form
            className="book-trip-popup__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TripInfo title={title} duration={duration} level={level} />
            <label className="input">
              <span className="input__heading">Date</span>
              <input
                data-test-id="book-trip-popup-date"
                name="date"
                type="date"
                required
                min={minDate}
                value={date}
                onChange={handleChangeDate}
              />
            </label>
            <label className="input">
              <span className="input__heading">Number of guests</span>
              <input
                data-test-id="book-trip-popup-guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={handleChangeGuests}
                required
              />
            </label>
            <span className="book-trip-popup__total">
              Total:
              <output
                data-test-id="book-trip-popup-total-value"
                className="book-trip-popup__total-value"
              >
                ${price * guests}
              </output>
            </span>
            <button
              data-test-id="book-trip-popup-submit"
              className="button"
              type="submit"
            >
              Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
