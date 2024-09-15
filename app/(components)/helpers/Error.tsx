import { FaExclamationTriangle } from "react-icons/fa";

export default function Error() {
  return (
    <section className="flex flex-col justify-center items-center gap-1 py-8 text-sm">
      <FaExclamationTriangle color="red" size="32" />
      An error occured. Please contact the system administrator.
    </section>
  );
}
