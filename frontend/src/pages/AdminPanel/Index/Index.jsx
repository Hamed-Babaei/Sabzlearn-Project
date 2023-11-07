import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import PAdminItem from "../../../Components/AdminPanel/PAdminItem/PAdminItem";

import "./Index.css";

export default function Index() {
  const [infos, setInfos] = useState([]);
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/p-admin", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo);
        setInfos(pageInfo.infos);
        setLastRegisteredUsers(pageInfo.lastUsers);
        setAdminName(pageInfo.adminName);
      });
  }, []);

  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-content-title">
            <span className="welcome">
              خوش آمدید,<span className="name">{adminName}</span>
            </span>
          </div>
          <div className="home-content-boxes">
            <div className="row">
              {infos.map((item) => (
                <PAdminItem {...item} key={item.key} />
              ))}
            </div>
          </div>

          <div className="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">
              <table className="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>ایمیل</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRegisteredUsers.map((user, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      {/* <td>09123443243</td> */}
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}
