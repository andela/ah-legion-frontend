import * as jwt from "jsonwebtoken";

import { Authenticate } from "../../utils/tokenValidator";

describe("Authenticate function", () => {
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  it("Should not authenticate an invalid token", () => {
    const data = Authenticate("asdfsdfsidfasd");
    expect(data).toEqual(false);
  });
  it("Should authenticate a valid token", () => {
    const dummy_object = { example: "object" };
    const token = jwt.sign(dummy_object, SECRET_KEY, { expiresIn: 60 * 60 });
    const data = Authenticate(token, SECRET_KEY);
    expect(data).toHaveProperty("example", "object");
  });
  it("Should not authenticate an expired token", () => {
    const expiredObject = {
      expired: "object",
      iat: Math.floor(Date.now() / 1000) - 30
    };
    const expiredToken = jwt.sign(expiredObject, SECRET_KEY);
    const data = Authenticate(expiredToken);
    expect(data).toEqual(false);
  });
});
