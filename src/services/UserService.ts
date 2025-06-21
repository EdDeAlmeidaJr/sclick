import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUserDoc } from '@src/models/User.mongo';
import bcrypt from 'bcryptjs';

/******************************************************************************
                                Constants
******************************************************************************/

export const USER_NOT_FOUND_ERR = 'User not found';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all users (sem senha).
 */
async function getAll(): Promise<Omit<IUserDoc, 'password'>[]> {
  const users = await UserRepo.getAll();
  // Remove o campo password de cada usuário
  return users.map(u => {
    const userObj = u.toObject ? u.toObject() : u;
    const { password, ...rest } = userObj;
    return rest;
  });
}

/**
 * Add one user (criptografa a senha).
 */
async function addOne(user: Partial<IUserDoc>): Promise<void> {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  await UserRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IUserDoc): Promise<void> {
  const persists = await UserRepo.persists(String(user._id));
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: string): Promise<void> {
  const persists = await UserRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  return UserRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
} as const;