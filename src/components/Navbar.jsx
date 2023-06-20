import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <header className="bg-white h-20 flex items-center justify-between">
      <nav className="max-w-6xl w-full mx-auto px-5 xl:px-0 flex justify-between items-center">
        <Link className="text-2xl font-bold" to="/">
          Workout Buddy
        </Link>

        <ul className="flex items-center space-x-5">
          {!user && (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign up</NavLink>
              </li>
            </>
          )}

          {user && (
            <li className="flex space-x-5 items-center">
              <span>{user.email}</span>
              <button
                className="bg-indigo-500 text-white px-3 py-2 rounded-lg uppercase tracking-wider text-sm"
                onClick={handleClick}
                type="button"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
