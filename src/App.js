import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";
import { HiMoon, HiSun } from "react-icons/hi";
// import Todo from "./components/Todo";
import { ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";

import { useDarkMode } from "./DarkModeContext";

function App() {
  const [todo, setTodo] = useState(() => readTodoFromLocalStorage());
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

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

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

function readTodoFromLocalStorage() {
  // 새로운 아이디가 추가되거나 업데이트가 일어날 때마다
  // 함수가 다시 호출되면서 로컬 스토리지에 있는 데이터를 다시 읽어와서 파싱한다.
  // useState는 React에서 제공하는 hook이고, 인자로는 초기값을 전달할 수 있다.
  // 컴포넌트 상태가 변경이 되거나 prop이 변경이 되면 모든 함수가 재호출되게 된다.
  // useState는 내부적으로 컴포넌트에 필요한 데이터들을 기억하고 있다.
  // useState 내부적으로 저장된 데이터가 있다면 초기값을 무시하고 내부적으로 사용하고 있는 값을 사용하게 된다.

  // 함수를 호출해서 데이터를 읽어오거나 로컬 스토리지를 읽어오거나 파일을 읽어 오거나 이런 일들을 한다면
  // 함수(컴포넌트)가 호출이 될 때마다 다시 행동을 읽어온다.
  // 그리고 내부적으로 읽어온 값을 사용하지 않고 내부적으로 가지고 있는 값을 쓸 것이다.
  // 그럼 UI상으로 업데이트 되지는 않겠지만, 여전히 네트워크에서 불필요하게 데이터를 읽게 될 것이다.
  // 이걸 방지해주기 위해서 함수를 호출하는 경우라면, 특히 무거운 일을 하는 경우라면
  // 호출한 값 자체를 전달하는 것이 아니라 콜백함수로 감싸줘야 한다.
  // 그렇게 하면 아무리 상태를 바꾸거나 업데이트가 되어도 다시 함수가 호출되지 않는다.
  const todo = localStorage.getItem("todo");
  return todo ? JSON.parse(todo) : [];
}
