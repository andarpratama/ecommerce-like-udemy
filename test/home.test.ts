jest.useFakeTimers()
import App from "./apptest";
import request from "supertest";
const app = new App().app

describe('POST /users', ()=> {
  it('responds with json', async () => {
     await request(app).get('/')
     .expect(200)
  });
});

it('Sholud 1 + 1 equal 2', () => {
   let total = 1 + 1
   expect(total).toBe(2)
})