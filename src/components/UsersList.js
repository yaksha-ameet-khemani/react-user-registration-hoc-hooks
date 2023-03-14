import { memo, useEffect, useState } from "react";
import "./UsersList.css";

const dummyData = [
  {
    id: 1,
    name: "first",
    email: "first@mail.com",
    contact: "7878787878",
  },
  { id: 2, name: "second", email: "second@mail.com" },
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
      name: listUsers[id]?.name,
      email: listUsers[id]?.email,
      contact: listUsers[id]?.contact,
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
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
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
                    <td>{note.name}</td>
                    <td>{note.email}</td>
                    <td>{note.contact}</td>
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
