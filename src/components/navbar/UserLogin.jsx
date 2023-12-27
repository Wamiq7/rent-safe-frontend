import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineLogout } from "react-icons/md";

function UserLogin() {
  const [isOpen, setIsOpen] = useState(false);
  let tenant = localStorage.getItem("Istenant");
  let landlord = localStorage.getItem("Islandlord");
  let stateagent = localStorage.getItem("Isstateagent");
  const logOut = () => {

    tenant ? localStorage.removeItem("Istenant") : null;
    // eslint-disable-next-line no-unused-expressions
    landlord ? localStorage.removeItem("Islandlord") : null;
    // eslint-disable-next-line no-unused-expressions
    stateagent ? localStorage.removeItem("Isstateagent") : null;

    // token = null;
    tenant = null;
    landlord = null;
    stateagent = null;
  };
  // console.log('token is -----', token);
  return (
    <div className="flex items-center justify-end px-4">
      <div className="inline-block items-center relative text-left">
        <button
          type="button"
          className="flex text-3xl font-medium text-gray-700 hover:text-accent"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RxAvatar />
        </button>
        {/* ----------for Logged Out Users------------------- */}

        {isOpen && !stateagent && !landlord && !tenant && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setIsOpen(!isOpen);
              }
            }}
          >
            <ul className="mobile-menu">
              <li className="py-1">
                <Link to="/login" className="mobile-item">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="mobile-item">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* ----------for Logged In Users------------------- */}
        {isOpen && (stateagent || landlord || tenant)&& (
          <div
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsOpen(!isOpen);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <ul className="mobile-menu">
              <li className="py-1">
                {/*   ----------------------- TODO: Here Add a method to redirect to Dev or Org based on loggedIn user-------------  */}
                <Link
                  to="/profile"
                  className="flex items-center justify-start gap-3 mobile-item"
                >
                  <RxAvatar className="text-xl" />
                  My Account
                </Link>
              </li>
              <li className="py-1">
                <Link
                  to="/"
                  className="mobile-item flex items-center justify-start gap-3 mobile-item"
                  onClick={() => logOut()}
                >
                  <MdOutlineLogout className="text-xl" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
