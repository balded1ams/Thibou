"use client";

import { use } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useThemeContext } from "@/hooks/useTheme";
import Form from "@/components/form";

export default function FormCompte({ params: paramsPromise }) {
  const params = use(paramsPromise);

  const { systemTheme } = useThemeContext();


  return (
    <div
      style={{
        backgroundColor: systemTheme.background.primary,
      }}
    >
      <main className="min-h-screen max-w-5xl mx-auto flex h-full flex-col gap-4 px-4">
        <Header/>
        <Form/>
      </main>
      <Footer/>
    </div>
  );
}
