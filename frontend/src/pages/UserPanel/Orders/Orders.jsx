import React, { useEffect, useState } from "react";

import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        console.log(data);
        console.log(`orders : ${orders}`);
      });
  }, []);

  const showOrderDetails = (orderID) => {
    console.log(orderID);
  };
  console.log(`orders : ${orders}`);

  return (
    <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">شناسه</th>
              <th className="order__table-header-item">تاریخ</th>
              <th className="order__table-header-item">وضعیت</th>
              <th className="order__table-header-item">دوره</th>
              <th className="order__table-header-item">مبلغ</th>
              <th className="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.map((order, index) => (
              <tr className="order__table-body-list" key={index + 1}>
                <td className="order__table-body-item">
                  <a href="#" className="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td className="order__table-body-item">
                  {order.createdAt.slice(0, 10)}
                </td>
                <td className="order__table-body-item">
                  {order.course.isComplete === 0 ? "درحال برگزاری" : "کامل شده"}
                </td>
                <td className="order__table-body-item">{order.course.name}</td>
                <td className="order__table-body-item">
                  {order.price === 0 ? "رایگان" : order.price}
                </td>
                <td
                  className="order__table-body-item"
                  onClick={() => showOrderDetails(order._id)}
                >
                  <a className="order__table-body-btn" href="#">
                    نمایش
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
