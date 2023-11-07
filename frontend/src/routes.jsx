import Index from "./pages/Index/Index";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Category from "./pages/Category/Category";
import ArticleInfo from "./pages/ArticleInfo/ArticleInfo";
import Articles from "./pages/Articles/Articles";
import Courses from "./pages/Courses/Courses";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";
import Session from "./pages/Session/Session";

import PAdminPrivate from "./Components/Privates/PAdminPrivate";
import UserPPrivate from "./Components/Privates/UserPPrivate";

// Admin Panel Components
import AdminPanel from "./pages/AdminPanel/index";
import Users from "./pages/AdminPanel/Users/Users";
import AdminCourses from "./pages/AdminPanel/Courses/Courses";
import Menus from "./pages/AdminPanel/Menus/Menus";
import AdminArticles from "./pages/AdminPanel/Articles/Articles";
import AdminDraft from "./pages/AdminPanel/Articles/Draft";
import AdminCategory from "./pages/AdminPanel/Category/Category";
import AdminContacts from "./pages/AdminPanel/Contact/Contact";
import AdminSessions from "./pages/adminPanel/Sessions/Sessions";
import AdminComments from "./pages/adminPanel/Comments/Comments";
import AdminOffs from "./pages/adminPanel/Offs/Offs";
import PAdminIndex from "./pages/adminPanel/Index/Index";
import AdminTickets from "./pages/adminPanel/Tickets/Tickets";
import AdminDiscounts from "./pages/adminPanel/Discounts/Discounts";
// User Panel Components
import UserPanel from "./pages/UserPanel/Index";
import UserPanelIndex from "./pages/UserPanel/Index/Index";
import UserPanelOrders from "./pages/UserPanel/Orders/Orders";
import UserPanelCourses from "./pages/UserPanel/Courses/Courses";
import SendTicket from "./pages/UserPanel/Tickets/SendTicket";
import UserPanelTickets from "./pages/UserPanel/Tickets/Tickets";
import UserPanelTicketAnswer from "./pages/UserPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "./pages/UserPanel/EditAccount/EditAccount";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <ArticleInfo /> },
  { path: "/articles/:page", element: <Articles /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionID", element: <Session /> },

  // Admin Panel Routes

  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "articles/draft/:shortName", element: <AdminDraft /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContacts /> },
      { path: "sessions", element: <AdminSessions /> },
      { path: "comments", element: <AdminComments /> },
      { path: "offs", element: <AdminOffs /> },
      { path: "discounts", element: <AdminDiscounts /> },
      { path: "tickets", element: <AdminTickets /> },
    ],
  },

  // User Panel Routes

  {
    path: "/my-account/*",
    element: (
      <UserPPrivate>
        <UserPanel />
      </UserPPrivate>
    ),
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <UserPanelOrders /> },
      { path: "courses", element: <UserPanelCourses /> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },
    ],
  },
];

export default routes;
