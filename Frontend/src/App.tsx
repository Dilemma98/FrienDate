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
import DashboardPage from "../src/components/dashboard";
import GoogleLoginButton from "../src/components/googleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style.css";


// UserData interfacet som matchar din komponent
interface UserData {
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

class App extends React.Component<{}, { userData: UserData | null }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userData: null,
    };
  }
  

  setUserData = (userData: UserData | null) => {
    this.setState({ userData });
  };

  render() {
    return (
      <GoogleOAuthProvider clientId="655768995238-5m1d0d3arskq73qms4pl96ff6dlde0l9.apps.googleusercontent.com">
        <Router>
          <div>
            <Header />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/idea" element={<Idea />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/googleLogin" element={<GoogleLoginButton setUserData={this.setUserData} />}/>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </GoogleOAuthProvider>
    );
  }
}

export default App;
