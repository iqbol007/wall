import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { galleryItemUpload } from "../../actions/actionCreators";
import styles from "./GalleryAddItemForm.module.css";

export default function GalleryAddItemForm() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { loading } = useSelector(state => state.gallery.edit);
  const handleSubmit = evt => {
    evt.preventDefault();
  };

  const handleFileChange = () => {
    const [file] = Array.from(fileRef.current.files);
    if (file === undefined) {
      return;
    }
    console.log(file);
    valref.current.value = file.name;
    setTimeout(() => {
      dispatch(galleryItemUpload(file));
      fileRef.current.value = "";
      valref.current.value = "";
    }, 2000);
  };

  const handleSelect = () => {
    fileRef.current.click();
  };
  const valref = useRef(null);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Select file</h1>
       
        <input
          ref={fileRef}
          onChange={handleFileChange}
          className={styles.file}
          type="file"
          accept="audio/*,image/*,video/*"
        />
        <input className={styles.select} type="text" ref={valref} />
        <button className={styles.select} onClick={handleSelect}>
          Select file
        </button> {loading && (
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </form>
    </>
  );
}
