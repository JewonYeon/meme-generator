import 이제부턴정말공부뿐이야 from "./이제부턴정말공부뿐이야.png";

export interface IData {
  id: number;
  src: string;
  original: string;
  width: number;
  height: number;
}

export const data: Array<IData> = [
  {
    id: 0, // 식별하기 위한 ID
    src: 이제부턴정말공부뿐이야,
    original: "이제부턴 정말 공부 뿐이야", // 원본 표시
    width: 380,
    height: 390,
  },
];
