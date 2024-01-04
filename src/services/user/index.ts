import UserModel, { User } from '../../models/userModel';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @description - This function is used to fetch a user by id from the database.
 * @param id - the id of the user to fetch.
 * @returns {Promise<User | null>} - a promise that resolves to the user object or null if the user is not found.
 * @throws {Error} - throws an error if the user is not found.
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * @description - This function is used to fetch a user by email from the database.
 * @param email - the email of the user to fetch.
 * @returns {Promise<User | null>} - a promise that resolves to the user object or null if the user is not found.
 * @throws {Error} - throws an error if the user is not found.
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * @description - This function is used to create a new user in the database.
 * @param name - the name of the user to create.
 * @param email - the email of the user to create.
 * @param password - the password of the user to create. This is hashed before being stored in the database.
 * @returns {Promise<User | null>} - a promise that resolves to the user object or null if the user is not found.
 * @throws {Error} - throws an error if the user is not found.
 */
export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hash });
    await user.save();
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * @description - This function is used to validate a password. It takes a password and a hash and compares them.
 * @param password - the password to be validated.
 * @param hash - the hash stored in the database.
 * @returns {Promise<boolean>} - a promise that resolves to true if the password is valid, false otherwise.
 * @throws {Error} - throws an error if the comparison fails.
 */
export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const valid = await bcrypt.compare(password, hash);
    return valid;
  } catch (error: any) {
    throw new Error(error);
  }
};
