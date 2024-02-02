import React from 'react';

export default function NewsItems({ title, description, src, url }) {
  return (
    <div className="card bg-dark text-light m-2" style={{ minWidth: "14rem", maxWidth: "18rem" }}>
      <img src={src ? src : '/News.png'} className="card-img-top p-2 " alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 50)}</h5>
        <p className="card-text">{description ? description.slice(0, 80) : 'No description available'}</p>
        <a href={url} className="btn btn-primary">Read More</a>
      </div>
    </div>
  );
}
