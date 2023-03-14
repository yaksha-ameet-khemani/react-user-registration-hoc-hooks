import { useEffect, useState } from "react";
import NameFieldWithError from "./NameFieldWithError";
import "./UserRegistrationForm.css";

const UserRegistrationForm = ({
  id = "",
  name = "",
  email = "",
  contact = "",
  saveUpdateHandler,
  cancelHandler,
}) => {
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    email: email,
    contact: contact,
  });

  const [invalidForm, setInvalidForm] = useState(true);

  const [formError, setFormError] = useState({
    name: false,
    email: false,
    contact: false,
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
      setFormData({ name: "", email: "", contact: "" });
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
    const nameValue = formData.name;
    const emailValue = formData.email;
    const validEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(emailValue);
    if (nameValue.length > 0 && validEmail) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [formError]);

  useEffect(() => {
    setFormData({
      id: id,
      name: name,
      email: email,
      contact: contact,
    });
  }, [id, name, email, contact]);

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
                    <td>*Name:</td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="name"
                        formData={formData}
                        formError={formError}
                        errorMessage="Name is required"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>*Email:</td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="email"
                        formData={formData}
                        formError={formError}
                        errorMessage="Invalid Email"
                        blurHandler={blurHandler}
                        changeHandler={changeHandler}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Contact:</td>
                    <td>
                      <NameFieldWithError
                        type="text"
                        id="contact"
                        formData={formData}
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
