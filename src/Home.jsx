import * as React from "react";
import "./Home.css";
import Login from './Login'
import { auth } from "./firebase";
import { RecaptchaVerifier , signInWithPhoneNumber } from "firebase/auth";

const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    },
    auth
  );
};
export default function Home() {
  const countrycode = "+91"
  const [name,setName] = React.useState("");
  const [address,setAddress] = React.useState("");
  const [date,setDate] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [otpView,setOtpView] = React.useState(false);
  const loginsubmit = (e) => {
    e.preventDefault()
    generateRecaptcha()
    let appVerifier =  window.recaptchaVerifier;
    signInWithPhoneNumber(auth,String(countrycode+number),appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setOtpView(true)
    }).catch((error) => {
      alert("Enter a Valid number or check your internet connection!")
      setOtpView(false)
    });
  };
  if (!otpView){    
    return (
      <div className="home">
        <h2>Book a Menu</h2>
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={loginsubmit}
        >
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Phone number
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                +91
              </span>
              <input
                type="number"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
                required
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom02" className="form-label">
              Date of event
            </label>
            <input
              type="date"
              className="form-control"
              id="validationCustom02"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom03" className="form-label">
              Address of event
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="validationCustom04" className="form-label">
              State
            </label>
            <option disabled value>
              Bihar
            </option>
            <div className="invalid-feedback">Please select a valid state.</div>
          </div>
          <div className="col-12">
            <button
              className={`btn btn-primary next ${Number(number.length) === 10 && name != "" && address != "" && date != "" && "visible"}`}
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
        <div id="recaptcha-container"></div>
      </div>
    );
  }else{
    return (
      <div className="">
        <Login confirmationResult={window.confirmationResult} name={name} address={address} date={date} number={number} />
        <div id="recaptcha-container"></div>
      </div>
    )
  }
}
