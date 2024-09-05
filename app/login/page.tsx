import { FaGoogle } from "react-icons/fa6";
import Footer from "../(components)/structure/Footer";

export default function Login() {
  return (
    <>
      <section className="h-[75vh] flex flex-col justify-center items-center gap-1">
        <div className="text-base font-bold">Login into your account</div>
        <div className="text-sm">Please use one of the providers below</div>
        <div className="w-[20vw]">
          <div className="divider" />
        </div>
        <button className="btn btn-outline">
          <FaGoogle /> Login with Google
        </button>
      </section>
      <div className="divider" />
      <Footer />
    </>
  );
}
