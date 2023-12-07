import React from "react";
import Questions from "@/components/Quiz";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0">
      <Questions />
    </main>
  )
}
