import React, { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkouthtmlForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      // https://net-ninja-mern-worouts-api.vercel.app/
      // https://net-ninja-mern-worouts-api.vercel.app/
      const response = await fetch(
        "https://net-ninja-mern-worouts-api.vercel.app/api/workouts",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_WORKOUTS",
          payload: json,
        });
      }
    };

    if (user) fetchWorkouts();
  }, [dispatch, user]);

  return (
    <main className="lg:flex items-start justify-between space-x-20">
      <section id="workouts" className="grow">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} {...workout} />
          ))}
      </section>

      <section id="workoutForm" className="basis-96">
        <WorkouthtmlForm />
      </section>
    </main>
  );
};

export default Home;
