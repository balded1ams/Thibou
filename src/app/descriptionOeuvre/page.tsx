import { use } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import DescriptionOeuvre from "@/components/descriptionOeuvre";

export default function DescriptionPage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  return (
    <div>
        <main className="min-h-screen">
            <Header/>
            <DescriptionOeuvre/>
        </main>
        <Footer/>
    </div>
  );
}
