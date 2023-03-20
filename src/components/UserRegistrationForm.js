import { useEffect, useState } from "react";
import NameFieldWithError from "./NameFieldWithError";
import "./UserRegistrationForm.css";

const UserRegistrationForm = ({
  id = "",
  firstName = "",
  lastName = "",
  email = "",
  contact = "",
  department = "",
  designation = "",
  experience = "",
  saveUpdateHandler = () => {},
  cancelHandler,
}) => {
  const [formData, setFormData] = useState({
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    contact: contact,
    department: department,
    designation: designation,
    experience: experience,
  });

  const [invalidForm, setInvalidForm] = useState(true);

  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    contact: false,
    department: false,
    designation: false,
    experience: false,
  });

  const blurHandler = (e) => {
    if (e.target.value === "") {
      setFormError((prev) => {
        return {
          ...prev,
          [e.target.id]: true,
        };
      });
    } else {
      setFormError((prev) => {
        return {
          ...prev,
          [e.target.id]: false,
        };
      });
    }
  };

  const changeHandler = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
    if (e.target.id === "email") {
      if (
        new RegExp(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ).test(e.target.value)
      ) {
        setFormError((prev) => {
          return {
            ...prev,
            email: false,
          };
        });
      } else {
        setFormError((prev) => {
          return {
            ...prev,
            email: true,
          };
        });
      }
    }
  };

  const submitHandler = () => {
    const isEmailValid = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(formData.email);
    if (isEmailValid) {
      saveUpdateHandler(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        department: "",
        designation: "",
        experience: "",
      });
      setInvalidForm(true);
    } else {
      setFormError((prev) => {
        return {
          ...prev,
          email: true,
        };
      });
    }
  };

  useEffect(() => {
    const nameValue = formData.firstName;
    const emailValue = formData.email;
    const departmentValue = formData.department;
    const designationValue = formData.designation;
    const experienceValue = formData.experience;
    const validEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(emailValue);
    if (
      nameValue.length > 0 &&
      validEmail &&
      departmentValue.length > 0 &&
      designationValue.length > 0 &&
      experienceValue.length > 0
    ) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [formError]);

  useEffect(() => {
    setFormData({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      department: department,
      designation: designation,
      experience: experience,
    });
  }, [id, firstName, email, contact, department, designation, experience]);

  return (
    <>
      <table className="outer-table">
        <thead>
          <tr>
            <td>
              <h1 className="user-heading" data-testid="user-heading">
                User Registration
              </h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table className="inner-table">
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="firstName">*First Name:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="firstName"
                        name="firstName"
                        formData={formData}
                        formError={formError}
                        errorMessage="First Name is required"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="lastName">Last Name:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="lastName"
                        name="lastName"
                        formData={formData}
                        formError={formError}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="email">*Email:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="email"
                        name="email"
                        formData={formData}
                        formError={formError}
                        errorMessage="Invalid Email"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="contact">Contact:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="contact"
                        name="contact"
                        formData={formData}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="department">*Department:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="department"
                        name="department"
                        formData={formData}
                        formError={formError}
                        errorMessage="Department is required"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="designation">*Designation:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="designation"
                        name="designation"
                        formData={formData}
                        formError={formError}
                        errorMessage="Designation is required"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="experience">*Experience:</label>
                    </td>
                    <td>
                      <NameFieldWithError
                        type="number"
                        id="experience"
                        name="experience"
                        formData={formData}
                        formError={formError}
                        errorMessage="Experience is required"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table className="btn-table">
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="submit"
                                name="submit"
                                id="submit"
                                data-testid="submit"
                                value={
                                  email.length ? "Updated User" : "Add User"
                                }
                                disabled={invalidForm}
                                onClick={submitHandler}
                              />
                            </td>
                            <td>
                              <input
                                type="button"
                                name="cancel"
                                id="cancel"
                                value="Cancel"
                                onClick={cancelHandler}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserRegistrationForm;
