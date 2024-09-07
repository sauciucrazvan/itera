import Statistics from "./(components)/dashboard/Statistics";
import Footer from "./(components)/structure/Footer";
import Issues from "./(components)/issues/Issues";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "threads"));
  let data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });

  return (
    <>
      <section className="py-2 px-4">
        <Statistics />
        <div className="divider" />
        <Issues data={data} />
      </section>
      <Footer />
    </>
  );
}
