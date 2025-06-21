import { IUser } from './User';

export type IUserUpdate = Omit<IUser, 'id'> & { _id: string };
