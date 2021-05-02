jest.useFakeTimers()
import App from "./apptest";
import request from "supertest";
const app = new App().app

describe('GET /cart', ()=> {
  it('Should be response 200', async ()=> {
    await request(app)
      .get('/cart')
      .expect(200);
  });
});