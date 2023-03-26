import { Home } from './pages/Home/Home';
import './app.scss';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Watch } from './pages/Watch/Watch';
import { Profile } from './pages/UserProfile/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
