import React from "react";
import renderer from "react-test-renderer";
import ChannelSearch from "../components/ChannelSearch";
import { Provider } from "react-redux";
import store from "../components/store";
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

describe("<NavigationBar />", () => {
  let WrappedChannelSearch;
  beforeEach(() => {
    WrappedChannelSearch = () => (
      <Provider store={store}>
        <ChannelSearch />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<WrappedChannelSearch />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the input element", () => {
    const { queryByTestId } = render(<WrappedChannelSearch />);

    expect(queryByTestId("channel-search-input")).toBeTruthy();
  });

  it("renders two dummy search result after user types on the input element", async () => {
    const { queryByTestId, findAllByTestId } = render(<WrappedChannelSearch />);
    const input = queryByTestId("channel-search-input");
    await userEvent.type(input, "random text", { delay: 100 });

    let searchResults = await findAllByTestId("channel-result-items");
    expect(searchResults.length).toBe(2);
  });
});
