import { useState } from "react";
import Empty from "./Empty";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { motion } from "framer-motion";

const TodoMain = ({
  filterValue,
  overlay,
  setOverlay,
  search,
}: {
  filterValue: string;
  search: string;
  overlay: boolean;
  setOverlay: (overlay: boolean) => void;
}) => {
  const [displayValue, setDisplayValue] = useState<
    { val: string; check: boolean }[]
  >([]);
  const [values, setValues] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    setValues("");
    if (values !== "") {
      if (editIndex !== -1) {
        setDisplayValue((prevValue) =>
          prevValue.map((val, index) =>
            index === editIndex ? { val: values, check: false } : val
          )
        );
        setEditIndex(-1);
      } else {
        setDisplayValue((prevValue) => [
          ...prevValue,
          { val: values, check: false },
        ]);
      }
      setOverlay(false);
    }
  };

  const handleRemove = (index: number) => {
    const filter = displayValue.filter((_, itemIndex) => itemIndex !== index);
    setDisplayValue(filter);
  };

  const handleEdit = (index: number) => {
    const currentValue = displayValue[index].val;
    setValues(currentValue);
    setOverlay(true);
    setEditIndex(index);
  };

  const handleChecked = (index: number) => {
    const updateValue = [...displayValue];
    updateValue[index].check = !updateValue[index].check;
    setDisplayValue(updateValue);
  };

  return displayValue.length || overlay !== false ? (
    <main>
      {overlay && (
        <form
          className="absolute bg-[rgba(0,0,0,0.5)] left-0 right-0 top-0 bottom-0 flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center items-center px-5 py-4 bg-white rounded-xl w-[90%] max-w-[350px] md:max-w-[500px]"
          >
            <h2 className="text-xl mb-5">NEW NOTE</h2>
            <input
              className="border-purple border-[1px] rounded-md outline-0 w-full py-2 px-4"
              type="text"
              value={values}
              placeholder="Add new Todo"
              onChange={(e) => setValues(e.target.value)}
            />
            <div className="flex justify-between mt-20 md:mt-32 w-full">
              <button
                type="button"
                onClick={() => {
                  setOverlay(false);
                  setValues("");
                }}
                className="py-1 px-4 text-purple bg-white border-[1px] border-purple rounded-md"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="py-1 px-4 text-white bg-purple border-[1px] border-purple rounded-md"
              >
                APPLY
              </button>
            </div>
          </motion.div>
        </form>
      )}
      <ul className="px-5 mt-5 uppercase flex flex-col gap-3 md:gap-4 md:mt-8 md:px-10 [&>*:first-child]:border-0">
        {displayValue.map(
          (value, index) =>
            (filterValue !== "COMPLETED" || value.check === true) &&
            (filterValue !== "ACTIVE" || value.check === false) &&
            value.val.toLowerCase().includes(search.toLowerCase()) && (
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`flex items-center gap-3 justify-between border-t-purple border-t-[1px] pt-3 md:pt-4 group
                `}
                key={index}
              >
                <div className="flex gap-3">
                  <input
                    className="appearance-none border-[1px] rounded w-[26px] h-[26px] border-purple checked:bg-purple checked:after:content-['✔']
                    checked:after:text-white checked:after:ml-[6px]"
                    type="checkbox"
                    checked={value.check}
                    onChange={() => handleChecked(index)}
                  />
                  <li
                    className={`${
                      value.check && "line-through opacity-[.5]"
                    } md:text-xl`}
                  >
                    {value.val}
                  </li>
                </div>
                <div className="flex gap-2 md:hidden group-hover:flex group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                  <img
                    onClick={() => handleEdit(index)}
                    className="cursor-pointer"
                    src={edit}
                    alt="edit icon"
                  />
                  <img
                    onClick={() => handleRemove(index)}
                    className="cursor-pointer"
                    src={trash}
                    alt="trash icon"
                  />
                </div>
              </motion.div>
            )
        )}
      </ul>
    </main>
  ) : (
    <Empty />
  );
};

export default TodoMain;
