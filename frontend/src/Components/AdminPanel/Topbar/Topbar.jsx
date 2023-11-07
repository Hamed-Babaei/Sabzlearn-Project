import React, { useEffect, useState } from "react";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState({});
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowNotificationsBox, setIsShowNotificationsBox] = useState(false);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminInfo(data);
        setAdminNotifications(data.notifications);
      });
  }, [seeNotification]);

  function seeNotification(notficationID) {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/notifications/see/${notficationID}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowNotificationsBox && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setIsShowNotificationsBox(true)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseEnter={() => setIsShowNotificationsBox(true)}
              onMouseLeave={() => setIsShowNotificationsBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.length === 0 ? (
                  <li className="home-notification-modal-item">
                    نوتیفکیشنی برای نمایش وجود ندارد
                  </li>
                ) : (
                  <>
                    {adminNotifications.map((notification) => (
                      <li
                        className="home-notification-modal-item"
                        key={notification.id}
                      >
                        <span className="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label className="switch">
                          <a
                            href="javascript:void(0)"
                            onClick={() => seeNotification(notification._id)}
                          >
                            دیدم
                          </a>
                        </label>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="#">
                  <img src="/images/hamed.jpeg" alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
