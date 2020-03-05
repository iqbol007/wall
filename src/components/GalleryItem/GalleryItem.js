import React, { useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExtension } from "../../utils";
import img from "../../img/mp3.png";
import wordImg from "../../img/word.png";
import txtImg from "../../img/txt.png";
import pdfImg from "../../img/pdf.png";
import { removeItem, playItem } from "../../actions/actionCreators";

export default function GalleryItem({ item }) {
  const dispatch = useDispatch();
  const { played } = useSelector(state => state.gallery.list);

  const ext = useMemo(() => getExtension(item.name), [item.name]);

  const mediaRef = useRef(null);
  const delBtnref = useRef(null);

  const handleMouseMoove = () => {
    if (!delBtnref.current) {
      return;
    }
    const btn = delBtnref.current;
    btn.classList.add("show");
  };
  const handleMouseLeave = () => {
    if (!delBtnref.current) {
      return;
    }
    const btn = delBtnref.current;
    btn.classList.remove("show");
  };
  useEffect(() => {
    if (played !== item) {
      return;
    }
    if (!mediaRef.current) {
      return;
    }
    const current = mediaRef.current;
    return () => current.pause();
  }, [played, item]);

  const handlePlay = () => {
    if (!mediaRef.current) {
      return;
    }
    dispatch(playItem(item));

    mediaRef.current.play();
  };
  const handlePause = () => {
    if (!mediaRef.current) {
      return;
    }
    mediaRef.current.pause();
  };
  const handleRemove = () => {
    dispatch(removeItem(item));
  };

  switch (ext) {
    case ".png":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item">
            <img
              className="item"
              src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}
              alt="x"
            />
            <button className="abs-pos" onClick={handleRemove} ref={delBtnref}>
              x
            </button>
            <a
              className="abs-pos"
              href={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}
            >
              DOWNLOAD
            </a>
          </div>
        </div>
      );
    case ".jpg":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <img
              className="item"
              src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}
              alt="x"
            />
            <button className="abs-pos" onClick={handleRemove} ref={delBtnref}>
              x
            </button>

            <a href={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}>
              DOWNLOAD
            </a>
          </div>
        </div>
      );
    case ".mp3":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <img className="item" src={img} alt="x" />
            <audio
              className="item"
              ref={mediaRef}
              src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}
            />
            <button className="btn-play" onClick={handlePlay}>
              Play
            </button>
            <button className="btn-pause" onClick={handlePause}>
              Pause
            </button>
            <button
              className="abs-pos mp-pos"
              onClick={handleRemove}
              ref={delBtnref}
            >
              x
            </button>
          </div>
        </div>
      );
    case ".mpeg":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <video className="item" controls>
              <source
                ref={mediaRef}
                src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}
              />
            </video>
            <button className="btn-play" onClick={handlePlay}>
              Play
            </button>
            <button className="btn-pause" onClick={handlePause}>
              Pause
            </button>
            <button className="abs-pos" onClick={handleRemove} ref={delBtnref}>
              x
            </button>
          </div>
        </div>
      );
    case ".webm":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <video className="item" ref={mediaRef}>
              <source src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`} />
            </video>
            <button className="btn-play" onClick={handlePlay}>
              Play
            </button>
            <button className="btn-pause" onClick={handlePause}>
              Pause
            </button>
            <button className="abs-pos" onClick={handleRemove} ref={delBtnref}>
              x
            </button>
          </div>
        </div>
      );
    case ".mp4":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <video className="item" ref={mediaRef}>
              <source src={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`} />
            </video>
            <button className="btn-play" onClick={handlePlay}>
              Play
            </button>
            <button className="btn-pause" onClick={handlePause}>
              Pause
            </button>
            <button
              className="abs-pos mp-pos"
              onClick={handleRemove}
              ref={delBtnref}
            >
              x
            </button>
            <a href={`${process.env.REACT_APP_MEDIA_URL}/${item.name}`}>
              DOWNLOAD
            </a>
          </div>
        </div>
      );
    case ".pdf":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <img className="item" src={pdfImg} alt="x" />
            <button
              className="abs-pos mp-pos"
              onClick={handleRemove}
              ref={delBtnref}
            >
              x
            </button>
          </div>
        </div>
      );
    case ".txt":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <img className="item" src={txtImg} alt="x" />
            <button
              className="abs-pos mp-pos"
              onClick={handleRemove}
              ref={delBtnref}
            >
              x
            </button>
          </div>
        </div>
      );
    case ".docx":
      return (
        <div
          className="gallery-item"
          onMouseMove={handleMouseMoove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="item rel-pos">
            <img className="item" src={wordImg} alt="x" />
            <button
              className="abs-pos mp-pos"
              onClick={handleRemove}
              ref={delBtnref}
            >
              x
            </button>
          </div>
        </div>
      );

    default:
      return <div className="gallery-item"></div>;
  }
}
