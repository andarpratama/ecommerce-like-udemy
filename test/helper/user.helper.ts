import request from "supertest";
import App from "../../src/server";
import { IUser } from "../../src/interface/IUser";
const app = new App().app

const infoUser = async (userID: string, bearerToken: string) => {
    const userInfo = await request(app)
        .get(`/user/info/${userID}`)
        .set('Authorization', `${bearerToken}`);
    return userInfo;
};

const editUser = async (user: IUser, userID: string, bearerToken: string) => {
    const userEdit = await request(app)
        .put(`/user/edit/${userID}`)
        .set('Authorization', `${bearerToken}`)
        .send(user);
    return userEdit;
};


export { editUser, infoUser };