import React from "react";

export default function NewsItem(props) {
  const { imgUrl, img, title = "", description = "", posted, source, mode } = props;

  const postedDate = posted
    ? new Date(posted).toLocaleString()
    : "Unknown Date";

  return (
    <div className="container mt-5">
      <div
        className="card"
        style={{
          height: "27rem",
          backgroundColor: mode === "light" ? "#FFFFFF" : "#333", // White for light mode, dark gray for dark mode
          color: mode === "light" ? "#000" : "#fff", // Black text for light mode, white text for dark mode
        }}
      >
        <img
          src={img}
          style={{ height: "12rem" }}
          className="card-img-top"
          alt="News"
        />
        <span className="position-absolute text-white rounded-pill px-3 end-0 bg-danger mt-1">
          {source}
        </span>
        <div className="card-body d-flex flex-column">
          <p className="d-flex justify-content-between" style={{color: mode === "light" ? "grey" : "#fff"}} >
            Published At: {postedDate}
          </p>
          <h5
            className="card-title"
            style={{
              height: "3rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title.length > 50 ? title.substring(0, 50) + "..." : title}
          </h5>
          <p
            className="card-text"
            style={{
              height: "4rem",
              // overflow: "hidden",
              textOverflow: "ellipsis",
              paddingBottom: "2px",
            }}
          >
            {description && description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </p>
          <a href={imgUrl}   target="_blank" rel="noopener noreferrer" className="btn  mt-auto readBtn" style={{background:"#1d2d44" ,color:"#fff"}}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
