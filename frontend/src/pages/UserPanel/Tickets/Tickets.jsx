import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ticket from "../../../Components/UserPanel/Ticket/Ticket";

import "./Tickets.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/user`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      });
  }, []);

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">همه تیکت ها</span>
          <Link className="ticket-header__link" to="/my-account/send-ticket">
            ارسال تیکت جدید
          </Link>
        </div>
        <div className="ticket-boxes">
          <div className="ticket-boxes__item">
            <img
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">باز</span>
            <span className="ticket-boxes__value">0</span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__closed ticket-boxes__custom">
            <img
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">بسته</span>
            <span className="ticket-boxes__value ticket-boxes__value-closed">
              2
            </span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__answered ticket-boxes__custom">
            <img
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">پاسخ داده شده</span>
            <span className="ticket-boxes__value ticket-boxes__value-answered">
              1
            </span>
          </div>
          <div className="ticket-boxes__item ticket-boxes__finished ticket-boxes__custom">
            <img
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">پایان یافته</span>
            <span className="ticket-boxes__value ticket-boxes__value-finished">
              1
            </span>
          </div>
          <div className="ticket-boxes__item">
            <img
              className="ticket-boxes__img img-fluid"
              src="/images/ticket.svg"
            />
            <span className="ticket-boxes__condition">همه</span>
            <span className="ticket-boxes__value">2</span>
          </div>
        </div>
        <div className="ticket-filter">
          <form action="#" className="ticket-filter__form">
            <select className="ticket-filter__select">
              <option className="ticket-filter__option" value="">
                همه
              </option>
              <option className="ticket-filter__option" value="">
                فرستاده شده
              </option>
              <option className="ticket-filter__option" value="">
                دریافتی
              </option>
            </select>
            <select className="ticket-filter__select">
              <option className="ticket-filter__option" value="">
                همه
              </option>
              <option className="ticket-filter__option" value="">
                باز
              </option>
              <option className="ticket-filter__option" value="">
                بسته
              </option>
              <option className="ticket-filter__option" value="">
                پاسخ داده شده
              </option>
              <option className="ticket-filter__option" value="">
                پایان یافته
              </option>
            </select>
            <select className="ticket-filter__select">
              <option className="ticket-filter__option" value="">
                تاریخ پاسخ
              </option>
              <option className="ticket-filter__option" value="">
                تاریخ ایجاد
              </option>
            </select>
            <button className="ticket-filter__btn" type="submit">
              اعمال
            </button>
          </form>
        </div>
        <div className="ticket-content">
          <span className="ticket-content__title">نمایش 1 تیکت</span>

          {tickets.map((ticket) => (
            <Ticket {...ticket} key={ticket.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
