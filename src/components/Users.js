import { useState, useEffect } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import UsersList from "./UsersList";

const Users = ({ setDummyData = true }) => {
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    department: "",
    designation: "",
    experience: "",
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

  const saveUpdateHandler = ({
    id,
    firstName,
    lastName,
    email,
    contact,
    department,
    designation,
    experience,
  }) => {
    const tempUsers = JSON.parse(JSON.stringify(users));
    if (id !== 0) {
      tempUsers[id] = {
        id,
        firstName,
        lastName,
        email,
        contact,
        department,
        designation,
        experience,
      };
    } else {
      tempUsers[Object.values(tempUsers).length + 1] = {
        id: Object.values(tempUsers).length + 1,
        firstName,
        lastName,
        email,
        contact,
        department,
        designation,
        experience,
      };
    }
    setUsers(tempUsers);
    setUserForm(false);
  };

  const cancelHandler = () => {
    setUserData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      department: "",
      designation: "",
      experience: "",
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
            firstName={userData.firstName}
            lastName={userData.lastName}
            email={userData.email}
            contact={userData.contact}
            department={userData.department}
            designation={userData.designation}
            experience={userData.experience}
            saveUpdateHandler={saveUpdateHandler}
            cancelHandler={cancelHandler}
          />
        </div>
      )}
    </>
  );
};

export default Users;
