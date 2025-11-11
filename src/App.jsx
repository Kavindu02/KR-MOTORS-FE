import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/loginPage';
import RegisterPage from './Pages/registerPage';
import { Toaster } from "react-hot-toast";
import AdminPage from './Pages/adminPadge';
import TestPage from './Pages/admin/testPage';
import ClientWebPage from './Pages/customer/customerPage';
import HomePage from './Pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './Pages/customer/forgetPassword';
import ProductOverView from "./Pages/customer/productOverView";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="w-full h-screen bg-primary">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/product/:id" element={<ProductOverView />} /> {/* ✅ Add here */}
            <Route path="/*" element={<ClientWebPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/forget" element={<ForgetPasswordPage />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
