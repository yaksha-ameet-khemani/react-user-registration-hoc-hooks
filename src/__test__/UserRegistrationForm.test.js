import React from "react";
import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  act,
  waitFor,
} from "@testing-library/react";
import {
  getAllCells,
  getAllRows,
  getByRowgroupType,
  getAllRowsByRowgroupType,
} from "testing-library-table-queries";
import "@testing-library/jest-dom";
import UserRegistrationForm from "src/components/UserRegistrationForm";
import UsersList from "src/components/UsersList";

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const utils = render(<UserRegistrationForm />);
  const name = getById(utils.container, "name");
  const email = getById(utils.container, "email");
  const contact = getById(utils.container, "contact");
  const submit = getById(utils.container, "submit");
  const cancel = getById(utils.container, "cancel");

  return {
    name,
    email,
    contact,
    submit,
    cancel,
    ...utils,
  };
};

const userDetailsSetup = () => {
  const { container } = render(<UsersList />);
  const rows = getAllRows(container);

  return {
    rows,
  };
};

let testName = "UserRegistration boundary";

describe("boundary", () => {
  test(testName + " name is required", async () => {
    const { name } = setup();
    act(() => {
      fireEvent.blur(name);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Name is required/i)).toBeTruthy();
    });
  });

  test(testName + " name is Valid", async () => {
    const { name } = setup();
    act(() => {
      fireEvent.blur(name);
      fireEvent.change(name, { target: { value: "temp name" } });
    });
    await waitFor(async () => {
      const nameError = screen.queryByText(/Name is required./i);
      expect(nameError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " Invalid Email", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
    });
  });

  test(testName + " Email is invalid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc" } });
    });
    await waitFor(async () => {
      expect(await screen.findByText(/Invalid Email/i)).toBeTruthy();
    });
  });

  test(testName + " Email is Valid", async () => {
    const { email } = setup();
    act(() => {
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@def.com" } });
    });
    await waitFor(async () => {
      const emailError = screen.queryByText(/Invalid Email/i);
      expect(emailError).toBeNull();
    });
  });
});

describe("boundary", () => {
  test(testName + " submit button disabled on invalid data", async () => {
    const utils = render(<UserRegistrationForm />);
    expect(getById(utils.container, "submit")).toBeInTheDocument();
    expect(getById(utils.container, "submit")).toBeDisabled();
  });

  test(testName + " submit button enabled on valued text", async () => {
    const utils = render(<UserRegistrationForm />);
    const { name, email, contact } = setup();
    await waitFor(() => {
      fireEvent.blur(name);
      fireEvent.change(name, { target: { value: "Tom Jerry" } });
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@mail.com" } });
      fireEvent.blur(contact);
      fireEvent.change(contact, { target: { value: "1234567890" } });
      expect(getById(utils.container, "submit")).toBeInTheDocument();
      expect(
        getById(utils.container, "submit").getAttribute("disabled")
      ).not.toBeTruthy();
    });
  });

  test(testName + " update data on clicking submit button", async () => {
    const utils = render(<UserRegistrationForm />);
    const { name, email, contact } = setup();
    await waitFor(() => {
      fireEvent.blur(name);
      fireEvent.change(name, { target: { value: "Tom Jerry" } });
      fireEvent.blur(email);
      fireEvent.change(email, { target: { value: "abc@mail.com" } });
      fireEvent.blur(contact);
      fireEvent.change(contact, { target: { value: "1234567890" } });
      expect(getById(utils.container, "submit")).toBeInTheDocument();
      expect(
        getById(utils.container, "submit").getAttribute("disabled")
      ).not.toBeTruthy();
      fireEvent.click(getById(utils.container, "submit"));
    });
    const { rows } = userDetailsSetup();
    expect(rows).toHaveLength(2);
  });
});
