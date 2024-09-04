import Statistics from "./(components)/dashboard/Statistics";
import Issues from "./(components)/issues/Issues";

export default function Home() {
  return (
    <>
      <section className="py-2 px-4">
        <h1>Statistics</h1>
        <Statistics />
        <div className="divider" />
        <Issues />
      </section>
    </>
  );
}
