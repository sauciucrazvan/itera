import Link from "next/link";
import { configuration } from "../configuration";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="divider" />
      <footer className="footer bg-neutral text-neutral-content items-center rounded-md p-4">
        <aside className="grid-flow-col items-center">
          {configuration.icon}
          <div className="flex flex-col">
            <p>
              {configuration.name} / Copyright © {new Date().getFullYear()} -
              All rights reserved
            </p>
            <p className="flex flex-row gap-1 items-center">
              Made with <FaHeart color="red" /> by
              <Link href="https://razvansauciuc.dev">Răzvan Sauciuc</Link>
            </p>
          </div>
        </aside>
      </footer>
    </>
  );
}
