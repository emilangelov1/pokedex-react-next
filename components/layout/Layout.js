import { PageHeader } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <PageHeader
      backIcon="Back"
      onBack={() => window.history.back()}
      ghost={false}
      title={
        <Link className={styles.link} href="/">
          <img
            classname="pokemonImg"
            src="https://crisgon.github.io/pokedex/src/images/logo.png"
          />
        </Link>
      }
    ></PageHeader>
  );
}
