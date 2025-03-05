import React, { createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

// Context API for Authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex gap-4 shadow-lg">
      <Link className="hover:underline" to="/">Home</Link>
      <Link className="hover:underline" to="/profile">Profile</Link>
      <Link className="hover:underline" to="/setting">Setting</Link>
    </nav>
  );
};

// HOC for Authentication Check
const withAuth = (Component) => {
  return (props) => {
    const { isLogin } = useAuth();
    return isLogin ? <Component {...props} /> : <Navigate to="/" replace />;
  };
};

// Pages
const Home = () => {
  const { isLogin, setIsLogin } = useAuth();
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Logout" : "Login"}
      </button>
    </div>
  );
};

const Profile = withAuth(() => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p className="mt-2 text-gray-600">Welcome to profile!</p>
    </div>
  );
});

const Setting = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Setting Page</h1>
      <p className="mt-2 text-gray-600">Adjust your preferences here.</p>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <Navbar />
          <div className="w-full max-w-2xl mt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
