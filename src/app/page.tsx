import Image from "next/image";
import Board from "./Components/Board";

export default function Home() {
  return (
    <main className="w-[100vw] bg-black h-[100vh]">
      <Board/>
      {/* <BoardRender/> */}
    </main>
  );
}
