import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Project from "./pages/Project";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="sign-In" element={<SignIn />} />
        <Route path="sign-Up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="project" element={<Project />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
