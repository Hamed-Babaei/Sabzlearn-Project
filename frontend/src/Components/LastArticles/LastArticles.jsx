import React, { useEffect, useState } from "react";
import ArticleBox from "../ArticleBox/ArticleBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./LastArticles.css";

export default function LastArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((articlesData) => {
        console.log(articlesData);
        setArticles(articlesData);
      });
  }, []);

  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref={`articles/1`}
        />

        <div className="articles__content">
          <div className="row">
            {articles
              .filter((article) => article.publish === 1)
              .slice(0, 3)
              .map((article) => (
                <ArticleBox
                  key={article.id}
                  title={article.title}
                  cover={article.cover}
                  desc={article.description}
                  shortName={article.shortName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
