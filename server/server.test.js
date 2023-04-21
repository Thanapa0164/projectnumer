const request = require("supertest");
const app = require("./index.js");
const jwt = require("jsonwebtoken");

const secretKeys = "cream";

describe("GET /gettoken/:name", () => {
  test("should return a JWT token", async () => {
    const res = await request(app).get("/gettoken/cream").expect(200);
    console.log(res.text);
    const decoded = jwt.verify(res.text, secretKeys);
    expect(decoded.user).toBe("cream");
  });
});

// test("Querry", async () => {
//     const response = await request(app).get("/equation");
//     expect(response.statusCode).toBe(200);
//     expect(response.text).toBe(
//         '[{\"id\":1,\"alldata\":\"{\\\"numgen\\\":8,\\\"x\\\":[10,20,30,40,50,60,70,80],\\\"y\\\":[5,9,15,18,22,30,35,38]}\",\"num\":8},{\"id\":2,\"alldata\":\"{\\\"numgen\\\":3,\\\"x\\\":[1,2,3],\\\"y\\\":[1,2,3]}\",\"num\":3},{\"id\":3,\"alldata\":\"{\\\"numgen\\\":9,\\\"x\\\":[1,2,3,4,5,6,7,8,9],\\\"y\\\":[1,2,3,4,5,6,7,8,9]}\",\"num\":9}]'
//     );
//   });