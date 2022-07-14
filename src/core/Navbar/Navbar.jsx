import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../Context/userContext";
import { useContext } from "react";

const logoutPaths = ["/", "/signUp"];

const AppNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const isShowLogout = !logoutPaths.includes(location.pathname);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Timezone</Navbar.Brand>
        {isShowLogout && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text onClick={handleLogout}>
              <span style={{ color: "white" }}>Logout</span>
            </Navbar.Text>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default AppNav;
