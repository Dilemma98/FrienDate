import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "../src/components/contact";
import Footer from "../src/components/footer";
import Idea from "../src/components/idea";
import Plan from "../src/components/plan";
import NotFound from "../src/components/notFound";
import Header from "../src/components/header";
import HomePage from "../src/components/home";
import NavBar from "../src/components/nav-bar";
import GoogleLoginButton from "../src/components/googleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserDashboard from "../src/components/userDashboard";
import type { UserData } from "./declarations/declarations.d";
import UserProfile from "./components/userProfile";
import ActivitySuggestions from "./components/activitySuggestions";
import "./style.css";
// 🧩 2. App state
interface AppState {
  userData: UserData | null;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userData: localStorage.getItem("frienDateUser")
        ? JSON.parse(localStorage.getItem("frienDateUser")!)
        : null,
    };
  }

  setUserData = (data: UserData) => {
    this.setState({ userData: data });
  };

  render() {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Router>
          <div>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/idea" element={<Idea />} />
              <Route path="/plan" element={<Plan />} />
              <Route
                path="/googleLogin"
                element={<GoogleLoginButton setUserData={this.setUserData} />}
              />
              <Route
                path="/userDashboard"
                element={<UserDashboard userData={this.state.userData} />}
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/userProfile"
                element={<UserProfile userData={this.state.userData} />} />
              
              <Route
                path="/activitySuggestions"
                element={<ActivitySuggestions />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </GoogleOAuthProvider>
    );
  }
}

export default App;
