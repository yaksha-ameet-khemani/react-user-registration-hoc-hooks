// import React from "react";
// import {
//   render,
//   screen,
//   fireEvent,
//   queryByAttribute,
//   act,
//   waitFor,
// } from "@testing-library/react";
// import {
//   getAllCells,
//   getAllRows,
//   getByRowgroupType,
//   getAllRowsByRowgroupType,
// } from "testing-library-table-queries";
// import "@testing-library/jest-dom";
// import UserRegistrationForm from "src/components/UserRegistrationForm";
// import UsersList from "src/components/UsersList";

// const getById = queryByAttribute.bind(null, "id");

// const setup = () => {
//   const utils = render(<UserRegistrationForm />);
//   const name = getById(utils.container, "name");
//   const email = getById(utils.container, "email");
//   const contact = getById(utils.container, "contact");
//   const submit = getById(utils.container, "submit");
//   const cancel = getById(utils.container, "cancel");

//   return {
//     name,
//     email,
//     contact,
//     submit,
//     cancel,
//     ...utils,
//   };
// };

// const userDetailsSetup = () => {
//   const { container } = render(<UsersList />);
//   const rows = getAllRows(container);

//   return {
//     rows,
//   };
// };

// let testName = "UserRegistration boundary";

// describe("boundary", () => {
//   test(testName + " name is required", async () => {
//     const { name } = setup();
//     act(() => {
//       fireEvent.blur(name);
//     });
//     await waitFor(async () => {
//       expect(await screen.findByText(/Name is required/i)).toBeTruthy();
//     });
//   });

//   test(testName + " name is Valid", async () => {
//     const { name } = setup();
//     act(() => {
//       fireEvent.blur(name);
//       fireEvent.change(name, { target: { value: "temp name" } });
//     });
//     await waitFor(async () => {
//       const nameError = screen.queryByText(/Name is required./i);
//       expect(nameError).toBeNull();
//     });
//   });
// });

// describe("boundary", () => {
//   test(testName + " Invalid Email", async () => {
//     const { email } = setup();
//     act(() => {
//       fireEvent.blur(email);
//     });
//     await waitFor(async () => {
//       expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
//     });
//   });

//   test(testName + " Email is invalid", async () => {
//     const { email } = setup();
//     act(() => {
//       fireEvent.blur(email);
//       fireEvent.change(email, { target: { value: "abc" } });
//     });
//     await waitFor(async () => {
//       expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
//     });
//   });

//   test(testName + " Email is Valid", async () => {
//     const { email } = setup();
//     act(() => {
//       fireEvent.blur(email);
//       fireEvent.change(email, { target: { value: "abc@def.com" } });
//     });
//     await waitFor(async () => {
//       const emailError = screen.queryByText(/Invalid Email/i);
//       expect(emailError).toBeNull();
//     });
//   });
// });

// describe("boundary", () => {
//   test(testName + " submit button disabled on invalid data", async () => {
//     const utils = render(<UserRegistrationForm />);
//     expect(getById(utils.container, "submit")).toBeInTheDocument();
//     expect(getById(utils.container, "submit")).toBeDisabled();
//   });

//   test(testName + " submit button enabled on valued text", async () => {
//     const utils = render(<UserRegistrationForm />);
//     const { name, email, contact } = setup();
//     await waitFor(() => {
//       fireEvent.blur(name);
//       fireEvent.change(name, { target: { value: "Tom Jerry" } });
//       fireEvent.blur(email);
//       fireEvent.change(email, { target: { value: "abc@mail.com" } });
//       fireEvent.blur(contact);
//       fireEvent.change(contact, { target: { value: "1234567890" } });
//       expect(getById(utils.container, "submit")).toBeInTheDocument();
//       expect(
//         getById(utils.container, "submit").getAttribute("disabled")
//       ).not.toBeTruthy();
//     });
//   });

//   test(testName + " update data on clicking submit button", async () => {
//     const utils = render(<UserRegistrationForm />);
//     const { name, email, contact } = setup();
//     await waitFor(() => {
//       fireEvent.blur(name);
//       fireEvent.change(name, { target: { value: "Tom Jerry" } });
//       fireEvent.blur(email);
//       fireEvent.change(email, { target: { value: "abc@mail.com" } });
//       fireEvent.blur(contact);
//       fireEvent.change(contact, { target: { value: "1234567890" } });
//       expect(getById(utils.container, "submit")).toBeInTheDocument();
//       expect(
//         getById(utils.container, "submit").getAttribute("disabled")
//       ).not.toBeTruthy();
//       fireEvent.click(getById(utils.container, "submit"));
//     });
//     const { rows } = userDetailsSetup();
//     expect(rows).toHaveLength(2);
//   });
// });

import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import UserRegistrationForm from "src/components/UserRegistrationForm";

const userRegistrationForm = "UserRegistrationForm boundary";

const setup = () => {
  render(<UserRegistrationForm />);
  const firstName = screen.getByRole("textbox", {
    name: /\*first name:/i,
  });
  const lastName = screen.getByRole("textbox", {
    name: /last name:/i,
  });
  const email = screen.getByRole("textbox", {
    name: /\*email:/i,
  });
  const department = screen.getByRole("textbox", {
    name: /\*department:/i,
  });
  const designation = screen.getByRole("textbox", {
    name: /\*designation:/i,
  });
  const experience = screen.getByRole("spinbutton", {
    name: /\*experience:/i,
  });
  const addUserButton = screen.getByRole("button", {
    name: /add user/i,
  });

  return {
    firstName,
    lastName,
    email,
    contact,
    department,
    designation,
    experience,
    addUserButton,
  };
};

