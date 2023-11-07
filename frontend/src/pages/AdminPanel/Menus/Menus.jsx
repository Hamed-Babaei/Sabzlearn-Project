import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { minValidator } from "../../../validators/rules";

export default function Menus() {
  const [menus, setMenus] = useState([]);
  const [menuParent, setMenuParent] = useState("-1");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllMenus();
  }, []);

  function getAllMenus() {
    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => setMenus(allMenus));
  }

  const removeMenu = (menuID) => {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منوی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllMenus();
            });
          }
        });
      }
    });
  };

  const createMenu = (event) => {
    event.preventDefault();

    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === "-1" ? undefined : menuParent,
    };

    fetch(`http://localhost:4000/v1/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuInfo),
    }).then((res) => {
      console.log(res);
      if (res.ok) {
        swal({
          title: "منوی جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then((result) => {
          getAllMenus();
        });
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minValidator(5)]}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                id="href"
                type="text"
                isValid="false"
                validations={[minValidator(5)]}
                placeholder="لطفا عنوان را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <select
                className="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!menu.parent && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>
                  {menu.parent ? (
                    menu.parent.title
                  ) : (
                    <i className="fa fa-check"></i>
                  )}
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeMenu(menu._id)}
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
