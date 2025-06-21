import User, { IUserDoc } from '@src/models/User.mongo';

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one user by email.
 */
async function getOne(email: string): Promise<IUserDoc | null> {
  return User.findOne({ email }).exec();
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  return !!(await User.findById(id).exec());
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUserDoc[]> {
  return User.find().exec();
}

/**
 * Add one user.
 */
async function add(user: Partial<IUserDoc>): Promise<void> {
  const newUser = new User(user);
  await newUser.save();
}

/**
 * Update a user.
 */
async function update(user: IUserDoc): Promise<void> {
  await User.findByIdAndUpdate(user._id, user, { new: true }).exec();
}

/**
 * Delete one user.
 */
async function delete_(id: string): Promise<void> {
  await User.findByIdAndDelete(id).exec();
}

// **** Unit-Tests Only **** //

/**
 * Delete every user record.
 */
async function deleteAllUsers(): Promise<void> {
  await User.deleteMany({});
}

/**
 * Insert multiple users.
 */
async function insertMult(
  users: Partial<IUserDoc>[] | readonly Partial<IUserDoc>[],
): Promise<IUserDoc[]> {
  return User.insertMany(users);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAllUsers,
  insertMult,
} as const;