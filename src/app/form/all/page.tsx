"use client"

import { GetServerSideProps } from "next";
import styles from "./page.module.scss";
import Filter from "@/components/Filter";
import FormRow from "@/components/FormRow";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import getSimular from "@/helper/getSimular";

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

  useEffect(() => {
    const fetchForms = async () => {
      const res = await axios.get("/api/form/forms");
      setForms(res.data.data);
    };

    fetchForms();
  }, []);

    // shortForms = list.map((data: FormListData) => (
    //   <FormRow
    //     key={data._id}
    //     title={data.title}
    //     category={data.category[0]}
    //     votes={data.votes}
    //     isShort={data.isShortForm}
    //   />
    // ))

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
                  {forms.map((form) => (
                    <FormRow
                      key={form._id}
                      id={form._id}
                      title={form.title}
                      category={form.category[0]}
                      votes={form.votes}
                      isShort={form.isShortForm}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <Filter isShortFormTab={true}/>
      </div>
    </main>
  )
}