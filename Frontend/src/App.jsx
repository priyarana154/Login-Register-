import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function App() {
  const [isSignUP, setIsSignUP] = useState(false);

  const [inputform, setinputform] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  function handlechange(e) {
    const { name, value } = e.target;
    setinputform({ ...inputform, [name]: value });
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        seterror("");
        setsuccess("Google Login Successful!");
        localStorage.setItem("token", data.token);
      } else {
        seterror(data.message);
      }
    } catch (err) {
      seterror("Server Error");
    }
  };

  async function handlesubmit(e) {
    e.preventDefault();
    console.log(inputform);
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#f5f3ff 0%,#eef2ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-150px",
            bottom: "-150px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#d8c7ff,#b99dff)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: "-120px",
            bottom: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ffd9a8,#ffbe6b)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#e7f7f7,#d6f1f1)",
          }}
        />

        <div
          style={{
            width: "380px", 
            padding: "35px 30px", 
            borderRadius: "28px",
            backgroundColor: "white",
            boxShadow: "0px 15px 40px rgba(109,93,252,0.12)",
            textAlign: "center",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "110px", 
              marginBottom: "5px",
            }}
          >
            <img
              src="/F.png"
              alt="logo"
              style={{
                width: "110px", 
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          <h1
            style={{
              color: "#6D5DFC",
              fontSize: "40px",
              fontWeight: "700",
              fontFamily: "Georgia",
              marginBottom: "20px",
              marginTop: "0px",
            }}
          >
            {isSignUP ? "Signup" : "Login"}
          </h1>

          <form onSubmit={handlesubmit}>
            {isSignUP && (
              <>
                <input
                  type="text"
                  name="name"
                  value={inputform.name}
                  placeholder="Enter Your Name"
                  onChange={handlechange}
                  style={inputStyle}
                />
                <br />
                <br />
              </>
            )}

            <input
              type="email"
              name="email"
              value={inputform.email}
              placeholder="Enter Your Email"
              onChange={handlechange}
              style={inputStyle}
            />
            <br />
            <br />

            <input
              type="password"
              name="password"
              value={inputform.password}
              placeholder="Enter Your Password"
              onChange={handlechange}
              style={inputStyle}
            />
            <br />
            <br />

            {isSignUP && (
              <>
                <input
                  type="password"
                  name="confirmpassword"
                  value={inputform.confirmpassword}
                  placeholder="Confirm Password"
                  onChange={handlechange}
                  style={inputStyle}
                />
                <br />
                <br />
              </>
            )}

            <button type="submit" style={buttonStyle}>
              {isSignUP ? "Signup" : "Login"}
            </button>
          </form>

          {/* OR Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <hr
              style={{
                flex: 1,
                border: "0.5px solid #ddd",
              }}
            />

            <span
              style={{
                padding: "0 15px",
                color: "#777",
                fontSize: "16px",
              }}
            >
              OR
            </span>

            <hr
              style={{
                flex: 1,
                border: "0.5px solid #ddd",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => seterror("Google Login Failed")}
            />
          </div>

          <p
            style={{
              color: "red",
              marginTop: "10px",
              marginBottom: "0px",
            }}
          >
            {error}
          </p>

          <p style={{ color: "green", marginTop: "10px", marginBottom: "0px" }}>
            {success}
          </p>

          <p
            style={{
              marginTop: "15px",
              marginBottom: "0px",
              fontSize: "16px",
            }}
          >
            {isSignUP ? "Already have an account?" : "Not registered?"}

            <span
              onClick={() => {
                setIsSignUP(!isSignUP);
                seterror("");
                setsuccess("");
              }}
              style={{
                color: "#6D5DFC",
                fontWeight: "600",
                cursor: "pointer",
                marginLeft: "5px",
              }}
            >
              {isSignUP ? "Login" : "Signup"}
            </span>
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "15px",
  border: "1px solid #d9d9e8",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "15px",
  cursor: "pointer",
  color: "white",
  fontSize: "18px",
  fontWeight: "600",
  background: "linear-gradient(90deg,#5128ff,#6D5DFC,#7C5CFF)",
};

export default App;
