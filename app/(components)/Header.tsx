import { FaBarsStaggered, FaBug } from "react-icons/fa6";
import { configuration } from "../configuration";
import ThemeSelector from "./ThemeSelector";
import Link from "next/link";

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
                <a>Login</a>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-primary text-white text-lg">
            <img src="/favicon.svg" width={24} height={24} />{" "}
            {configuration.name}
          </Link>
        </div>
        <div className="navbar-end flex pr-4 lg:hidden">
          <ThemeSelector />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <a>Login</a>
            </li>
            <li>
              <ThemeSelector />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
