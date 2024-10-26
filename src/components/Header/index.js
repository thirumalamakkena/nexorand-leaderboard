import "./index.css";
import { Link } from "react-router-dom";

const Header = () => {
  const isLogged = localStorage.getItem("userData");
  const userInfo = JSON.parse(isLogged);

    const onLogout = () => {
        localStorage.removeItem('userData');
        window.location.reload();
    }

  return (
    <nav className="nav-container">
      {!isLogged && (
        <div className="nav-options">
          <Link to="/register" className="option">
            Register
          </Link>

          <Link to="/login" className="option">
            Login
          </Link>
        </div>
      )}
      {isLogged && (
        <div className="user-info-container">
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
          <div className="user-info">
            <p className="user-fname">{userInfo.firstName}</p>
            <p className="user-email">{userInfo.email}</p>
            <p className="user-points">Points: {userInfo.Points}</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
