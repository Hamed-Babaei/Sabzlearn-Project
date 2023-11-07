import React, { useState } from "react";
import Topbar from "./../../Components/Topbar/Topbar";
import Navbar from "./../../Components/Navbar/Navbar";
import Breadcrumb from "./../../Components/Breadcrumb/Breadcrumb";
import Footer from "./../../Components/Footer/Footer";
import CourseBox from "./../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  fetch(`http://localhost:4000/v1/auth/me`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((coursesData) => setCourses(coursesData));
  return (
    <>
      <Topbar />
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {/* courses replace to shownCourses */}
                {courses.map((course) => (
                  <CourseBox {...course} key={course.id} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={3}
            pathname={"/courses"}
            setShowCourses={setShownCourses}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}
