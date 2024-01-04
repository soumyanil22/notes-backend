import { Router } from 'express';
import { createUser, getUserByEmail } from '../../services/user';
import { sendResponse } from '../../utils';
import { createToken, createRefreshToken } from '../../services/jwt';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      sendResponse(res, 400, 'All fields are required!');
    }

    const user = await getUserByEmail(email);

    if (!user) {
      sendResponse(res, 401, 'Invalid credentials!');
    }

    const token = createToken(user?.id);
    const refreshToken = createRefreshToken(user?.id);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    sendResponse<string>(res, 200, 'Login successful!', token);
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      sendResponse(res, 400, 'All fields are required!');
    }

    const user = await createUser(name, email, password);

    sendResponse<string>(res, 200, 'Account created successfully!');
  } catch (error: any) {
    sendResponse(res, 500, error.message);
  }
});

export default router;
