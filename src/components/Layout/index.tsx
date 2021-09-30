import React from "react";
import styles from "./Layout.module.scss";

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <main className={styles.layout}>{children}</main>
    </div>
  );
};

export default Layout;

/**
 * Layout 컴포넌트
 * Header를 제외한 다른 페이지를 담는 용도
 * 코드 간소화를 위함
 */
