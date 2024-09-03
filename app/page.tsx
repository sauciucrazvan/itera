import Statistics from "./(components)/dashboard/Statistics";
import Header from "./(components)/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="px-4">
        <div className="flex flex-row items-center justify-center py-4">
          <Statistics />
        </div>
      </section>
    </div>
  );
}
