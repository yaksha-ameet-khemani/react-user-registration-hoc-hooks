import { shallow } from "enzyme";
import App from "src/App";

describe("boundary", () => {
  test("AppTest boundary should mount App without crashing", () => {
    const component = shallow(<App />);
    expect(component.getElements()).toMatchSnapshot();
    component.unmount();
  });
});
