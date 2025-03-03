import React, { useState } from "react";
import axios from "axios";
import useIsMobile from "../components/useIsMobile";
import styles from "../pages/Login.module.css"; // Import the CSS module
import img1 from "../assets/logo2.png";
import img2 from "../assets/Frame (1).png";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"; // For displaying error messages
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Validation function
  const validate = () => {
    let newErrors = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required*";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required*";
    }

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const isValid = validate();
    if (!isValid) {
      toast.error("Please fullfill all the required fields");
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post("/api/login", {
        email: email,
        password: password,
      });

      // Handle successful login
      if (response.status === 200) {
        toast.success("Logged in successfully!");
        const token = response.data.token;
        const fullname = response.data.fullname;
        localStorage.setItem("fullname", fullname);
        const username = response.data.username;
        const selectedColor = response.data.selectedColor;
        const email = response.data.email;
        const bio = response.data.bio;
        const savedAddLinks = response.data.savedAddLinks;
        const savedShopLinks = response.data.savedShopLinks;
        const selectedLayout = response.data.selectedLayout;
        const selectedButtonStyle = response.data.selectedButtonStyle;
        const buttonColor = response.data.buttonColor;
        const buttonFontColor = response.data.buttonFontColor;
        const selectedTheme = response.data.selectedTheme;
        const selectedFont = response.data.selectedFont;
        const selectedFontColor = response.data.selectedFontColor;
        const userID = response.data.userID;
        const profileImage = response.data.profileImage;
        localStorage.setItem("profileImage", profileImage);
        localStorage.setItem("userID", userID);
        if (!selectedFontColor) {
          localStorage.setItem("selectedFontColor", "#FFFFFF");
        } else {
          localStorage.setItem("selectedFontColor", selectedFontColor);
        }
        if (!selectedFont) {
          localStorage.setItem("selectedFont", "Poppins");
        } else {
          localStorage.setItem("selectedFont", selectedFont);
        }
        if (!selectedTheme) {
          localStorage.setItem("selectedTheme", "air-snow");
        } else {
          localStorage.setItem("selectedTheme", selectedTheme);
        }
        if (!buttonFontColor) {
          localStorage.setItem("buttonFontColor", "#000000");
        } else {
          localStorage.setItem("buttonFontColor", buttonFontColor);
        }
        if (!buttonColor) {
          localStorage.setItem("buttonColor", "#C9C9C9");
        } else {
          localStorage.setItem("buttonColor", buttonColor);
        }
        if (!selectedButtonStyle) {
          localStorage.setItem("selectedButtonStyle", "fill");
        } else {
          localStorage.setItem("selectedButtonStyle", selectedButtonStyle);
        }
        if (!selectedLayout) {
          localStorage.setItem("selectedLayout", "stack");
        } else {
          localStorage.setItem("selectedLayout", selectedLayout);
        }
        if (!savedShopLinks) {
          localStorage.setItem("savedShopLinks", JSON.stringify([]));
        } else {
          localStorage.setItem(
            "savedShopLinks",
            JSON.stringify(savedShopLinks)
          );
        }
        if (!savedAddLinks) {
          localStorage.setItem("savedAddLinks", JSON.stringify([]));
        } else {
          localStorage.setItem("savedAddLinks", JSON.stringify(savedAddLinks));
        }
        if (!bio) {
          localStorage.setItem("bio", "Bio");
        } else {
          localStorage.setItem("bio", bio);
        }

        localStorage.setItem("email", email);
        if (!selectedColor) {
          localStorage.setItem("selectedColor", "#342B26");
        } else {
          localStorage.setItem("selectedColor", selectedColor);
        }
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        if (!username) {
          navigate("/tell-us-your-name");
        } else {
          navigate("/dashboard");
        }

        // Redirect or perform other actions
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Check if all validation rules are satisfied
  const isFormValid = Object.keys(errors).length === 0 && email && password;

  return (
    <>
      <div className={styles.logincontainer}>
        <div className={styles.cc1}>
          <img
            style={!isMobile?{
              marginTop: "3%",
              marginLeft: "3%",
              width: "15%",
              height: "7%",
            }:{ marginTop: "3%",
              marginLeft: "3%",
              width: "30%",
              height: "7%",}}
            src={img1}
            alt="img"
          />
          <div className={styles.formdiv1}>
            <h1>Sign in to your Spark</h1>
            <form className={styles["form-grp1"]} onSubmit={handleSubmit} method="post">
              <input
                type="text"
                placeholder="Spark/Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className={styles.error1}>{errors.email}</p>}

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className={styles.error1}>{errors.password}</p>}

              <button
                style={{
                  backgroundColor: isFormValid ? "#28A263" : "#E0E2D9", // Dynamic background color
                  color: isFormValid ? "white" : "#A8AAA2", // Dynamic text color
                  border: "none",
                  width: "90%",
                  height: "5.5vh",
                  borderRadius: "20px",
                  marginLeft: "4%",
                  cursor: "pointer", // Add pointer cursor
                }}
                type="submit"
              >
                Log in
              </button>
              <p style={{ alignSelf: "center" }}>
                Don't have an account?{" "}
                <Link style={{ color: "#28A263" }} to="/register">
                  Sign up
                </Link>
              </p>
              <p
                style={{
                  color: "rgb(147, 137, 137)",
                  fontSize: "0.6em",
                  marginTop: "40%",
                }}
              >
                This site is protected by reCAPTCHA and the{" "}
                <Link
                  to={"https://policies.google.com/privacy?hl=en-US"}
                  style={{ color: "rgb(147, 137, 137)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to={"https://policies.google.com/terms?hl=en-US"}
                  style={{ color: "rgb(147, 137, 137)" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>{" "}
                apply.
              </p>
            </form>
          </div>
        </div>
        {!isMobile && (
          <div className={styles.cc2}>
            <img src={img2} style={{ width: "100%", height: "100%" }} alt="" />
          </div>
        )}
      </div>
    </>
  );
}