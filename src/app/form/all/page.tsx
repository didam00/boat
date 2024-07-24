"use client"

import { GetServerSideProps } from "next";
import styles from "./page.module.scss";
import Filter from "@/components/Filter";
import FormRow from "@/components/FormRow";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import getSimular from "@/helper/getSimular";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 5;

interface FormListData {
  _id: string;
  title: string;
  category: string[];
  views: number;
  votes: number;
  isShortForm: boolean;
  author: string;
}

export default function AllFormsList() {
  const [forms, setForms] = useState<FormListData[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("page")) || 1;
  });

  useEffect(() => {
    const fetchPageCount = async () => {
      const res = await fetch("/api/form/forms/size");
      const { data } = await res.json();
      setPageCount(Math.ceil(data / PAGE_SIZE));
    };

    fetchPageCount();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      const res = await fetch(`/api/form/forms?page=${page}&pageSize=${PAGE_SIZE}`);
      const { data } = await res.json();
      setForms(data);
    };
    
    fetchForms();
  }, [page]);

  let formRows: JSX.Element[] = [];

  if (forms.length === 0) {
    formRows = new Array(PAGE_SIZE).fill(0).map((_, idx) => (
      <FormRow key={idx} isSkeleton />
    ));
  } else {
    formRows = forms.map((form) => (
      <FormRow
        key={form._id}
        id={form._id}
        title={form.title}
        category={form.category[0]}
        votes={form.votes}
        isShort={form.isShortForm}
      />
    ))
  }

  return (
    <main>
      <div className={`m__size ${styles["top-container"]}`} style={{display: "flex"}}>
        <div className="left-container">
          <section className={`${styles['flex-container']}`}>
            <h2 className="page_title">모든 설문 목록</h2>
            <div className={styles["forms-table-container"]}>
              <table className={styles["forms-table"]}>
                <tbody>
                  <tr className={styles["table-header"]}>
                    <th style={{width: "50%"}}>제목</th>
                    <th style={{width: "25%"}}>카테고리</th>
                    <th style={{width: "25%"}}>참여수</th>
                  </tr>
                  {formRows}
                </tbody>
              </table>
            </div>
            <Pagination
              page={page}
              pageCount={pageCount}
              setPage={setPage}
            />
          </section>
        </div>
        <Filter isShortFormTab={true}/>
      </div>
    </main>
  )
}