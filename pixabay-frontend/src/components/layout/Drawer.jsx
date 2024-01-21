import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { setIsLoggedIn } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/services/authApi";

function Drawer() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    const res = await logout();
    if (res?.data?.success) {
      dispatch(setIsLoggedIn([false, ""]));
      localStorage.setItem("isLoggedIn", "");
      localStorage.removeItem("username");
      navigate("/");
    }
  }

  useEffect(() => {
    const element = document.getElementById("my-drawer");
    element.checked = false;
  }, [location]);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="drawer-content menu px-4 py-3 w-[70%] max-w-[250px] min-h-full bg-[#ffffff]">
          {isLoggedIn ? (
            <>
              <p className="p-2 bg-[#e7b85f] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide">
                {username}
              </p>
              <Link to="/user/favorite" className="w-full">
                <p className="p-2 bg-[lightgray] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide">
                  favorite
                </p>
              </Link>
              <Link to="/user/history" className="w-full">
                <p className="p-2 bg-[lightgray] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide">
                  history
                </p>
              </Link>
              <p
                className="p-2 bg-[lightgray] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide"
                onClick={handleLogout}
              >
                logout
              </p>
            </>
          ) : (
            <>
              <Link to="/login" className="w-full">
                <p className="p-2 bg-[lightgray] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide">
                  login
                </p>
              </Link>
              <Link to="/sign-up" className="w-full">
                <p className="p-2 bg-[lightgray] w-full text-center text-xl rounded-lg cursor-pointer text-[#000000] font-bold tracking-wide">
                  Create Account
                </p>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
