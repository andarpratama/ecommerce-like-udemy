jest.useFakeTimers()
import App from "./apptest";
import request from "supertest";
const app = new App().app

describe('GET /auth', function() {
  it('Should be response 200', ()=> {
    request(app)
      .get('/auth')
      .expect(200);
  });
});