"use server";

const BASE_URL = "https://travel-app-api.up.railway.app/api/v1";

export const signUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, password }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/authenticated-user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getTrips = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/trips`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getTrip = async (token: string, tripId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/trips/${tripId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getBookings = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postBookings = async (
  token: string,
  tripId: string,
  guests: number,
  date: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tripId, guests, date }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteBooking = async (token: string, bookingId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
