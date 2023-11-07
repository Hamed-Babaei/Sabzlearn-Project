import React, { useContext } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/authContext";
import swal from "sweetalert";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutAdmin = () => {
    swal({
      title: "با موفقیت خارج شدید",
      icon: "success",
      buttons: "اوکی",
    }).then(() => {
      authContext.logout();
      navigate("/");
    });
  };
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="#">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-menu-btn">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin">
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="sessions">
              <span>جلسات</span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>کامنت ها</span>
            </Link>
          </li>
          <li>
            <Link to="tickets">
              <span>تیکت ها</span>
            </Link>
          </li>
          <li>
            <Link to="offs">
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="discounts">
              <span>کمپین ها</span>
            </Link>
          </li>
          <li>
            <Link to="category">
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="contacts">
              <span>پیغام ها</span>
            </Link>
          </li>
          <li>
            <Link to="#" onClick={logoutAdmin}>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
