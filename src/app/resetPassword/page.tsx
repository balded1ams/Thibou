"use client";
import { useSearchParams } from 'next/navigation';
import Footer from "@/components/footer";
import Header from "@/components/header";
import ResetPassword from "@/components/resetPassword";
import {useThemeContext} from "@/hooks/useTheme";
import { useRouter } from 'next/navigation';
import {useEffect} from "react";

const Page = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const { systemTheme } = useThemeContext();

    const uuidValue = searchParams.get('t') ?? null;

    console.log('test1');


    //Si la requete est mauvaise
    useEffect(() => {
        if (typeof uuidValue !== "string") {
            router.push('/404'); // Replace '/target-page' with the actual URL
        }
    }, [router]);






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
