import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import Layout from "./Layout";
import "../../styles/components/layout/Header.scss";

function Header() {
  return (
    <>
      <Layout className="layout">
        <header>
          <div className="header-left">
            <Link to="/">Home</Link>
          </div>
          <div className="header-right">
            <Link to="/login">Login</Link>
            <Link to="/sign-up">
              <button>Create Account</button>
            </Link>
          </div>
          <div className="mobile-view-header-menu">
            <label htmlFor="my-drawer">
              <IoMenu className="w-[25px] h-[25px]" />
            </label>
          </div>
        </header>
      </Layout>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="drawer-content menu px-4 py-6 w-[70%] max-w-[300px] min-h-full bg-[#ffffff]">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/sign-up">Create Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
