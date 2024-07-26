"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { User } from "@/app/lib/definitions";
import { getAuthenticatedUser } from "@/app/lib/actions";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileNav() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const notifyError = (error: string) =>
    toast.error(error, { containerId: "profile-nav-notification" });

  const handleClick = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    router.push("/sign-in");
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setToken(token);
      if (!token) {
        router.push("/sign-in");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const user = await getAuthenticatedUser(token);
          setUser(user);
        } catch (error) {
          notifyError(`${error}`);
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <>
      <nav data-test-id="header-nav" className="header__nav">
        <ul className="nav-header__list">
          <li className="nav-header__item" title="Bookings">
            <Link
              data-test-id="header-bookings-link"
              href="/bookings"
              className="nav-header__inner"
            >
              <span className="visually-hidden">Bookings</span>
              <Image
                src="/briefcase.svg"
                alt="bookings"
                width={24}
                height={24}
              />
            </Link>
          </li>
          <li className="nav-header__item" title="Profile">
            <div
              data-test-id="header-profile-nav"
              className="nav-header__inner profile-nav"
              tabIndex={0}
            >
              <span className="visually-hidden">Profile</span>
              <Image src="/user.svg" alt="profile" width={24} height={24} />
              <ul
                data-test-id="header-profile-nav-list"
                className="profile-nav__list"
              >
                <li
                  data-test-id="header-profile-nav-username"
                  className="profile-nav__item"
                >
                  {user?.fullName}
                </li>
                <li className="profile-nav__item">
                  <button
                    data-test-id="header-profile-nav-sign-out"
                    className="profile-nav__sign-out button"
                    onClick={handleClick}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
      <ToastContainer
        className="notification"
        containerId="profile-nav-notification"
      />
    </>
  );
}
