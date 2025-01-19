"use client";
import { useSearchParams } from 'next/navigation';
import Footer from "@/components/footer";
import Header from "@/components/header";
import ResetPassword from "@/components/resetPassword";
import {useThemeContext} from "@/hooks/useTheme";
import {NextResponse} from "next/server";

const Page = () => {
    const searchParams = useSearchParams();

    // Get a specific query parameter
    const uuidValue = searchParams.get('t');

    const { systemTheme } = useThemeContext();


    if (typeof uuidValue !== "string") {
        return NextResponse.error();
    }

    //const params = use(paramsPromise);


    // Log or display the query parameter

    return (
        <div
            style={{
                backgroundColor: systemTheme.background.primary,
            }}
        >
            <main className="min-h-screen max-w-5xl mx-auto flex h-full flex-col gap-4 px-4">
                <Header />
                <ResetPassword uuid={uuidValue}/>
            </main>
            <Footer />
        </div>
    );
}

export default Page;
