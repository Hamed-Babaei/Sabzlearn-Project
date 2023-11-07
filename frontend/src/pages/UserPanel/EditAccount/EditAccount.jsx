import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./../../../context/authContext";
import swal from "sweetalert";

import "./EditAccount.css";

export default function EditAccount() {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(authContext.userInfos.name);
    setPhone(authContext.userInfos.phone);
    setUsername(authContext.userInfos.username);
    setUsername(authContext.userInfos.username);
    setEmail(authContext.userInfos.email);
  }, []);

  const editAccount = (event) => {
    event.preventDefault();

    const userNewInfos = {
      username,
      name,
      email,
      password,
      phone,
    };

    fetch(`http://localhost:4000/v1/users/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      body: JSON.stringify(userNewInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "اطلاعات اکانت شما با موفقیت ویرایش شد",
          icon: "success",
          buttons: "خیلی هم عالی",
        });
      }
    });
  };

  return (
    <div className="col-9">
      <div className="edit">
        <form className="edit__form" action="#">
          <div className="edit__personal">
            <div className="row">
              <div className="col-12">
                <label className="edit__label">شماره موبایل *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="لطفا شماره موبایل خود را وارد کنید"
                />
              </div>

              <div className="col-12">
                <label className="edit__label">نام و نام خانوادگی *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
              <div className="col-12">
                <label className="edit__label">نام کاربری (نمایشی) *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
                <span className="edit__help">
                  اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                </span>
              </div>
              <div className="col-12">
                <label className="edit__label">آدرس ایمیل *</label>
                <input
                  className="edit__input"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="لطفا نام نمایشی خود را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div className="edit__password">
            <span className="edit__password-title">تغییر گذرواژه</span>
            <div className="row">
              <div className="col-12">
                <label className="edit__label">تکرار گذرواژه جدید</label>
                <input
                  className="edit__input"
                  type="text"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="تکرار گذرواژه جدید"
                />
              </div>
            </div>
          </div>
          <button className="edit__btn" type="submit" onClick={editAccount}>
            ذخیره تغییرات
          </button>
        </form>
      </div>
    </div>
  );
}
