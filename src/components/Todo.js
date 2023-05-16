import React from "react";
import styles from "../App.module.css";
import { ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Todo({ list, handleDeleteTodo }) {
  const handleDelete = () => {
    handleDeleteTodo(list);
  };
  return (
    <div key={list.id} className={styles.ContentWrap}>
      <div className={styles.CheckArea}>
        <ImCheckboxUnchecked className={styles.CheckIcon} />
        <p className={styles.ConetentTitle}>{list.title}</p>
      </div>
      <button onClick={handleDelete} className={styles.DeleteButton}>
        <RiDeleteBin6Fill className={styles.DeleteIcon} />
      </button>
    </div>
  );
}
