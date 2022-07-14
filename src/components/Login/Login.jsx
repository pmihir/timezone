import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import UserContext from "../../Context/userContext";
import { toast } from "react-toastify";
import { NORMAL_USER_ROLE, REQUEST_TYPE_POST } from "../../constants/common";
import { apiClient } from "../../network/apiClient";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      emailId: email,
      password: password,
    };
    try {
      const response = await apiClient({
        url: `signIn`,
        method: REQUEST_TYPE_POST,
        body: data,
      });
      setUser({
        emailId: response.user.emailId,
        jwt: response.user.token,
        role: response.user.role,
      });
      if (response.user.role === NORMAL_USER_ROLE) {
        navigate("/timezone", {
          replace: true,
          state: { emailId: response.user.emailId },
        });
      } else {
        navigate("/users", { replace: true });
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
        <h3>Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleOnChange}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
              required={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-grid gap-2">
              <Button variant="primary" name="Login" type="submit" size="lg">
                Login
              </Button>
            </div>
          </Form.Group>
          <Link to="/signUp" style={{ textDecoration: "none", color: "white" }}>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Create Account
              </Button>
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export { Login };
