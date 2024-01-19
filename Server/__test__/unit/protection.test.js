const {
  ensureAuthenticated,
  adminOnly,
} = require("../../middleware/authMiddleware/protectionMiddleware");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "testSecret";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe("ensureAuthenticated Middleware", () => {
  let req;
  let res;
  let next;
  let mockToken;

  beforeEach(() => {
    mockToken = jwt.sign({ userId: "validUserId" }, JWT_SECRET);
    req = {
      cookies: {
        access_token: mockToken,
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should attach the user to the request object for a valid token", async () => {
    const verifiedUser = { userId: "validUserId" };
    jwt.verify.mockReturnValueOnce(verifiedUser);

    await ensureAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if the token is invalid", async () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error();
    });
    await ensureAuthenticated(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  describe("adminOnly Middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = {
        user: {
          isAdmin: true,
        },
      };
      res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call next if the user is an admin", () => {
      adminOnly(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it("should return 401 if the user is not an admin", () => {
      req.user.isAdmin = false;
      adminOnly(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "You are not authorized",
      });
    });
  });
});
