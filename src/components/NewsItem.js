import React from "react";

export default function NewsItem(props) {
  // let { title, discription, imgUrl, newsUrl, author, date, source } =
  //   props;
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            position: "absolute",
            right: "0",
            marginRight: "3px",
          }}
        >
          <span
            className="badge rounded-pill bg-danger"
            style={{ boxShadow: "0 0 5px 0 rgba(0,0,0)" }}
          >
            {props.source}
          </span>
        </div>
        <img
          src={
            !props.imgUrl
              ? "https://www.hindustantimes.com/ht-img/img/2023/12/16/1600x900/pexels-pixabay-267391_1702725683986_1702725691558.jpg"
              : props.imgUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.discription}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {props.author ? props.author : "Unknown author"} on{" "}
              {new Date(props.date).toGMTString()}
            </small>
          </p>
          <a
            href={props.newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
