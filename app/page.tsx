import Statistics from "./(components)/dashboard/Statistics";
import Header from "./(components)/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="px-4 py-2">
        <h1>Statistics</h1>
        <div className=" py-4">
          <Statistics />
        </div>
        <h1>Issues</h1>
        <div className="flex flex-row items-center justify-center py-4"></div>
      </section>
    </div>
  );
}
