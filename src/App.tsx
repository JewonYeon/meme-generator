import React from "react";
import "./App.module.scss";
import { Header, Layout } from "@components/index";
import { Routers } from "@routes/index";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <Layout>
        <Routers />
      </Layout>
    </>
  );
}

export default App;
