jest.useFakeTimers()
import App from "./apptest";
import request from "supertest";
const app = new App().app

describe('GET /video', ()=> {
  it('Should be response 200', async ()=> {
    await request(app)
      .get('/video')
      .expect(200);
  });
});