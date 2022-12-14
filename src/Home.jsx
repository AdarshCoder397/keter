import * as React from "react";
import "./Home.css";
import Login from "./Login";
import Slider from "./Slider";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
  const slides = [
    {
      url: "https://t4.ftcdn.net/jpg/02/75/39/31/360_F_275393147_SA3KtHDTUMoEn6hBbhNiTPeO92gHYgyr.jpg",
    },
    {
      url: "https://5.imimg.com/data5/JX/DJ/LW/SELLER-99007434/catering-services-500x500.jpg",
    },
    {
      url: "https://www.wedresearch.net/wp-content/uploads/2018/07/bigrajah-food.jpg",
    },
    {
      url: "https://content.jdmagicbox.com/comp/nellore/y5/9999px861.x861.160915082955.n3y5/catalogue/friends-catering-bhakthavatsala-nagar-nellore-caterers-wojw8krejz.jpg",
    },
    {
      url: "https://thumbs.dreamstime.com/b/cuisine-culinary-buffet-dinner-catering-dining-food-celebration-party-concept-group-people-all-you-can-eat-82762441.jpg",
    },
  ];
  const countrycode = "+91";
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [date, setDate] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [otpView, setOtpView] = React.useState(false);
  const containerStyles = {
    width: "75%",
    height: "400px",
    margin: "0",
  };
  const loginsubmit = (e) => {
    e.preventDefault();
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    // setOtpView(true);
    signInWithPhoneNumber(auth, String(countrycode + number), appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpView(true)
      })
      .catch((error) => {
        alert("Enter a Valid number or check your internet connection!");
        setOtpView(false);
        console.log(error)
      });
  };
  if (!otpView) {
    return (
      <div className="page">
        <div style={containerStyles} className={'slide'}>
          <Slider slides={slides} />
        </div>
        <div className="forum">
          <h2 className="txt">Book a Menu</h2>
          <form
            className="row g-3 needs-validation"
            noValidate
            onSubmit={loginsubmit}
          >
            <div className="col-md-4">
              <label htmlFor="validationCustom01" className="form-label txt">
                Name
              </label>
              <input
                type="text"
                className="form-control box"
                id="validationCustom01"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustomUsername" className="form-label txt">
                Phone number
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text box txt" id="inputGroupPrepend">
                  +91
                </span>
                <input
                  type="number"
                  className="form-control box"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="validationCustom02" className="form-label txt">
                Date of event
              </label>
              <input
                type="date"
                className="form-control box"
                id="validationCustom02"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label txt">
                Address of event
              </label>
              <input
                type="text"
                className="form-control box"
                id="validationCustom03"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                className={`btn btn-primary next ${
                  Number(number.length) === 10 &&
                  name !== "" &&
                  address !== "" &&
                  date !== "" &&
                  "visible"
                }`}
                type="submit"
              >
                <span className="txt">Next</span>
              </button>
            </div>
          </form>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <Login
          confirmationResult={window.confirmationResult}
          name={name}
          address={address}
          date={date}
          number={number}
        />
      </div>
    );
  }
}
