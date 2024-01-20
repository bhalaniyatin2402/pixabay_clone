import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import Drawer from "./Drawer";
import Layout from "./Layout";
import { setIsLoggedIn } from "../../redux/slices/authSlice";
import { useLogoutMutation } from "../../redux/services/authApi";

import "../../styles/components/layout/Header.scss";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  async function handleLogout() {
    const res = await logout();
    if (res?.data?.success) {
      dispatch(setIsLoggedIn([false, ""]));
      localStorage.setItem("isLoggedIn", "");
      localStorage.setItem("username", "");
      navigate("/");
    }
  }

  return (
    <>
      <Layout className="layout">
        <header
          className={`${
            location.pathname == "/" ? "header-light" : "header-dark"
          }`}
        >
          <div className="header-left">
            <Link to="/">Home</Link>
          </div>
          <div className="header-right">
            {isLoggedIn ? (
              <>
                <Link to="/user/favorite">favorite</Link>
                <p className="cursor-pointer" onClick={handleLogout}>
                  logout
                </p>
                <button>{username}</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/sign-up">
                  <button>Create Account</button>
                </Link>
              </>
            )}
          </div>
          <div className="mobile-view-header-menu">
            <label htmlFor="my-drawer">
              <IoMenu className="w-[25px] h-[25px]" />
            </label>
          </div>
        </header>
      </Layout>
      <Drawer />
    </>
  );
}

export default Header;
