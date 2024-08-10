"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Trip } from "@/app/lib/definitions";
import { getTrips } from "@/app/lib/actions";
import Header from "@/app/components/header";
import TripsFilter from "@/app/components/trips-filter";
import Trips from "@/app/components/trips";
import Footer from "@/app/components/footer";
import Loader from "@/app/components/loader";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");

  const notifyError = (error: string) => {
    toast.error(error, { containerId: "trips-notification" });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeDuration = (event: ChangeEvent<HTMLSelectElement>) => {
    setDuration(event.target.value);
  };

  const handleChangeLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setLevel(event.target.value);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      if (token) {
        try {
          const trips = await getTrips(token);
          setTrips(trips);
        } catch (error) {
          notifyError(`${error}`);
        } finally {
          setIsLoaded(true);
        }
      }
    };

    fetchTrips();
  }, [token]);

  useEffect(() => {
    const filterTrips = () => {
      if (trips && trips.length > 1) {
        setFilteredTrips(
          trips.filter((trip) => {
            const matchesTitle =
              trip.title.toLowerCase().search(title.toLowerCase()) !== -1;
            const matchesLevel = level ? trip.level === level : true;
            const matchesDuration = (() => {
              if (duration === "0_x_5") {
                return trip.duration <= 5;
              }

              if (duration === "5_x_10") {
                return trip.duration > 5 && trip.duration <= 10;
              }

              if (duration === "10") {
                return trip.duration > 10;
              }

              return true;
            })();

            return matchesTitle && matchesLevel && matchesDuration;
          })
        );
      }
    };

    filterTrips();
  }, [duration, level, title, trips]);

  return (
    <div className="flex flex-col grow min-h-screen">
      <Header />
      <main>
        <h1 className="visually-hidden">Travel App</h1>
        <TripsFilter
          title={title}
          duration={duration}
          level={level}
          handleChangeTitle={handleChangeTitle}
          handleChangeDuration={handleChangeDuration}
          handleChangeLevel={handleChangeLevel}
        />
        {isLoaded ? <Trips trips={filteredTrips} /> : <Loader />}
      </main>
      <Footer />
      <ToastContainer
        className="notification"
        containerId="trips-notification"
      />
    </div>
  );
}
