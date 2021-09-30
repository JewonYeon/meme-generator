import React from "react";
import "./App.module.scss";
import { Header, Layout } from "@components/index";
import { Routes } from "@routes/index";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Routes />
      </Layout>
    </>
  );
}

export default App;
