import React, { useEffect, useRef, useState } from "react";
import { data } from "@assets/images/index"; // 구현 순서 1. 이미지를 불러온다
import styles from "./MemeGenerator.module.scss";
import DrawCanvas from "@components/DrawCanvas";

const MemeGenerator = () => {
  // 구현 순서 3. 텍스트 기입란 생성 및 이벤트 핸들링
  const [inputValue, setInputValue] = useState<string>("");

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <article className={styles.memegenerator}>
      <h1>밈 생성기</h1>
      <DrawCanvas data={data[0]} text={inputValue} />
      <div>
        <input type="text" value={inputValue} onChange={handleChangeInputValue} />
      </div>
    </article>
  );
};

export default MemeGenerator;
