import Link from "next/link";

import { configuration } from "../../configuration";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content p-6 flex flex-row justify-between">
      <div className="text-sm">
        <Link href="/" className="font-bold text-primary">
          {configuration.name}
        </Link>{" "}
        © 2024
      </div>
      <div className="text-sm font-bold text-secondary flex flex-row gap-2 items-center">
        {configuration.links.map((link, index) => (
          <div key={link.title} className="flex flex-row gap-2">
            <Link href={link.href} className="hover:text-secondary/80">
              {link.title}
            </Link>
            {index < configuration.links.length - 1 && (
              <div className="text-base-content">•</div>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
