"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {useThemeContext} from "@/hooks/useTheme";
import AskResetPassword from "@/components/askResetPassword";

const Page = () => {


    const { systemTheme } = useThemeContext();





    // Log or display the query parameter

    return (
        <div
            style={{
                backgroundColor: systemTheme.background.primary,
            }}
        >
            <main className="min-h-screen max-w-5xl mx-auto flex h-full flex-col gap-4 px-4">
                <Header />
                <AskResetPassword/>
            </main>
            <Footer />
        </div>
    );
}

export default Page;
