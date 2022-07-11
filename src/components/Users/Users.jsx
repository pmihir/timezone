import { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UserContext from "../../Context/userContext";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import './Users.css'
const Users = () => {
  const [users, setUsers] = useState(null);
  const { user } = useContext(UserContext);

  const getUsers = async () => {
    const response = await fetch("http://localhost:5000/user/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    const responeData = await response.json();
    setUsers(responeData.userData);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (emailId) => {
    const response = await fetch("http://localhost:5000/user/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        emailId: emailId,
      }),
    });
    const responeData = await response.json();
    if (response.status === 200) {
      setUsers(responeData.userData);
    } else {
      toast.error(responeData.message);
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
                    {user.role === 2 && (
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
