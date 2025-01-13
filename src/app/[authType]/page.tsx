"use client";

import { use } from "react";
import Signin from "@/components/signin";
import Signup from "@/components/signup";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useThemeContext } from "@/hooks/useTheme";
import { notFound } from "next/navigation"; // Import de notFound()

export default function AuthPage({ params: paramsPromise }) {
  const params = use(paramsPromise);

  const { systemTheme } = useThemeContext();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const authType = params?.authType;

  const validAuthTypes = ["signup", "signin"];

  if (!authType || !validAuthTypes.includes(authType)) {
    notFound();
  }

  const Component = authType === "signup" ? Signup : Signin;

  return (
    <div
      style={{
        backgroundColor: systemTheme.background.primary,
        minHeight: "100vh", // Assure que la page occupe tout l'écran
      }}
    >
      <main className="max-w-5xl mx-auto flex h-full flex-col gap-4 px-4">
        <Header />
        <Component />
      </main>
      <Footer />
    </div>
  );
}
