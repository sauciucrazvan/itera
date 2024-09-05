import { FaBarsStaggered, FaBug } from "react-icons/fa6";
import { configuration } from "../../configuration";
import ThemeSelector from "./ThemeSelector";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <div className="navbar bg-base-200">
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
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2 font-bold"
          >
            <Image
              src="/favicon.svg"
              width={24}
              height={24}
              alt={configuration.name}
            />{" "}
            {configuration.name}
          </Link>
        </div>
        <div className="navbar-end flex pr-4 lg:hidden">
          <ThemeSelector />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link href="/login">Login</Link>
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
