import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Shimmer } from "react-shimmer";

import "./CourseBox.css";

export default function CourseBox(props) {
  console.log(props);
  return (
    <div className="col-4" style={{ width: `${props.isSlider && "100%"}` }}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}`}>
          <Image
            // src={`http://localhost:4000/images/courses/${props.cover}`}
            src={`../../../public/images/courses/${props.cover}`}
            // src={`http://localhost:4000/courses/covers/${cover}`}

            fadeIn
            fallback={<Shimmer width={420} height={210} />}
            alt="Course img"
            className="course-box__img"
          />
        </Link>
        <div className="course-box__main">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__title"
          >
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {props.creator}
              </a>
            </div>
            <div className="course-box__rating">
              {Array(5 - props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img
                    key={item.id}
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
              {Array(props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img
                    key={item.id}
                    src="/images/svgs/star_fill.svg"
                    alt="rating"
                    className="course-box__star"
                  />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{props.registers}</span>
            </div>
            <div className="">
              <span
                className={
                  props.price !== 0 && props.discount
                    ? "course-box__price-line"
                    : "course-box__price"
                }
              >
                {props.price === 0 ? "رایگان" : props.price.toLocaleString()}
              </span>
              <span
                className={props.price === 0 ? "d-none" : "course-box__price"}
              >
                {props.discount !== 0 &&
                  (100 - props.discount) * (props.price / 100)}
              </span>
            </div>
          </div>
        </div>

        <div className="course-box__footer">
          <Link
            to={`/course-info/${props.shortName}`}
            className="course-box__footer-link"
          >
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
        </div>
        {props.price !== 0 && props.discount !== 0 && (
          <span className="courses-box__discount">%{props.discount}</span>
        )}
      </div>
    </div>
  );
}
