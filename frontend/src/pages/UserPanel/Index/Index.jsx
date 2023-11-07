import React, { useContext } from "react";
import AuthContext from "../../../context/authContext";
import IndexBox from "../../../Components/UserPanel/IndexBox/IndexBox";

export default function Index() {
  const authContext = useContext(AuthContext);

  return (
    <div className="col-9">
      <div className="main">
        <div className="main__title">
          <span className="main__title-text">
            سلام{""}
            <span className="main__title-name">
              {` ${authContext.userInfos.name}`}
            </span>
            ، به پنل کاربری خوش اومدی
          </span>
        </div>
        <p className="main__desc">
          از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
          مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
          کاربری و کلمه عبور خود را ویرایش کنید.
        </p>
        <div className="main__links">
          <div className="row">
            <IndexBox title="سفارش" href="orders" />
            <IndexBox title="دوره های خریداری شده" href="courses" />
            <IndexBox title="کیف پول من" href="money" />
            <IndexBox title="جزئیات حساب کاربری" href="edit-account" />
            <IndexBox title="تیکت های پشتیبانی" href="ticket" />
          </div>
        </div>
      </div>
    </div>
  );
}
