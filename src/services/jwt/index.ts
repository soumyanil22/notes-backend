import Jwt from 'jsonwebtoken';

const createToken = (id: string) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '2h',
  });
};

const createRefreshToken = (id: string) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '2d',
  });
};

const verifyToken = (token: string) => {
  return Jwt.verify(token, process.env.JWT_SECRET as string);
};

export { createToken, createRefreshToken, verifyToken };
