import Link from "next/link";

const configuration = require("../../configuration");

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content p-6 flex flex-row justify-between">
      <div className="text-sm">
        <Link href="/" className="font-bold text-primary hover:text-primary/80">
          {configuration.name}
        </Link>{" "}
        © 2024
      </div>
      <div className="text-sm font-medium text-base-content flex flex-row gap-2 items-center">
        {configuration.links.map((link: any, index: any) => (
          <div key={link.title} className="flex flex-row gap-2">
            <Link href={link.href} className="hover:text-base-content/80">
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
