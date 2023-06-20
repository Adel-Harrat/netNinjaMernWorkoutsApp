import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ title, load, reps, createdAt, _id }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;

    const response = await fetch(
      "https://net-ninja-mern-worouts-api.vercel.app/api/workouts/" + _id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <article className="bg-white rounded-lg mb-5 p-5 relative">
      <h2 className="text-3xl text-sky-500 font-bold mb-2">{title}</h2>
      <p>
        <span className="uppercase font-semibold tracking-wider">Load</span>
        <span className="text-gray-500">{load} kg</span>
      </p>
      <p>
        <span className="uppercase font-semibold tracking-wider">Reps </span>
        <span className="text-gray-500">{reps}</span>
      </p>
      <p className="text-gray-500">
        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
      </p>
      <span
        className="text-red-500 text-xs rounded-lg cursor-pointer inline-block mt-5 uppercase tracking-widest absolute top-0 right-5"
        onClick={handleClick}
      >
        Delete
      </span>
    </article>
  );
};

export default WorkoutDetails;
