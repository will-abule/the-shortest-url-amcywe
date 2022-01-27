import { port, server } from "../index";
import request from "supertest";
import { saveDataToAFile, getSavedData } from "../db";
import { generateCode } from "../routes/path/encode-route";

describe("/", () => {
  beforeAll(async () => {
    saveDataToAFile(
      [
        {
          url: "https://codesubmit.io/library/react-3",
          shortUrl: "http://short.est/222222",
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

  describe("POST /encode", () => {
    it("should encode url and return 200", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ url: "https://codesubmit.io/library/react-1" });

      expect(res.status).toBe(200);
    });

    it("should alert user 'Url already encoded!' and return 200", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ url: "https://codesubmit.io/library/react-3" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Url already encoded!");
    });

    it("testing if file saving failed", async () => {
      const res = await request(server).post("/encode").send({
        url: "https://codesubmit.io/library/react-app",
        testFailToSaveFile: true,
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe(
        "unable to process your request kindly try again!"
      );
    });

    it("should try code twice", async () => {
      const data = generateCode(
        getSavedData(),
        "https://codesubmit.io/library/react-4",
        "222222"
      );

      expect(data.url).toBe("https://codesubmit.io/library/react-4");
    });

    it("should not encode url and return 400", async () => {
      const res = await request(server).post("/encode").send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("url is needed in the request body");
    });

    it("Testing Catch", async () => {
      const res = await request(server).post("/encode").send({ test: true });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal Server Error!");
    });

    it("Testing Catch", async () => {
      const res = await request(server)
        .post("/encode")
        .send({ test: true, testFailToSaveFile: true });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal Server Error!");
    });
  });
});
