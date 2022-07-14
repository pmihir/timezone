import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { BASE_URL, REQUEST_TYPE_POST } from "../../constants/common";
import { apiClient } from "../../network/apiClient";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailId: formData.email,
      password: formData.password,
    };
    try {
      await apiClient({
        url: `signUp`,
        method: REQUEST_TYPE_POST,
        body: data,
      });
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="outer">
      <div className="inner">
      <h3>Create Account</h3>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="First Name"
              onChange={onHandleChange}
              name="firstName"
              value={formData.firstName}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={onHandleChange}
              name="lastName"
              value={formData.lastName}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={onHandleChange}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onHandleChange}
              required={true}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Create Account
            </Button>
          </div>

          <p className="forgot-password text-right">
            Already registered{" "}
            <Link to="/">
              log in?
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
