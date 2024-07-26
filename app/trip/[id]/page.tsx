"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Trip } from "@/app/lib/definitions";
import { getTrip } from "@/app/lib/actions";
import Header from "@/app/components/Header";
import TripInfo from "@/app/components/TripInfo";
import TripPrice from "@/app/components/TripPrice";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import Modal from "@/app/components/Modal";
import "react-toastify/dist/ReactToastify.css";

export default function TripPage() {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);

  const { id } = useParams();

  const notifySuccess = () => {
    toast.success("The trip has been successfully booked!", {
      containerId: "trip-notification",
    });
  };

  const notifyError = (error: string) => {
    toast.error(error, { containerId: "trip-notification" });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchTrip = async () => {
      if (id) {
        try {
          const trip = await getTrip(
            typeof window !== "undefined"
              ? localStorage.getItem("token") || ""
              : "",
            typeof id === "string" ? id : id[0]
          );
          setTrip(trip);
        } catch (error) {
          notifyError(`${error}`);
        } finally {
          setIsLoaded(true);
        }
      }
    };

    fetchTrip();
  }, [id]);

  return (
    <div className="flex flex-col grow min-h-screen">
      <Header />
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        {isLoaded ? (
          <div className="trip">
            <div className="relative w-full">
              <Image
                src={trip?.image || ""}
                alt="trip photo"
                className="trip__img"
                data-test-id="trip-details-image"
                sizes="100%"
                width={320}
                height={190}
              />
            </div>
            <div className="trip__content">
              <TripInfo
                title={trip?.title || ""}
                duration={trip?.duration || 0}
                level={trip?.level || ""}
              />
              <div
                data-test-id="trip-details-description"
                className="trip__description"
              >
                {trip?.description}
              </div>
              <TripPrice price={trip?.price || 0} />
              <button
                data-test-id="trip-details-button"
                className="trip__button button"
                onClick={handleOpen}
              >
                Book a trip
              </button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
      <ToastContainer
        className="notification"
        containerId="trip-notification"
      />
      <Modal
        open={open}
        title={trip?.title || ""}
        duration={trip?.duration || 0}
        level={trip?.level || ""}
        price={trip?.price || 0}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
        onClose={handleClose}
      />
    </div>
  );
}
