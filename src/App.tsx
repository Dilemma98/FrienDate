import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "../src/components/contact";
import Footer from "../src/components/footer";
import Idea from "../src/components/idea";
import Plan from "../src/components/plan";
import NotFound from "../src/components/notFound";
import Header from "../src/components/header";
import HomePage from "../src/components/home";
import LoginPage from "./components/login";
import RegisterPage from "../src/components/register";
import NavBar from "../src/components/nav-bar";
import "./style.css";

class App extends React.Component{
    render() {
        return(
            <Router>
                <div>
                    <Header />
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/idea" element={<Idea/>}/>
                        <Route path="/plan" element={<Plan/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                <Footer/>
            </Router>
        );
    }
}

export default App;
