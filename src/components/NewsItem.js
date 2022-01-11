import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, Url, author, date, source } = this.props;
    return (
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style = {{left : '90%', zIndex : 1}}>
              {source}
            </span>
          <h5 className="card-title">
            {title}
           
          </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
            </small>{" "}
          </p>
          <a href={Url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
