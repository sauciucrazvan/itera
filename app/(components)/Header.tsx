import { FaBarsStaggered, FaBug } from "react-icons/fa6";
import { configuration } from "../configuration";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown pr-2">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Issues</a>
                <a>Login</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-primary text-white text-lg">
            {configuration.icon} {configuration.name}
          </a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Issues</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
