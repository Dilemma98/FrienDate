import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./components/contactUs";
import Footer from "../src/components/footer";
import AboutUs from "../src/components/aboutUs";
import HowItWorks from "../src/components/howItWorks";
import NotFound from "../src/components/notFound";
import Header from "../src/components/header";
import HomePage from "../src/components/home";
import NavBar from "../src/components/nav-bar";
import GoogleLoginButton from "../src/components/googleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserDashboard from "./components/user/userDashboard";
import type { UserData } from "./declarations/declarations.d";
import UserProfile from "./components/user/userProfile";
import ActivitySuggestions from "./components/activitySuggestions";
import GroupPage from "./components/groupPage";
import { UserProvider } from "./components/providers/userProvider";
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
        <UserProvider>
        <Router>
          <div>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contactUs" element={<Contact />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/howItWorks" element={<HowItWorks />} />
              <Route
                path="/googleLogin"
                element={<GoogleLoginButton/>}
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
                
              <Route 
              path="/groupPage" 
              element={<GroupPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
        </UserProvider>
      </GoogleOAuthProvider>
    );
  }
}

export default App;
