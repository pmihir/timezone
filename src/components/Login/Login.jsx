import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import UserContext from "../../Context/userContext";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      emailId: email,
      password: password,
    };
    const res = await fetch("http://localhost:5000/user/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await res.json();
    if(res.status === 200){
    setUser({
      emailId: responseJson.user.emailId,
      jwt: responseJson.user.token,
      role: responseJson.user.role,
    });
    if (responseJson.user.role === 0) {
      navigate("/timezone", {
        replace: true,
        state: { emailId: responseJson.user.emailId },
      });
    } else {
      navigate("/users", { replace: true });
    }
  }else{
    toast.error(responseJson.message);
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
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleOnChange}
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Login
              </Button>
            </div>
          </Form.Group>
          <Link to="/signUp" style={{ textDecoration: "none", color: "white" }}>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Create Account
                {/* <Navigate to="/dashboard" replace={true} /> Create Account */}
              </Button>
            </div>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export { Login };
