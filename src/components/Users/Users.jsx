import { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserContext from "../../Context/userContext";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import './Users.css'
import { ADMIN_USER_ROLE, BASE_URL, REQUEST_TYPE_DELETE, REQUEST_TYPE_GET } from "../../constants/common";
import { apiClient } from "../../network/apiClient";

const Users = () => {
  const [users, setUsers] = useState(null);
  const { user } = useContext(UserContext);

  const getUsers = async () => {
    try {
      const response = await apiClient({
        url: `getAllUsers`,
        method: REQUEST_TYPE_GET,
        authToken: user.jwt,
      });
      setUsers(response.userData);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (emailId) => {
    try {
      const response = await apiClient({
        url: `deleteUser`,
        method: REQUEST_TYPE_DELETE,
        authToken: user.jwt,
        body: { emailId: emailId}
      });
      setUsers(response.userData);
      toast.success("User Deleted succesfully");
    } catch (e) {
      toast.error(e.message);
    }
  };

  if(!!!users){
    return <div className="spinner-container"><Spinner animation="border" variant="primary" /></div>
  }

  return (
    <div className="user-table-container">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((userData, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{userData.firstName}</td>
                <td>{userData.lastName}</td>
                <td>{userData.emailId}</td>
                <td className="user-action">
                  <Link
                    to={`/timezone`}
                    state={{ emailId: userData.emailId }}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {user.role === ADMIN_USER_ROLE && (
                      <Button variant="primary" size="sm">
                        View Timzones
                      </Button>
                    )}
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => deleteUser(userData.emailId)}
                  >
                    Delete User
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>No Users Found</td>
          </tr>
        )}
      </tbody>
    </Table>
    </div>
  );
};

export default Users;
