import React from "react";
import renderer from "react-test-renderer";
import ChannelSearch from "../components/ChannelSearch";
import { Provider } from "react-redux";
import store from "../components/store";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { youtubeAPI } from "../components/API/youtube";

jest.mock("../components/API/youtube");

jest.mock("../components/utils.js", () => {
  return {
    useDebounce: (text) => {
      return text;
    }
  };
});

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

  it("renders two dummy items after user type on the input element", async () => {
    const { queryByTestId, findAllByTestId } = render(<WrappedChannelSearch />);
    const input = queryByTestId("channel-search-input");
    fireEvent.change(input, "random text");
    // await new Promise(setImmediate);
    let searchResults = await findAllByTestId("channel-result-items");
    expect(searchResults.length).toBe(2);
  });
});
