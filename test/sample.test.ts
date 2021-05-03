jest.useFakeTimers()
import request from "supertest";
import mongoose from "mongoose";
import App from "../src/server";
const app = new App().app


describe('GET /user', function() {
  it('responds with json', function() {
    request(app)
      .get('/')
      .expect(200);
  });
});