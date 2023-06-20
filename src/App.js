import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import Header from "./components/Layout/Header/Header.jsx";
import Courses from "./components/Courses/Courses.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import Login from "./components/Auth/Login.js";
import Register from "./components/Auth/Register.js";
import ForgetPassword from "./components/Auth/ForgetPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Request from "./components/Request/Request.jsx";
import About from "./components/About/About.jsx";
import Subscribe from "./components/Payments/Subscribe.jsx";
import NotFound from "./components/Layout/NotFound/NotFound.jsx";
import PaymentSuccess from "./components/Payments/PaymentSuccess.jsx";
import PaymentFail from "./components/Payments/PaymentFail.jsx";
import CoursePage from "./components/CoursePage/CoursePage.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ChangePassword from "./components/Profile/ChangePassword.jsx";
import UpdateProfile from "./components/Profile/UpdateProfile.jsx";
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse.jsx";
import Users from "./components/Admin/Users/Users.jsx";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
    clearError,
    clearMessage,
    getUserProfile,
} from "./redux/features/userSlice.js";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/Layout/Loader/Loader.jsx";

const App = () => {
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    const dispatch = useDispatch();

    const { loading, isAuthenticated, user, message, error } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
            });
            dispatch(clearError());
        }

        if (message) {
            toast(message, {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
            dispatch(clearMessage());
        }
    }, [error, message, dispatch]);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Header isAuthenticated={isAuthenticated} user={user} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route
                            path="/course/:id"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                >
                                    <CoursePage user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/request" element={<Request />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={!isAuthenticated}
                                    redirect={"/profile"}
                                >
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/changepassword"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                >
                                    <ChangePassword />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/updateprofile"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                >
                                    <UpdateProfile user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                >
                                    <Profile user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/subscribe"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                >
                                    <Subscribe user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/paymentsuccess"
                            element={<PaymentSuccess />}
                        />
                        <Route path="/paymentfail" element={<PaymentFail />} />
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={!isAuthenticated}
                                    redirect={"/profile"}
                                >
                                    <Register />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/forgetpassword"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={!isAuthenticated}
                                    redirect={"/profile"}
                                >
                                    <ForgetPassword />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/resetpassword/:token"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={!isAuthenticated}
                                    redirect={"/profile"}
                                >
                                    <ResetPassword />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Routes */}

                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                    adminRoute={true}
                                    isAdmin={user?.role === "admin"}
                                >
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/createcourse"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                    adminRoute={true}
                                    isAdmin={user?.role === "admin"}
                                >
                                    <CreateCourse />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/courses"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                    adminRoute={true}
                                    isAdmin={user?.role === "admin"}
                                >
                                    <AdminCourses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/users"
                            element={
                                <ProtectedRoute
                                    isAuthenticated={isAuthenticated}
                                    adminRoute={true}
                                    isAdmin={user?.role === "admin"}
                                >
                                    <Users />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                    <ToastContainer />
                </>
            )}
        </>
    );
};

export default App;
