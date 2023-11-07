import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";

import "./Session.css";

export default function Session() {
  const { courseName, sessionID } = useParams();
  const [session, setSession] = useState({});
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setSessions(data.sessions);
        console.log(session);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />

      <section className="content">
        <div className="col-4">
          <div className="sidebar">
            <div className="sidebar__header">
              <a className="sidebar__header-link" href="#">
                <i className="sidebar__haeder-icon fa fa-book-open"></i>
                لیست جلسات
              </a>
            </div>
            <div className="sidebar-topics">
              <div className="sidebar-topics__item">
                <ul className="sidebar-topics__list">
                  {sessions.map((session) => (
                    <Link
                      to={`/${courseName}/${session._id}`}
                      key={session._id}
                    >
                      <li className="sidebar-topics__list-item">
                        <div className="sidebar-topics__list-right">
                          <i className="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                          <a
                            className="sidebar-topics__list-item-link"
                            href="#"
                          >
                            {session.title}
                          </a>
                        </div>
                        <div className="sidebar-topics__list-left">
                          <span className="sidebar-topics__list-item-time">
                            {session.time}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="episode">
            <div className="episode-haeder">
              <div className="episode-header__right">
                <a className="episode-header__right-back-link" href="#">
                  <i className="episode-header__right-back-icon fa fa-angle-right"></i>
                  <div className="episode-header__right-home">
                    <Link
                      className="episode-header__right-home-link"
                      to={`/course-info/${courseName}`}
                    >
                      به دوره خانه بروید
                    </Link>
                    <i className="episode-header__right-home-icon fa fa-home"></i>
                  </div>
                </a>
              </div>
              <div className="episode-header__left">
                <i className="episode-header__left-icon fa fa-play-circle"></i>
                <span className="episode-header__left-text">
                  سوالات متداول در مورد جاوااسکریپت و دوره
                </span>
              </div>
            </div>
            <div className="episode-content">
              <video
                className="episode-content__video"
                controls
                src={`http://localhost:4000/courses/covers/${session.video}`}
              ></video>
              <a className="episode-content__video-link" href="#">
                دانلود ویدئو
              </a>
              <div className="episode-content__bottom">
                <a className="episode-content__backward" href="#">
                  <i className="episode-content__backward-icon fa fa-arrow-right"></i>
                  قبلی
                </a>
                <a className="episode-content__forward" href="#">
                  بعدی
                  <i className="episode-content__backward-icon fa fa-arrow-left"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
