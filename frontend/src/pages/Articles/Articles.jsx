import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

import "./Articles.css";
import { useParams } from "react-router-dom";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Pagination from "../../Components/Pagination/Pagination";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((articlesData) => {
        console.log(articlesData);
        setArticles(articlesData);
      });
  }, []);
  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {/* courses replace to shownCourses */}
                {shownArticles
                  .filter((article) => article.publish === 1)
                  .map((article) => (
                    <ArticleBox {...article} key={article.id} />
                  ))}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={3}
            pathname={"/articles"}
            setShownCourses={setShownCourses}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
