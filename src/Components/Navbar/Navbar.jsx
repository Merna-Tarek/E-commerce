import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../images/freshcart-logo.svg";
import { authcontext } from "../../context/authrntication";
import { cartContext } from './../../context/cartContext';


export default function Navbar() {
    const { token, setToken } = useContext(authcontext);
    const { numOfCartItems } = useContext(cartContext);


    const navfunc = useNavigate();

    function logout() {
    localStorage.removeItem("tkn");

    setToken(null);

    navfunc("/login");
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg  ">
        <div className="container">
            <Link className="navbar-brand" to="">
            <img src={logoImg} alt="Fresh-cart" />
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse  " id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token ? (
                <>
                <li className="nav-item">
                <Link
                className="nav-link active"
                aria-current="page"
                to="/Products"
                >
                Products
                </Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Categories">
                      Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Brands">
                      Brands
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/Cart">
                      Cart
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfCartItems}
                      <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link " to='/wishList' ><i className='fa fa-heart active'></i></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allorders">
                      AllOrders
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <i className="fa-brands me-2 fa-facebook"></i>
                <i className="fa-brands me-2 fa-twitter"></i>
                <i className="fa-brands me-2 fa-whatsapp"></i>
                <i className="fa-brands me-2 fa-linkedin"></i>
              </li>

              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Profile"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <span
                      onClick={logout}
                      style={{ cursor: "pointer" }}
                      className="nav-link"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/Login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
