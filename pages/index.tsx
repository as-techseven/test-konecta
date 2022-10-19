import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import styles from "../styles/Home.module.css";
import axios from "axios";
import { Button } from "@mui/material";
import {
  uploadFileToFirestore,
  writeSelectedData,
} from "../src/services/firebase";
export interface TasksData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "userId", headerName: "User ID", width: 100 },
  { field: "title", headerName: "Title", width: 400 },
];

const Home: NextPage = () => {
  const [rows, setRows] = useState([]);
  const [rowsSelected, setRowsSelected] = useState([]);

  const onGetData = async () => {
    try {
      const response: any = await axios.get<TasksData[]>(
        "https://jsonplaceholder.typicode.com/todos/"
      );

      setRows(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx ~ line 27 ~ constonGet:RequestHandler<ProductData>= ~ error",
        error
      );
    }
  };

  const onSelectedRow = (selected: any) => {
    const response = selected.map(
      (e: number) => rows.filter((ele: TasksData) => ele.id === e)[0]
    );
    setRowsSelected(response);
  };

  useEffect(() => {
    onGetData();

    return () => {
      null;
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Konecta test</title>
        <meta name="description" content="Konecta test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Konecta Test!</h1>
        <div>
          <input
            type="file"
            accept=".xlsx"
            onChange={(event: any) => {
              uploadFileToFirestore(event.target.files[0]);
            }}
          />
          <button>Upload to Firebase</button>
        </div>

        <div style={{ height: 400, width: "60%", background: "#FFF" }}>
          <Button
            sx={{ mb: 2 }}
            disabled={rowsSelected.length <= 0}
            onClick={() => {
              writeSelectedData(rowsSelected);
            }}
          >
            save selected data
          </Button>
          <DataGrid
            rows={rows}
            pageSize={5}
            columns={columns}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel: any) => {
              onSelectedRow(newSelectionModel);
            }}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
