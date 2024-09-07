import { FaGoogle } from "react-icons/fa6";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <section className="py-2 px-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Login</li>
          </ul>
        </div>
        <section className="flex flex-col justify-center items-center gap-1">
          <div className="text-base font-bold">Login into your account</div>
          <div className="text-sm">Please use one of the providers below</div>
          <div className="w-[20vw]">
            <div className="divider" />
          </div>
          <button className="btn btn-outline">
            <FaGoogle /> Login with Google
          </button>
        </section>
      </section>
    </>
  );
}
