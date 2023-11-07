import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  function getAllContacts() {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        console.log(allContacts);
        setContacts(allContacts);
      });
  }

  const showContactBody = (contactBody) => {
    swal({
      title: contactBody,
      buttons: "اوکی",
    });
  };

  const sendAnswerToUser = (contactEmail) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "متن پاسخ خود را وارد کنید",
      content: "input",
      buttons: "ارسال",
    }).then((value) => {
      console.log(value);

      const answerInfo = {
        email: contactEmail,
        answer: value,
      };

      fetch("http://localhost:4000/v1/contact/answer", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerInfo),
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            getAllContacts();
            return res.json();
          }
        })
        .then((result) => console.log(result));
    });
  };

  const removeContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "ایا از حذف پیغام اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "بله"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیغام با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllContacts();
            });
          }
        });
      }
    });
  };

  return (
    <>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index + 1}>
                <td
                  className={
                    contact.answer === 1
                      ? "answer-contact"
                      : "no-answer-contact"
                  }
                >
                  {index + 1}
                </td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showContactBody(contact.body)}
                  >
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => sendAnswerToUser(contact.email)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
                  >
                    حذف
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
