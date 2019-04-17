import validateLoginForm from "../../utils/validation";

describe("Blank email validation", () => {
  it("validates whether the user actually added an email address", () => {
    expect(validateLoginForm("", "")).toEqual([
      "email",
      "Please provide an email address!"
    ]);
  });
});

describe("Blank password validation", () => {
  it("validates whether the user actually added a password", () => {
    expect(validateLoginForm("test@email.com", "")).toEqual([
      "password",
      "Please provide your password"
    ]);
  });
});

describe("Properly filled login form", () => {
  it("shoud return an empty array, indicating no errors in validation", () => {
    expect(validateLoginForm("test@email.com", "password")).toEqual([]);
  });
});
