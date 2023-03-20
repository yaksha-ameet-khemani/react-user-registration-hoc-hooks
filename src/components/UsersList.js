import { memo, useEffect, useState } from "react";
import "./UsersList.css";

const dummyData = [
  {
    id: 1,
    firstName: "first",
    lastName: "last",
    email: "first@mail.com",
    contact: "7878787878",
    department: "department",
    designation: "designation",
    experience: "1",
  },
];

const UsersList = ({ users, userFormHandler, setUsers, userDataHandler }) => {
  const [listUsers, setListUsers] = useState(users);
  const tempUsers = {};

  useEffect(() => {
    if (users && !Object.entries(users).length) {
      dummyData.forEach((data, index) => {
        tempUsers[index + 1] = data;
      });
      setListUsers(tempUsers);
      setUsers(tempUsers);
    }
  }, []);

  useEffect(() => {
    setListUsers(users);
  }, [users]);

  const deleteHandler = (id) => {
    const updatedUsers = Object.keys(users)
      .filter((key) => id !== key)
      .reduce((obj, key) => {
        obj[key] = users[key];
        return obj;
      }, {});
    setUsers(updatedUsers);
  };

  const editHandler = (id) => {
    userDataHandler({
      id: listUsers[id]?.id,
      firstName: listUsers[id]?.firstName,
      lastName: listUsers[id]?.lastName,
      email: listUsers[id]?.email,
      contact: listUsers[id]?.contact,
      department: listUsers[id]?.department,
      designation: listUsers[id]?.designation,
      experience: listUsers[id]?.experience,
    });
    userFormHandler(true);
  };

  return (
    <div className="user-details-div">
      <h1 className="users-heading" id="users-heading">
        Users List
      </h1>
      <div className="toggle-btn">
        <button
          id="toggle-btn"
          data-testid="toggle-btn"
          name="toggle-btn"
          aria-label="toggle-btn"
          role="button"
          onClick={userFormHandler}
        >
          Toggle User Form
        </button>
        <br />
        <br />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Experience</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listUsers && Object.entries(listUsers).length ? (
              <>
                {Object.entries(listUsers).map(([key, note], index) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{note.firstName}</td>
                    <td>{note.lastName}</td>
                    <td>{note.email}</td>
                    <td>{note.contact}</td>
                    <td>{note.department}</td>
                    <td>{note.designation}</td>
                    <td>{note.experience}</td>
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => editHandler(key)}
                      >
                        edit
                      </i>
                    </td>
                    <td>
                      <i
                        className="material-icons"
                        onClick={() => deleteHandler(key)}
                      >
                        delete
                      </i>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(UsersList);
