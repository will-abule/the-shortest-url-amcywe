import { port, server } from "../index";
import request from "supertest";

describe("/", () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    if (!server.listening) {
      server.listen(port, () =>
        console.info(`TEST - listening on port ${port}`)
      );
    }
  });

  afterEach(async () => {
    if (server.listening) {
      server.close();
    }
  });

  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/");

      expect(res.status).toBe(200);
    });

    it("testing ErrorMiddleware", async () => {
      const res = await request(server).get("/").send({ test: true });

      expect(res.status).toBe(404);
    });
  });
});
