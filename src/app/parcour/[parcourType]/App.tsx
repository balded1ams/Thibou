import Header from "@/components/header";
import Plan from "@/components/plan"
import Footer from "@/components/footer";
import Guide from "@/components/guide";
import {useThemeContext} from "@/hooks/useTheme";
import { use } from "react";
import { notFound } from "next/navigation";

function App({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const authType = params?.parcourType;
    const validAuthTypes = ["fraction", "description"];
    const imageDesc = authType === "fraction" ? Plan : ImageOeuvre; //plan priority TRUE
    const textDesc = authType === "fraction" ? Guide : ArtworkDesc;

    if (!authType || !validAuthTypes.includes(authType)) {
        notFound();
    }

    const { systemTheme } = useThemeContext();

    return (
        <div
            className='h-screen w-full overflow-y-auto'
            style={{
                backgroundColor: systemTheme.background.primary,
                color: systemTheme.text.primary,
            }}
        >
            <main
                className=' mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0'
                style={{}}
            >
                <Header/>
                <div className="flex flex-col xl:flex-row gap-4">
                    <ImageDesc/>
                    <Guide />
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;