import { Request } from 'express';

interface IUserAuthorize extends Request {
    userTokenID?: string;
}

export { IUserAuthorize };
