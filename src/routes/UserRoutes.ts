import { isNumber } from 'jet-validators';
import { transform } from 'jet-validators/utils';

import { IUserUpdate } from '@src/models/User.types';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import UserService from '@src/services/UserService';
import User from '@src/models/User';

import { createUserSchema, updateUserSchema } from '@src/models/User';

import { isString } from 'jet-validators';
import { IReq, IRes } from './common/types';
import { parseReq } from './common/util';


/******************************************************************************
                                Constants
******************************************************************************/

const Validators = {
  add: parseReq({ user: createUserSchema }),
  update: parseReq({ user: updateUserSchema }),
  delete: parseReq({ id: isString }),
} as const;


/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const users = await UserService.getAll();
  res.status(HttpStatusCodes.OK).json({ users });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: IRes) {
  const { user } = Validators.add(req.body);
  await UserService.addOne(user);
  res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: IRes) {
  const { user } = Validators.update(req.body);
  const userDoc: IUserUpdate = { ...user, _id: String(user._id) };
  await UserService.updateOne(userDoc as any);
  res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function delete_(req: IReq, res: IRes) {
  const { id } = Validators.delete(req.params);
  await UserService.delete(id);
  res.status(HttpStatusCodes.OK).end();
}


/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
