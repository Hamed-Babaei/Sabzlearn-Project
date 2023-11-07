import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import "../index.css";

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments();
  }, []);

  function getAllComments() {
    fetch("http://localhost:4000/v1/comments")
      .then((res) => res.json())
      .then((allComments) => {
        setComments(allComments);
        console.log(allComments);
      });
  }

  const removeComment = (commentID) => {
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/${commentID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  const showCommentBody = (commentBody) => {
    swal({
      title: commentBody,
      buttons: "اوکی",
    });
  };

  const banUser = (userID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "آیا از بن مطمعنی؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => getAllComments());
          }
        });
      }
    });
  };

  const acceptComment = (commentID) => {
    swal({
      title: "آیا از تایید کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت تایید شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  const rejectComment = (commentID) => {
    swal({
      title: "آیا از رد کامنت اطمینان دارید",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              title: "کامنت مورد نظر با موفقیت رد شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  const answerToComment = (commentID) => {
    swal({
      title: "پاسخ مورد نظر را وارد کنید",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then((answerText) => {
      if (answerText) {
        const commentAnswer = {
          body: answerText,
        };

        fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
          body: JSON.stringify(commentAnswer),
        }).then((res) => {
          console.log(res);
          if (res.ok) {
            swal({
              title: "پاسخ مورد نظر با موفقیت ثبت شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllComments();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="کامنت‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>دوره</th>
              <th>امتیاز</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>تایید</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index + 1}>
                <td
                  className={
                    comment.answer === 1
                      ? "answer-comment "
                      : "no-answer-comment "
                  }
                >
                  {index + 1}
                </td>
                <td>{comment.creator.name}</td>
                <td>{comment.course}</td>
                <td>
                  {Array(5 - comment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star.svg" alt="score" />
                    ))}
                  {Array(comment.score)
                    .fill(0)
                    .map((item) => (
                      <img src="/images/svgs/star_fill.svg" alt="score" />
                    ))}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerToComment(comment._id)}
                  >
                    پاسخ
                  </button>
                </td>
                {comment.answer === 1 ? (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => rejectComment(comment._id)}
                    >
                      رد
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => acceptComment(comment._id)}
                    >
                      تایید
                    </button>
                  </td>
                )}
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => banUser(comment.creator._id)}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
