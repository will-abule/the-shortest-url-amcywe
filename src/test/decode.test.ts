import { port, server } from "../index";
import request from "supertest";
import { saveDataToAFile } from "../db";

describe("/decode", () => {
  beforeAll(async () => {
    saveDataToAFile(
      [
        {
          url: "https://codesubmit.io/library/react",
          shortUrl: "http://short.est/HX6LTf",
        },
      ],
      () => {}
    );
  });

  afterAll(async () => {
    saveDataToAFile([], () => {});
    jest.clearAllTimers();
  });

  beforeEach(async () => {
    jest.setTimeout(40000);

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

  describe("GET /decode", () => {
    it("should decode url and return 200", async () => {
      const res = await request(server).get("/decode").query({
        shortUrl: "http://short.est/HX6LTf",
      });

      expect(res.status).toBe(200);
      expect(res.body.data).toBe("https://codesubmit.io/library/react");
    });

    it("should not decode url and return 400", async () => {
      const res = await request(server).get("/decode");

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("shortUrl is needed in as query params");
    });

    it("should not decode url and return 404", async () => {
      const res = await request(server).get("/decode").query({
        shortUrl: "http://short.est/111111",
      });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("unable to decode http://short.est/111111");
    });

    it("Testing Catch", async () => {
      const res = await request(server).get("/decode").send({ test: true });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal Server Error!");
    });

    it("Testing Catch", async () => {
      const res = await request(server)
        .get("/decode")
        .send({ test: true, testFailToSaveFile: true });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal Server Error!");
    });
  });
});
