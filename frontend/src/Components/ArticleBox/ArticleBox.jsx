import React from "react";
import { Image, Shimmer } from "react-shimmer";

import "./ArticleBox.css";
import { Link } from "react-router-dom";

export default function ArticleBox({ title, desc, cover, shortName }) {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link
            to={`/article-info/${shortName}`}
            className="article-card__link-img"
          >
            <Image
              // src={cover}
              src={`http://localhost:4000/courses/covers/${cover}`}
              // src={`../../../public/images/blog/${cover}`}
              fadeIn
              fallback={<Shimmer width={400} height={400} />}
              className="article-card__img"
              alt="Article Cover"
            />
          </Link>
        </div>
        <div className="article-card__content">
          <Link
            to={`/article-info/${shortName}`}
            className="article-card__link"
          >
            {title}
          </Link>
          <p className="article-card__text">{desc}</p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
