import AuthThibou from "../../components/auth.thibou";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";


function App() {
    return (
        <>
        <main className={"mx-auto flex h-full max-w-5xl flex-col gap-4 px-4 xl:px-0"}>
            <Header />
            <AuthThibou />
        </main>
        <Footer />
        </>
);
}

export default App;