import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup
} from "@testing-library/react";

import {
  describe,
  it,
  expect,
  vi,
  afterEach
} from "vitest";

import {
  MemoryRouter,
  Routes,
  Route
} from "react-router-dom";

import App from "../App";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App", () => {

  it("renders title", () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Scan New GitHub Repository"
      )
    ).toBeTruthy();

  });

  it("updates repository url", () => {

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input =
      screen.getByPlaceholderText(
        "https://github.com/user/repo.git"
      );

    fireEvent.change(input, {
      target: {
        value:
          "https://github.com/test/repo"
      }
    });

    expect(input.value).toBe(
      "https://github.com/test/repo"
    );

  });

  it("calls scan api successfully", async () => {

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            sonarqube: {
              issues: [],
              critical: 0,
              major: 0,
              minor: 0
            }
          })
      })
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input =
      screen.getByPlaceholderText(
        "https://github.com/user/repo.git"
      );

    fireEvent.change(input, {
      target: {
        value:
          "https://github.com/test/repo"
      }
    });

    const scanButton =
      screen.getByRole(
        "button",
        { name: /start scan/i }
      );

    fireEvent.click(scanButton);

    await waitFor(() => {

      expect(global.fetch)
        .toHaveBeenCalled();

    });

  });

  it("handles api error", async () => {

    global.fetch = vi.fn(() =>
      Promise.reject(
        new Error("network error")
      )
    );

    vi.stubGlobal(
      "alert",
      vi.fn()
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const scanButton =
      screen.getByRole(
        "button",
        { name: /start scan/i }
      );

    fireEvent.click(scanButton);

    await waitFor(() => {

      expect(alert)
        .toHaveBeenCalled();

    });

  });

  it("navigates to sonar details", () => {

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes>

          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/sonar-details"
            element={
              <div>
                Sonar Page
              </div>
            }
          />

        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText(
        "View SonarQube Details"
      )
    );

    expect(
      screen.getByText(
        "Sonar Page"
      )
    ).toBeTruthy();

  });

  it("navigates to snyk details", () => {

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes>

          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/snyk-details"
            element={
              <div>
                Snyk Page
              </div>
            }
          />

        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText(
        "View Snyk Details"
      )
    );

    expect(
      screen.getByText(
        "Snyk Page"
      )
    ).toBeTruthy();

  });

  it("navigates to trivy details", () => {

    render(
      <MemoryRouter
        initialEntries={["/"]}
      >
        <Routes>

          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/trivy-details"
            element={
              <div>
                Trivy Page
              </div>
            }
          />

        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText(
        "View Trivy Details"
      )
    );

    expect(
      screen.getByText(
        "Trivy Page"
      )
    ).toBeTruthy();

  });

});
