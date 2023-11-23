import { useState } from "react";
import Header from "./components/Header";
import TodoMain from "./components/TodoMain";
import plus from "./assets/plus.svg";

const App = () => {
  const [filterValue, setFilterValue] = useState("all");
  const [overlay, setOverlay] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="pt-8 flex flex-col">
      <Header setFilterValue={setFilterValue} setSearch={setSearch} />
      <TodoMain
        filterValue={filterValue}
        overlay={overlay}
        setOverlay={setOverlay}
        search={search}
      />
      <button
        onClick={() => {
          setOverlay(true);
        }}
        className="text-4xl text-white bg-purple shadow cursor-pointer mt-3 self-end mr-3 rounded-full p-3 fixed bottom-4"
      >
        <img src={plus} alt="plus icon" />
      </button>
    </div>
  );
};

export default App;
