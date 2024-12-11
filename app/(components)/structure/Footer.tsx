import Link from "next/link";
import Image from "next/image";

const configuration = require("../../configuration");
const { version } = require("../../../package.json");

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content p-6 gap-5 flex flex-row justify-between">
      <div className="flex flex-col gap-1 justify-start flex-1">
        <div className="text-sm">
          <Link
            href="/"
            className="font-bold text-primary hover:text-primary/80"
          >
            {configuration.name}
          </Link>{" "}
          © 2024
        </div>
        <div className="text-base-content text-xs">v{version}</div>
        <div>
          <Image
            src="/favicon.svg"
            width={32}
            height={32}
            alt={configuration.name}
            className="opacity-50"
          />
        </div>
      </div>
      <div className="text-sm font-medium text-base-content flex flex-col gap-2 items-start">
        <b>Links</b>
        <div className="flex flex-col gap-0.5">
          {configuration.links.map((link: any) => (
            <div key={link.title}>
              <Link href={link.href} className="hover:text-base-content/80">
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="text-sm font-medium text-base-content flex flex-col gap-2 items-start">
        <b>Help</b>
        <div className="flex flex-col gap-0.5">
          <Link
            href={"https://github.com/sauciucrazvan/itera/blob/main/DOCS.md"}
            className="hover:text-base-content/80"
          >
            Documentation
          </Link>
          <Link
            href={"https://github.com/sauciucrazvan/itera/issues"}
            className="hover:text-base-content/80"
          >
            Found an issue?
          </Link>
        </div>
      </div>
    </footer>
  );
}
