import { shallow } from "enzyme";
import {
  render,
  screen,
  fireEvent,
  queryByAttribute,
  act,
  waitFor,
  within,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  getAllCells,
  getAllRows,
  getByRowgroupType,
  queryByRowgroupType,
  getAllRowsByRowgroupType,
} from "testing-library-table-queries";
import UsersList from "src/components/UsersList";
import UserRegistrationForm from "src/components/UserRegistrationForm";
import * as React from "react";

const fields = ["S.No.", "Name", "Email", "", ""];
const testData = {
  1: {
    id: 1,
    name: "Ravi",
    email: "ravi@gmail.com",
    contact: "",
  },
  2: {
    id: 2,
    name: "Ravi",
    email: "ravi@gmail.com",
    contact: "1234567890",
  },
};

const getById = queryByAttribute.bind(null, "id");

const setup = () => {
  const { container } = render(<UsersList />);
  const rows = getAllRows(container);
  const cells = getAllCells(container);
  const header = getByRowgroupType(container, "thead");
  const tBodyRow = getAllRowsByRowgroupType(container, "tbody");
  const toggleButton = getById(container, "toggle-btn");
  return {
    rows,
    cells,
    header,
    tBodyRow,
    container,
    toggleButton,
  };
};

const testName = "UsersList boundary";

afterEach(cleanup);

describe("boundary", () => {
  test(testName + " should mount UsersList without crashing", () => {
    const component = shallow(<UsersList />);
    expect(component.getElements()).toMatchSnapshot();
    component.unmount();
  });
});

describe("boundary", () => {
  const { rows, cells, header, tBodyRow, container, toggleButton } = setup();

  test(testName + " should be rendered", async () => {
    render(<UsersList />);
    expect(await screen.findByText(/Users List/i)).toBeTruthy();
  });

  test(testName + " should be rendered with data", async () => {
    const { container } = render(<UsersList users={testData} />);
    const rows = getAllRows(container);
    const header = getByRowgroupType(container, "thead");
    const tBodyRow = getAllRowsByRowgroupType(container, "tbody");
    expect(await screen.queryByText(/No Data Found/i)).toBeFalsy();
    expect(rows).toHaveLength(Object.entries(testData).length + 1);
    expect(tBodyRow).toHaveLength(Object.entries(testData).length);
    expect(header).toBeTruthy();
  });

  test(testName + " should be rendered without data", async () => {
    const { container } = render(<UsersList setDummyData={false} />);
    const rows = getAllRows(container);
    const header = getByRowgroupType(container, "thead");
    const tBodyRow = getAllRowsByRowgroupType(container, "tbody");
    expect(await screen.queryByText(/No Data Found/i)).toBeTruthy();
    expect(rows).toHaveLength(Object.values(testData).length);
    expect(tBodyRow).toHaveLength(Object.values(testData).length - 1);
    expect(header).toBeTruthy();
  });

  test(testName + " should have header", async () => {
    expect(header).toBeTruthy();
  });

  test(
    testName + " should have a toggle button for registration form",
    async () => {
      expect(toggleButton).toBeTruthy();
    }
  );

  test(
    testName + " should have a clickable toggle button for registration form",
    async () => {
      render(<UsersList />);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      waitFor(() =>
        expect(screen.getByText("User Registration")).toBeInTheDocument()
      );
    }
  );

  test(
    testName + " should hide registration form on double clicking button",
    async () => {
      const utils = render(<UsersList />);
      await waitFor(() => {
        fireEvent.click(getById(utils.container, "toggle-btn"));
      });
      waitFor(() =>
        expect(screen.findByText(/User Registration/i)).toBeInTheDocument()
      );
      await waitFor(() => {
        fireEvent.click(getById(utils.container, "toggle-btn"));
      });
      waitFor(() =>
        expect(screen.findByText(/User Registration/i)).not.toBeInTheDocument()
      );
    }
  );
});
