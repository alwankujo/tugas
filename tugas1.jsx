import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

// Context for Auth
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// HOC for Profile Protection
const withAuth = (Component) => {
  return (props) => {
    const { isLogin } = useAuth();
    return isLogin ? <Component {...props} /> : <Navigate to="/" replace />;
  };
};

// Components
const Navbar = () => {
  const { isLogin, setIsLogin } = useAuth();
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
        <Link to="/setting" className="hover:underline">Setting</Link>
      </div>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        {isLogin ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

const Home = () => <div className="p-5 text-center text-xl">Welcome to Home Page</div>;
const Profile = withAuth(() => <div className="p-5 text-center text-xl">Profile</div>);
const Setting = () => <div className="p-5 text-center text-xl">Settings Page</div>;

// App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
