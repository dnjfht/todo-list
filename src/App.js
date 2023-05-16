import { useState } from "react";
import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";
import { HiMoon, HiSun } from "react-icons/hi";
// import Todo from "./components/Todo";
import { ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";

import { useDarkMode } from "./DarkModeContext";

function App() {
  const [todo, setTodo] = useState(initialState);
  const [title, setTitle] = useState("");
  // const [darkmode, setDarkmode] = useState(false);

  const filters = ["all", "active", "completed"];
  const [filter, setFilter] = useState(filters[0]);

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    const newTodo = { id: uuidv4(), title: title, isActive: true };

    setTodo((prev) => [...prev, newTodo]);

    setTitle("");
  };

  const handleDeleteTodo = (id) => {
    setTodo(todo.filter((t) => t.id !== id));
  };

  // const handleDeleteTodo = (deleted) => {
  //   setTodo(todo.filter((t) => t.id !== deleted.id));
  // };

  const handleUpdateTodo = (id) => {
    setTodo(
      todo.map((t) => {
        if (t.id === id) {
          return { ...t, isActive: !t.isActive };
        }
        return t;
      })
    );
  };

  // const handleUpdateTodo = (updated) => {
  //   setTodo(
  //     todo.map((t) => {
  //       if (t.id === updated.id) {
  //         return { ...t, isActive: !t.isActive };
  //       }
  //       return t;
  //     })
  //   );
  // };

  console.log(todo);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  console.log(filter);

  const filtered = getFilteredItems(todo, filter);

  function getFilteredItems(todo, filter) {
    if (filter === "all") {
      return todo;
    } else if (filter === "active") {
      return todo.filter((t) => t.isActive === true);
    } else if (filter === "completed") {
      return todo.filter((t) => t.isActive === false);
    }
  }

  // const handleDarkModeSwitch = () => {
  //   setDarkmode(!darkmode);
  // };

  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={styles.Wrap}>
      {/* todo container */}
      <div className={styles.TodoBox}>
        {/* navbar */}
        <nav className={styles.NavBar}>
          <button onClick={toggleDarkMode} className={styles.DarkModeBtn}>
            {!darkMode && <HiMoon className={styles.DarkModeIcon} />}
            {darkMode && <HiSun className={styles.DarkModeIcon} />}
          </button>

          <ul className={styles.Menu}>
            {filters.map((value, index) => (
              <li key={index} className={styles.List}>
                <button
                  onClick={() => handleFilterChange(value)}
                  className={styles.ListButton}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* contents */}
        <div className={styles.Contents}>
          {filtered.map((list) => {
            return (
              <div key={list.id} className={styles.ContentWrap}>
                <div className={styles.CheckArea}>
                  {list.isActive ? (
                    <ImCheckboxUnchecked
                      onClick={() => handleUpdateTodo(list.id)}
                      className={styles.CheckIcon}
                    />
                  ) : (
                    <MdCheckBox
                      onClick={() => handleUpdateTodo(list.id)}
                      className={styles.CheckIcon}
                    />
                  )}

                  <p
                    style={{
                      textDecoration: list.isActive ? "none" : "line-through",
                    }}
                    className={styles.ConetentTitle}
                  >
                    {list.title}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteTodo(list.id)}
                  className={styles.DeleteButton}
                >
                  <RiDeleteBin6Fill className={styles.DeleteIcon} />
                </button>
              </div>
            );
          })}
        </div>

        {/* write_input */}
        <div className={styles.TodoInputWrap}>
          <input
            onChange={handleTitleInputChange}
            value={title}
            className={styles.InputText}
            type="text"
            placeholder="Add Todo..."
          />
          <button
            onClick={handleAddTodo}
            className={styles.SubmitButton}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

const initialState = [
  { id: uuidv4(), title: "공부하기", isActive: true },
  { id: uuidv4(), title: "밥먹기", isActive: true },
  { id: uuidv4(), title: "강의 보기", isActive: false },
  { id: uuidv4(), title: "카페가기", isActive: false },
  { id: uuidv4(), title: "청소하기", isActive: false },
];
