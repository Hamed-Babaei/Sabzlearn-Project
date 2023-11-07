import React from "react";
import { Link } from "react-router-dom";

export default function Ticket(props) {
  return (
    <div className="ticket-content__box">
      <div className="ticket-content__right">
        <div className="ticket-content__right-right">
          <Link className="ticket-content__link" to={`answer/${props._id}`}>
            {props.title}
          </Link>
          <span className="ticket-content__category">
            <i className="fa fa-ellipsis-v ticket-content__icon"></i>
            {props.departmentSubID}
          </span>
        </div>
        <div className="ticket-content__right-left">
          <span className="ticket-content__name me-5">{props.user}</span>
        </div>
      </div>
      <div className="ticket-content__left">
        <div className="ticket-content__left-right">
          <div className={props.answer ? "btn btn-success" : "btn btn-danger"}>
            <span className="ticket-content__condition-text">
              {props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"}
            </span>
          </div>
        </div>
        <div className="ticket-content__left-left">
          <span className="ticket-content__time">
            {props.createdAt.slice(0, 10)}
          </span>
        </div>
      </div>
    </div>
  );
}
