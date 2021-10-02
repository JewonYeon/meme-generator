import React, { useEffect, useRef } from "react";
import { IData } from "@assets/images";
import styles from "./DrawCanvas.module.scss";

interface Props {
  data: IData;
  text: string;
}

const DrawCanvas = ({ data, text }: Props) => {
  const { id, src, original, width, height } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawOverlay();
  });

  const drawOverlay = () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) {
      return;
    }

    const image = new Image();
    image.src = src;

    image.onload = function () {
      drawImage(ctx, image);
      drawText(ctx, text);
    };
  };

  const drawImage = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    ctx.drawImage(image, 0, 0);
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string) => {
    ctx.font = "24px serif";
    ctx.fillText(text, 16, 80);
  };

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
};

export default DrawCanvas;

/** 구현 순서
 * 1. 이미지, 텍스트의 정보를 prop로 받는다. 
    상위 컴포넌트 or 페이지에서 넘겨주는 방식으로 구현

 * 주요 기능
    1. 이미지를 canvas에 배치
    2. 사용자의 텍스트에 따라 실시간으로 반영
  => 구현 방법 : prop가 변경될 때마다 렌더링이 되는 것을 이용, canvas tag에 구현 (추후에 저장하기 위해)
      관련 함수 구현
        1) 이미지 정보(src)를 받아 canvas에 그리는 함수
        2) 기존 텍스트 배치하는 함수
        3) 동적으로 텍스트를 반영하는 함수
  (추후 개선)
 */

/** 구현 순서
 * 1. 이미지를 불러온다
    1-1) src/assets/images 폴더에 이미지를 담고, 각 이미지에 대한 정보를 모아(undex.ts) export 한다.
    1-2) import 후 이미지 정보 사용 => 추후에 리팩토링을 통해 prop으로 받을 것

 * 2. canvas에 이미지를 배치한다.
    이미지를 캔버스로 불러오는것은 기본적으로 두 단계를 필요로 합니다:
      1. HTMLImageElement (en-US) object를 참조하거나 다른 캔버스 요소를 소스로 사용합니다. 이는 URL을 가지고 이미지를 사용 할 수 있습니다.
      2. (사용) drawImage() function을 사용하여 캔버스에 나타난 이미지 위에 그림을 그립니다.

    2-1) <canvas ref={canvasRef} height="1000" width="1000"></canvas> 태그 생성 
          width, height는 추후에 수정
    2-2) 리액트에서 특정 DOM을 선택하기 위해 useRef 생성 
          const canvasRef = useRef<HTMLCanvasElement>(null);
          추후에 사용 시, canvasRef.current를 통해 사용!

    --- InitCanvas 함수를 생성해 useEffect안에서 실행 (렌더링 이후에 어떤 일을 수행) ---

    2-3) 엘리먼트의 컨텍스트(렌더링될 그리기의 대상)를 얻는다.
          const ctx = canvas.getContext('2d');
          주의 : canvas에 image를 background로 넣을 때, 아직 Load 되지 않은 image를 canvas에 넣으려고 할 때 에러가 생김
                => 이미지가 로드 되고 canvas에 image를 넣어준다.

    2-4) 이미지 생성하기
          const img = new Image();  => Create new img element
          img.src = "경로"           => Set source path

    2-5) 이미지 로드하기 (Canvas에 이미지 삽입 (그리기))  
        * drawImage ( image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        image  : 이미지(DOM image) 또는 Canvas 개체 또는 video 요소
        sx : 이미지 출력할 x 좌표
        sy : 이미지 출력할 y 좌표
        sWidth : [옵션] 이미지 width /원본(source) 잘라낼 영역(clipping rectangle)
        sHeight :  [옵션] 이미지 Height /원본(source) 잘라낼 영역(clipping rectangle)
        dx : [옵션] 만약 잘라내었다면, 대상 이미지의 X좌표
        dy : [옵션] 만약 잘라내었다면, 대상 이미지의 Y좌표
        dWidth : [옵션] 만약 잘라내었다면, 대상 이미지의 width
        dHeight : [옵션] 만약 잘라내었다면, 대상 이미지의 Height    

 * 3. 텍스트 기입란을 생성한다.
    3-1) input 태그 생성
    3-2) input 상태관리하기

 * 4. 입력한 텍스트에 따라 사진 위의 텍스트가 변하게 한다.
    기존에 생성한 canvas ctx에 텍스트를 채우도록 할 것 (이미지 저장을 위해)
    별개의 함수를 생성 => ctx를 인자로 받는다.

    많이 헤맴 : useState의 inputValue에 따라 생성되게 했지만, 계속 글자가 중첩됨
      해결 => 전부 지우고 다시 이미지 배치 및 텍스트 반영 (리팩토링 전만, 후에는 prop로 text를 받을 시 자동 렌더링)

    한 페이지 내에 구현할 때 => 이미지 생성, 업데이트 함수를 생성한 후, change 이벤트를 생성
    추후 리팩토링 시 => props로 텍스트를 받으면 렌더링 되기 때문에 이미지 생성 함수만 실행

    4-1) 기존 텍스트를 이미지에 반영
    4-2) 유저가 기입한 텍스트에 따라 이미지 위의 텍스트 렌더링
 */

/** 에러
 * 1. 이미지 로드는 성공하지만, 새로고침 시 이미지가 사라짐 => useEffect 문제?
 * 해결
    you need to be sure to use the load event so you don't try this before the image has loaded:
    이미지가 로드되기전에 drawImage()를 호출하면 아무 작업도 실행하지 않는다,
    따라서, load이벤트를 통해 이미지 로드 전에 호출하지 않도록 한다.

 */
