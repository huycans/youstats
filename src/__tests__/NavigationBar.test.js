import React from "react";
import renderer from "react-test-renderer";
import NavigationBar from "../components/NavigationBar";

import { render, cleanup, fireEvent } from "@testing-library/react";

//module react-google-login is being mocked using jest

const signedin = true;
const handleSignout = jest.fn();
describe("<NavigationBar />", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <NavigationBar signedin={signedin} handleSignout={handleSignout} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render the logo", () => {
    const { queryByTestId } = render(
      <NavigationBar signedin={signedin} handleSignout={handleSignout} />
    );
    expect(queryByTestId("navbar-brand-img")).toBeTruthy();
  });

  it("does not render the logout btn when not signed in", () => {
    const { queryByTestId } = render(
      <NavigationBar signedin={false} handleSignout={handleSignout} />
    );
    expect(queryByTestId("navbar-item-logout-btn")).toBeFalsy();
  });

  it("render the logout btn when signed in", () => {
    const { queryByTestId } = render(
      <NavigationBar signedin={signedin} handleSignout={handleSignout} />
    );
    expect(queryByTestId("navbar-item-logout-btn")).toBeTruthy();
    expect(queryByTestId("navbar-item-logout-btn")).toHaveTextContent(
      "Sign out"
    );
  });
});
