import React from "react";
import styles from "../App.module.css";
import { ImCheckboxUnchecked } from "react-icons/im";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";

export default function Todo({ list, handleDeleteTodo, handleUpdateTodo }) {
  const handleDelete = () => {
    handleDeleteTodo(list);
  };

  const handleUpdate = () => {
    handleUpdateTodo(list);
  };

  return (
    <div key={list.id} className={styles.ContentWrap}>
      <div className={styles.CheckArea}>
        {list.isActive ? (
          <ImCheckboxUnchecked
            onClick={handleUpdate}
            className={styles.CheckIcon}
          />
        ) : (
          <MdCheckBox onClick={handleUpdate} className={styles.CheckIcon} />
        )}

        <p className={styles.ConetentTitle}>{list.title}</p>
      </div>
      <button onClick={handleDelete} className={styles.DeleteButton}>
        <RiDeleteBin6Fill className={styles.DeleteIcon} />
      </button>
    </div>
  );
}
