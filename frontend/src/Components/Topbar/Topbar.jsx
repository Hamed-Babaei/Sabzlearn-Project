import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import "./Topbar.css";

export default memo(function Topbar() {
  const [indexInfo, setIndexInfo] = useState({});
  const [allTopbarLinks, setAllTopbarLinks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/menus/topbar`)
      .then((res) => res.json())
      .then((data) => setAllTopbarLinks(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then((res) => res.json())
      .then((allInfos) => setIndexInfo(allInfos));
  }, []);

  const getRandomItemsFromArray = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__right">
            <ul className="top-bar__menu">
              {getRandomItemsFromArray(allTopbarLinks, 5).map((link) => (
                <li key={link.id} className="top-bar__item">
                  <Link to={link.href} className="top-bar__link">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="top-bar__left">
            <div className="top-bar__email">
              <a href="#" className="top-bar__email-text top-bar__link">
                {/* hamed84za@gmail.com */}
                {indexInfo.email}
              </a>
              <i className="fas fa-envelope top-bar__email-icon"></i>
            </div>
            <div className="top-bar__phone">
              <a href="#" className="top-bar__phone-text top-bar__link">
                {/* 09391709305 */}
                {indexInfo.phone}
              </a>
              <i className="fas fa-phone top-bar__phone-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
