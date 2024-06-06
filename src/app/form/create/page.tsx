"use client"

import { useRouter } from "next/router";
import "./page.module.scss";
import { useEffect } from "react";

export default function CreateFormPage() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [])

  return (
    <main>
      <div className={`m__size`}>
        <section>
          <h2>설문 제작 페이지</h2>
        </section>
      </div>
    </main>
  )
}