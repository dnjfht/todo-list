import { useState } from "react";
import styles from "./App.module.css";
import { v4 as uuidv4 } from "uuid";
import { CiLight } from "react-icons/ci";

function App() {
  const [todo, setTodo] = useState(initialState);

  return (
    <div className={styles.Wrap}>
      {/* todo container */}
      <div className={styles.TodoBox}>
        {/* navbar */}
        <nav className={styles.NavBar}>
          <CiLight className={styles.LightIcon} />

          <ul className={styles.Menu}>
            <li className={styles.List}>All</li>
            <li className={styles.List}>Active</li>
            <li className={styles.List}>Completed</li>
          </ul>
        </nav>

        {/* contents */}
        <div className={styles.Contents}></div>

        {/* write_input */}
        <div className={styles.TodoInputWrap}>
          <input
            className={styles.InputText}
            type="text"
            placeholder="Add Todo..."
          />
          <button className={styles.SubmitButton} type="button">
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
