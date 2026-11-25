import { Navigate, Route, Routes } from "react-router-dom";
import Loginform from "./components/Loginform";
import Signupcard from "./components/Signupcard";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Discover from "./pages/Discover";
import PlanetDetail from "./pages/PlanetDetail";
import Watch from "./pages/Watch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Loginform />} />
      <Route path="/signup" element={<Signupcard />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/Discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
      <Route path="/planet/:planetId" element={<ProtectedRoute><PlanetDetail /></ProtectedRoute>} />
      <Route path="/watch/:storyId" element={ <ProtectedRoute><Watch /></ProtectedRoute>}/>
    </Routes>
  );
};
export default App;