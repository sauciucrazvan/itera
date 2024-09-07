import Statistics from "./(components)/dashboard/Statistics";
import Footer from "./(components)/structure/Footer";
import Issues from "./(components)/issues/Issues";

export default async function Home() {
  return (
    <>
      <section className="py-2 px-4">
        <Statistics />
        <div className="divider" />
        <Issues />
      </section>
    </>
  );
}
