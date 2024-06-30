"use client";
import { useState } from "react";
import Header from "@/components/Header";
import CardOption from "@/components/CardOption";

const Vacation = () => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    vacationType: "",
    landscape: "",
    flightDuration: "",
    budget: "",
    dates: { start: "", end: "" },
  });
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false); // État pour le loader

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleCardClick = (name, value) => {
    setPreferences({ ...preferences, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      dates: { ...preferences.dates, [name]: value },
    });
  };

  const handleSubmit = async () => {
    setLoading(true); // Afficher le loader
    const userId = "user-123"; // replace with actual user ID
    const messages = [
      {
        role: "user",
        content: `I want to organize a vacation departing from Lyon in France with the following preferences: 
                  Vacation Type: ${preferences.vacationType}, 
                  Landscape: ${preferences.landscape}, 
                  Maximum flight duration: ${preferences.flightDuration}, 
                  Budget: ${preferences.budget}, 
                  Dates: from ${preferences.dates.start} to ${preferences.dates.end}. 
                  Suggest me 2 destinations and itineraries in JSON format with the following structure:
                  {
                    "destinations": [
                      {
                        "name": "Destination Name",
                        "description": "Brief description of the destination",
                        "activities": ["Activity 1", "Activity 2", "Activity 3"],
                        "hotels": [
                          {
                            "name": "Hotel Name",
                            "description": "Brief description of the hotel",
                            "price": "Hotel price"
                          }
                        ],
                        "restaurants": [
                          {
                            "name": "Restaurant Name",
                            "description": "Brief description of the restaurant",
                            "price": "Restaurant price"
                          }
                        ]
                      }
                    ]
                  }
                  Only json, no other word`,
      },
    ];

    try {
      const res = await fetch("/api/sendOpenAi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, userId }),
      });
      const data = await res.json();
      setRecommendations(JSON.parse(data.response));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false); // Cacher le loader
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-dots loading-lg text-primary"></span>
          </div>
        )}

        {!recommendations && !loading && step === 0 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">
              What type of vacation do you prefer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              <CardOption
                label="Relaxing"
                value="Relaxing"
                onClick={(value) => handleCardClick("vacationType", value)}
                selected={preferences.vacationType === "Relaxing"}
              />
              <CardOption
                label="Adventure"
                value="Adventure"
                onClick={(value) => handleCardClick("vacationType", value)}
                selected={preferences.vacationType === "Adventure"}
              />
              <CardOption
                label="Mixed"
                value="Mixed"
                onClick={(value) => handleCardClick("vacationType", value)}
                selected={preferences.vacationType === "Mixed"}
              />
            </div>
            <div className="mt-4">
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {!recommendations && !loading && step === 1 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">
              What type of landscape do you prefer?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                "Mountain",
                "Sea",
                "City",
                "Countryside",
                "Forest",
                "Desert",
              ].map((landscape) => (
                <CardOption
                  key={landscape}
                  label={landscape}
                  value={landscape}
                  onClick={(value) => handleCardClick("landscape", value)}
                  selected={preferences.landscape === landscape}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between w-full max-w-3xl">
              <button className="btn" onClick={handlePrev}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {!recommendations && !loading && step === 2 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">
              What is the maximum flight duration?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {["<2", "2-5", "5-10", ">10"].map((duration) => (
                <CardOption
                  key={duration}
                  label={`${
                    duration === "<2"
                      ? "Less than 2"
                      : duration === ">10"
                      ? "More than 10"
                      : duration
                  } hours`}
                  value={duration}
                  onClick={(value) => handleCardClick("flightDuration", value)}
                  selected={preferences.flightDuration === duration}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between w-full max-w-3xl">
              <button className="btn" onClick={handlePrev}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {!recommendations && !loading && step === 3 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">What is your budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {["<1000", "1000€-3000€", "3000€-5000€", ">5000"].map(
                (budget) => (
                  <CardOption
                    key={budget}
                    label={`${
                      budget === "<1000"
                        ? "Less than 1000€"
                        : budget === ">5000"
                        ? "More than 5000€"
                        : budget
                    }`}
                    value={budget}
                    onClick={(value) => handleCardClick("budget", value)}
                    selected={preferences.budget === budget}
                  />
                )
              )}
            </div>
            <div className="mt-4 flex justify-between w-full max-w-3xl">
              <button className="btn" onClick={handlePrev}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
        )}

        {!recommendations && !loading && step === 4 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">
              What are the dates of your trip?
            </h2>
            <div className="w-full max-w-3xl">
              <label className="block mb-2">
                Start Date:
                <input
                  type="date"
                  name="start"
                  onChange={handleDateChange}
                  value={preferences.dates.start}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block mb-2">
                End Date:
                <input
                  type="date"
                  name="end"
                  onChange={handleDateChange}
                  value={preferences.dates.end}
                  className="input input-bordered w-full"
                />
              </label>
              <div className="mt-4 flex justify-between">
                <button className="btn" onClick={handlePrev}>
                  Previous
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {recommendations && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Travel Recommendations
            </h2>
            {recommendations.destinations.map((destination, index) => (
              <div
                key={index}
                className="mb-6 bg-base-100 shadow-md p-4 rounded-md"
              >
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p>{destination.description}</p>
                <h4 className="font-semibold mt-2">Activities:</h4>
                <ul>
                  {destination.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mt-2">Hotels:</h4>
                <ul>
                  {destination.hotels.map((hotel, idx) => (
                    <li key={idx}>
                      <strong>{hotel.name}</strong>: {hotel.description} -{" "}
                      {hotel.price}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold mt-2">Restaurants:</h4>
                <ul>
                  {destination.restaurants.map((restaurant, idx) => (
                    <li key={idx}>
                      <strong>{restaurant.name}</strong>:{" "}
                      {restaurant.description} - {restaurant.price}
                    </li>
                  ))}
                </ul>
                <div className="w-full flex justify-center mt-2.5">
                <button
                  className="btn btn-primary text-white"
                >
                  Book
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Vacation;
