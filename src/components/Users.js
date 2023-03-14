import { useState, useEffect } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import UsersList from "./UsersList";

const Users = ({ setDummyData = true }) => {
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    contact: "",
  });
  const [users, setUsers] = useState({});
  const [userForm, setUserForm] = useState(false);

  const userFormHandler = (isEdit = false) => {
    if (isEdit) {
      setUserForm(true);
    } else {
      setUserForm(!userForm);
    }
  };

  const saveUpdateHandler = ({ id, name, email, contact }) => {
    const tempUsers = JSON.parse(JSON.stringify(users));
    if (id !== 0) {
      tempUsers[id] = {
        id,
        name,
        email,
        contact,
      };
    } else {
      tempUsers[Object.values(tempUsers).length + 1] = {
        id: Object.values(tempUsers).length + 1,
        name,
        email,
        contact,
      };
    }
    setUsers(tempUsers);
    setUserForm(false);
  };

  const cancelHandler = () => {
    setUserData({
      id: "",
      name: "",
      email: "",
      contact: "",
    });
    setUserForm(false);
  };

  const userDataHandler = (formData) => {
    setUserData(formData);
  };

  return (
    <>
      <UsersList
        users={users}
        userFormHandler={userFormHandler}
        setUsers={setUsers}
        userDataHandler={userDataHandler}
      />
      {userForm && (
        <div className="user-registration-form">
          <UserRegistrationForm
            id={userData.id}
            name={userData.name}
            email={userData.email}
            contact={userData.contact}
            saveUpdateHandler={saveUpdateHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </>
  );
};

export default Users;
