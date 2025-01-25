import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import logoOdisha from "../assets/logoOdisha.jpg"
import { StoreContext } from "../Context";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const {setToken} = useContext(StoreContext)
    const token = localStorage.getItem("token")
    const navigate = useNavigate() 
    const handleLogout = ()=>{
        setToken("")
        localStorage.removeItem("token")
        navigate("/",{replace:true})
        
    }
    return (
        <nav className="bg-slate-100 w-full fixed top-0 z-50">
            <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-22">
                    <div className="flex justify-center space-x-2 items-center">
                    <img src={logoOdisha} className="h-14 rounded-full " alt="" />
                        <h1 className="text-slate-700 text-2xl font-bold">ଜନ ସହାୟକ | Jana Sahayak</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-x-4">
                        {token ? <Link
                            to="/userPage"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            Home
                        </Link>:<Link
                            to="/"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            Home
                        </Link>}
                        {token && <Link
                            to="/submitComplaint"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            Submit Complaint
                        </Link>}
                        {
                            token?<Link
                            to="/complaints"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            My Complaints
                        </Link>:<Link
                            to="/conplaints"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            About Us
                        </Link>
                        }
                        {!token?<Link
                            to="/contact"
                            className="text-slate-700 text-sm font-medium hover:text-black"
                        >
                            Contact
                        </Link>:""}
                        {
                            token ? <Link 
                                onClick={handleLogout}
                                className="bg-red-600 rounded-2xl px-4 py-2 text-white text-sm font-medium hover:text-slate-800"
                            >Log out</Link> : <>
                                <Link
                                    to="/signup"
                                    className="bg-slate-200 rounded-2xl px-4 py-2 text-slate-700 text-sm font-medium hover:text-black"
                                >
                                    Sign up
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-slate-700 text-sm font-medium hover:text-green-600 px-4 py-2 bg-green-200 rounded-2xl"
                                >
                                    Log in
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
