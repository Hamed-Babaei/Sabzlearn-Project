import React, { useEffect, useRef, useState } from "react";
import Editor from "../../../Components/Form/Editor";
import { useParams } from "react-router-dom";
import ArticleInfo from "../../ArticleInfo/ArticleInfo";
import swal from "sweetalert";

export default function Draft() {
  const [draftInfos, setDraftInfos] = useState([]);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftShortName, setDraftShortName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [draftCover, setDraftCover] = useState("");
  const [draftCategory, setDraftCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [ShowImg, setShowImg] = useState(true);

  const { shortName } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/articles/${shortName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((draftData) => {
        setDraftInfos(draftData);
        console.log(draftData);
        console.log(draftInfos);
        setDraftTitle(draftData.title);
        setDraftShortName(draftData.shortName);
        setDraftDescription(draftData.description);
        setDraftBody(draftData.body);
        setDraftCover(draftData.cover);
        setDraftCategory(draftData.categoryID._id);
      });
    ////////////////////////////////////////////
    // const url = `http://localhost:4000/courses/covers/${draftInfos.cover}`;
    // const fileName = draftInfos.cover;

    // fetch(url).then(async (response) => {
    //   const contentType = response.headers.get("content-type");
    //   const blob = await response.blob();
    //   const file = new File([blob], fileName, { contentType });
    //   fileCover.current = file;
    //   console.log(fileCover.current);
    // });
  }, []);

  // console.log(draftCover);
  const createArticle = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user")).token;
    console.log(localStorageDate);
    let formData = new FormData();
    formData.append("title", draftTitle);
    formData.append("shortName", draftShortName);
    formData.append("description", draftDescription);
    formData.append("categoryID", draftCategory);
    formData.append("cover", draftCover);
    formData.append("body", draftBody);

    fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        });
      }
    });
  };
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input
                  type="text"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input
                  type="text"
                  value={draftShortName}
                  onChange={(event) => setDraftShortName(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>
                {/* <textarea style={{ width: "100%", height: "200px" }}></textarea> */}

                <input
                  type="text"
                  className="article-textarea"
                  value={draftDescription}
                  onChange={(event) => setDraftDescription(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor
                  language="ar"
                  value={draftBody}
                  setValue={setDraftBody}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>

                <input
                  type="file"
                  defaultValue={draftCover}
                  onChange={(event) => {
                    setDraftCover(event.target.files[0]);
                    console.log(draftCover);
                    setShowImg(false);
                  }}
                />
                <img
                  src={draftCover}
                  alt={draftCover}
                  className={`mt-3 ${ShowImg ? "" : "d-none"}`}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  onChange={(event) => setDraftCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید،</option>
                  {categories.map((category) => (
                    <option
                      selected={
                        category._id === draftCategory._id ? "true" : "false"
                      }
                      key={category._id}
                      value={category._id}
                      // value={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="انتشار"
                    className="m-1"
                    onClick={createArticle}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
