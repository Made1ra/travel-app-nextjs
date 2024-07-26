"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Booking } from "@/app/lib/definitions";
import { getBookings, deleteBooking } from "@/app/lib/actions";
import Header from "@/app/components/Header";
import BookingCard from "@/app/components/BookingCard";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import "react-toastify/dist/ReactToastify.css";

export default function Bookings() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const notifySuccess = () => {
    toast.success("Booking has been successfully canceled!", {
      containerId: "bookings-notification",
    });
  };

  const notifyError = (error: string) => {
    toast.error(error, { containerId: "bookings-notification" });
  };

  const cancelBooking = async (id: string) => {
    if (token) {
      try {
        await deleteBooking(token, id);
        setBookings(bookings.filter((booking) => booking.id !== id));
        notifySuccess();
      } catch (error) {
        notifyError(`${error}`);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (token) {
        try {
          const bookings = await getBookings(token);
          setBookings(bookings);
        } catch (error) {
          notifyError(`${error}`);
        } finally {
          setIsLoaded(true);
        }
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div className="flex flex-col grow min-h-screen">
      <Header />
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        {isLoaded ? (
          <ul className="bookings__list">
            {bookings
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((booking) => (
                <BookingCard
                  key={booking.id}
                  title={booking.trip.title}
                  guests={booking.guests}
                  date={booking.date}
                  totalPrice={booking.totalPrice}
                  cancelBooking={() => cancelBooking(booking.id)}
                />
              ))}
          </ul>
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
      <ToastContainer
        className="notification"
        containerId="bookings-notification"
      />
    </div>
  );
}
