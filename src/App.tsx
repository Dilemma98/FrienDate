import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from "../src/components/contact";
import Footer from "../src/components/footer";
import Idea from "../src/components/idea";
import Plan from "../src/components/plan";
import NotFound from "../src/components/notFound";
import Header from "../src/components/header";
import HomePage from "../src/components/homePage";
import LoginPage from "../src/components/loginPage";
import RegisterPage from "../src/components/registerPage";

class App extends React.Component{
    render() {
        return(
            <Router>
                <div>
                    <Header />
                    <nav>
                        <ul>
                            <li>
                                <Link to="/contact">Kontakt</Link>
                            </li>
                            <li>
                                <Link to="/idea">Affärsidé</Link>
                            </li>
                            <li>
                                <Link to="/plan">Affärsplan</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/idea" element={<Idea/>}/>
                        <Route path="/plan" element={<Plan/>}/>
                        <Route path="/loginPage" element={<LoginPage/>}/>
                        <Route path="/registerPage" element={<RegisterPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
