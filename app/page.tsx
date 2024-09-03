import Statistics from "./(components)/dashboard/Statistics";
import Header from "./(components)/Header";
import Issues from "./(components)/issues/Issues";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="pt-2 px-4">
        <h1>Statistics</h1>
        <Statistics />
        <div className="divider" />
        <Issues />
      </section>
    </div>
  );
}
