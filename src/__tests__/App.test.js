import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../components/store";
import App from "../App";
import { render, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { setupServer } from "msw/node";

import { handlers } from "../mocks/handlers";

//mocking youtubeAPI calls using msw
const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("<App /> integration test", () => {
  let WrappedApp;
  beforeEach(() => {
    WrappedApp = () => (
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<WrappedApp />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render proper channel infomation when user click on a search result", async () => {
    ("channel-search-input");
    const { queryByTestId, findAllByTestId, findByTestId } = render(
      <WrappedApp />
    );
    const input = queryByTestId("channel-search-input");
    await userEvent.type(input, "random text", { delay: 100 });

    let searchResults = await findAllByTestId("channel-result-items");
    await userEvent.click(searchResults[0]);

    //banner exist
    await expect(findByTestId("current-channel-banner")).toBeTruthy();

    //thumbnail exist
    await expect(findByTestId("current-channel-thumbnail")).toBeTruthy();

    //title exist
    await expect(findByTestId("current-channel-title")).toBeTruthy();
  });

  it("should show footer", () => {
    const { getByText, queryAllByTestId } = render(<WrappedApp />);
    expect(getByText("Made by Huy Vuong")).toBeTruthy();
    expect(getByText("You can find me at")).toBeTruthy();

    expect(queryAllByTestId("footer-contact-link").length).toBe(3);
  });
});