describe("boundary", () => {
  test(
    userRegistrationForm +
      " should mount User registration form without crashing",
    () => {
      const component = shallow(<UserRegistrationForm />);
      expect(component.getElements()).toMatchSnapshot();
      component.unmount();
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain firstName input field", () => {
    const { firstName } = setup();
    expect(firstName).toBeInTheDocument();
  });

  test(
    userRegistrationForm + " should give error on empty firstName input field",
    async () => {
      const { firstName } = setup();
      act(() => {
        fireEvent.blur(firstName);
      });
      await waitFor(async () => {
        expect(await screen.findByText(/First Name is required/i)).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm +
      " should not give error on valid firstName input field",
    async () => {
      const { firstName } = setup();
      act(() => {
        fireEvent.change(firstName, { target: { value: "First name" } });
      });
      await waitFor(async () => {
        const nameError = screen.queryByText(/First name is required/i);
        expect(nameError).toBeNull();
      });
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain lastName input field", () => {
    const { lastName } = setup();
    expect(lastName).toBeInTheDocument();
  });
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain email input field", () => {
    const { email } = setup();
    expect(email).toBeInTheDocument();
  });

  test(
    userRegistrationForm + " should give error on empty email input field",
    async () => {
      const { email } = setup();
      expect(email).toBeInTheDocument();
      act(() => {
        fireEvent.blur(email);
      });
      await waitFor(async () => {
        expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm + " should give error on invalid email input field",
    async () => {
      const { email } = setup();
      act(() => {
        fireEvent.change(email, { target: { value: "first@" } });
      });
      await waitFor(async () => {
        expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm + " should not give error on valid email input field",
    async () => {
      const { email } = setup();
      act(() => {
        fireEvent.change(email, { target: { value: "first@name.com" } });
      });
      await waitFor(async () => {
        const emailError = screen.queryByText(/Invalid Email/i);
        expect(emailError).toBeNull();
      });
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain contact input field", () => {
    const { contact } = setup();
    expect(contact).toBeInTheDocument();
  });
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain department input field", () => {
    const { department } = setup();
    expect(department).toBeInTheDocument();
  });

  test(
    userRegistrationForm + " should give error on empty department input field",
    async () => {
      const { department } = setup();
      act(() => {
        fireEvent.blur(department);
      });
      await waitFor(async () => {
        expect(await screen.findByText(/Department is required/i)).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm +
      " should not give error on valid department input field",
    async () => {
      const { department } = setup();
      act(() => {
        fireEvent.change(department, {
          target: { value: "department" },
        });
      });
      await waitFor(async () => {
        const departmentError = screen.queryByText(/Department is required/i);
        expect(departmentError).toBeNull();
      });
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain designation input field", () => {
    const { designation } = setup();
    expect(designation).toBeInTheDocument();
  });

  test(
    userRegistrationForm +
      " should give error on empty designation input field",
    async () => {
      const { designation } = setup();
      act(() => {
        fireEvent.blur(designation);
      });
      await waitFor(async () => {
        expect(
          await screen.findByText(/Designation is required/i)
        ).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm +
      " should not give error on valid designation input field",
    async () => {
      const { designation } = setup();
      act(() => {
        fireEvent.change(designation, {
          target: { value: "designation" },
        });
      });
      await waitFor(async () => {
        const designationError = screen.queryByText(/Designation is required/i);
        expect(designationError).toBeNull();
      });
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should contain experience input field", () => {
    const { experience } = setup();
    expect(experience).toBeInTheDocument();
  });

  test(
    userRegistrationForm + " should give error on empty experience input field",
    async () => {
      const { experience } = setup();
      act(() => {
        fireEvent.blur(experience);
      });
      await waitFor(async () => {
        expect(await screen.findByText(/Experience is required/i)).toBeTruthy();
      });
    }
  );

  test(
    userRegistrationForm +
      " should not give error on valid experience input field",
    async () => {
      const { experience } = setup();
      act(() => {
        fireEvent.change(experience, {
          target: { value: "1" },
        });
      });
      await waitFor(async () => {
        const experienceError = screen.queryByText(/Experience is required/i);
        expect(experienceError).toBeNull();
      });
    }
  );
});

describe("boundary", () => {
  test(userRegistrationForm + " should have submit button", async () => {
    const { addUserButton } = setup();
    expect(addUserButton).toBeInTheDocument();
  });

  test(
    userRegistrationForm + " should have disabled submit button",
    async () => {
      const { addUserButton } = setup();
      expect(addUserButton).toBeInTheDocument();
      expect(addUserButton).toBeDisabled();
    }
  );

  test(
    userRegistrationForm +
      " shoud have enabled add user button on all valid fields",
    async () => {
      const {
        firstName,
        email,
        department,
        designation,
        experience,
        addUserButton,
      } = setup();
      await userEvent.type(firstName, "first name");
      await userEvent.type(email, "first@name.com");
      await userEvent.type(department, "department");
      await userEvent.type(designation, "designation");
      await userEvent.type(experience, "2");
      await userEvent.tab();
      expect(addUserButton).not.toBeDisabled();
      await userEvent.click(addUserButton);
    }
  );
});
