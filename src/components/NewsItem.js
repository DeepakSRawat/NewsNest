import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, discription, imgUrl, newsUrl, author, date, source } =
      this.props;
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
              {source}
            </span>
          </div>
          <img
            src={
              !imgUrl
                ? "https://www.hindustantimes.com/ht-img/img/2023/12/16/1600x900/pexels-pixabay-267391_1702725683986_1702725691558.jpg"
                : imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown author"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
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
}
