import React from "react";
import "./Login.css";
import Menu from "./Menu";

function Login({ name,address,number,date, confirmationResult }) {
  const [inpOtp, setInpOtp] = React.useState("");
  const [menuView, setMenuView] = React.useState(false);

  const verifyOtp = (e) => {
    e.preventDefault();
    if (inpOtp.length === 6) {
      confirmationResult
        .confirm(inpOtp)
        .then((result) => {
          // User signed in successfully.
          // <Redirect to="/Create-Menu" />
          setMenuView(true);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  if (!menuView) {
    return (
      <div className="page">
        <div className="page_info">
          <h3>We have sent an OTP to your mobile phone!</h3>
          <p>Please verify the OTP to login</p>
        </div>
        <div className="row g-3 align-items-center">
          <div className="col-auto">
            <label htmlFor="inputPassword6" className="col-form-label">
              OTP
            </label>
          </div>
          <div className="col-auto">
            <input
              type="number"
              id="inputPassword6"
              className="form-control"
              aria-describedby="passwordHelpInline"
              value={inpOtp}
              onChange={(e) => setInpOtp(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className={`sub btn btn-success ${inpOtp !== "" && "visible"}`}
              onClick={verifyOtp}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Menu name={name} address={address} date={date} number={number} />
      </div>
    );
  }
}

export default Login;
