import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user, token } = useSelector((state) => state.user);

  const RedirectAuthenticatedUser = ({children}) => {
    if(user && token){
      return <Navigate to="/" replace/>;
    }
    return children;
  }

  const ProtectedPath = ({children}) => {
    if (!user || !token) {
      return <Navigate to="/signin" replace/>;
    }
    return children;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center overflow-hidden relative">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPath>
                <Dashboard />
              </ProtectedPath>
            }
          />
          <Route path="/signup" element={<RedirectAuthenticatedUser>
            <Signup />
            </RedirectAuthenticatedUser>} />
          <Route path="/signin" element={<RedirectAuthenticatedUser>
            <SignIn />
            </RedirectAuthenticatedUser>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
