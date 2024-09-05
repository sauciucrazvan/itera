import Link from "next/link";
import Image from "next/image";

import { configuration } from "../../configuration";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-base-200 text-base-content items-center rounded-md p-4">
        <aside className="grid-flow-col items-center">
          <Image
            src="/favicon.svg"
            width={48}
            height={48}
            alt={configuration.name}
          />
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
