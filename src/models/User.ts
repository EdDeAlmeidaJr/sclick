import { isString } from 'jet-validators';
import { parseObject, TParseOnError } from 'jet-validators/utils';

import { isRelationalKey, transIsDate } from '@src/common/util/validators';
import { IModel } from './common/types';

/******************************************************************************
                                 Constants
******************************************************************************/

const DEFAULT_USER_VALS = (): IUser => ({
  id: -1,
  name: '',
  created: new Date(),
  email: '',
  password: '',
});

/******************************************************************************
                                  Types
******************************************************************************/

export interface IUser extends IModel {
  id?: number;
  name: string;
  email: string;
  password?: string;
  created?: Date;
}

/******************************************************************************
                                  Setup
******************************************************************************/

// Validador completo (para update, etc)
const parseUser = parseObject<IUser>({
  id: isRelationalKey,
  name: isString,
  email: isString,
  password: isString,
  created: transIsDate,
});

// Validador para criação/cadastro (apenas campos obrigatórios)
export const createUserSchema = {
  name: isString,
  email: isString,
  password: isString,
};

export const updateUserSchema = {
  _id: isString,
  name: isString,
  email: isString,
};

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * New user object.
 */
function __new__(user?: Partial<IUser>): IUser {
  const retVal = { ...DEFAULT_USER_VALS(), ...user };
  return parseUser(retVal, errors => {
    throw new Error('Setup new user failed ' + JSON.stringify(errors, null, 2));
  });
}

/**
 * Check is a user object. For the route validation.
 */
function test(arg: unknown, errCb?: TParseOnError): arg is IUser {
  return !!parseUser(arg, errCb);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  new: __new__,
  test,
};