import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getUserByUsername } from '../models/userModel';

export const showLogin = (req: Request, res: Response) => {
  if (req.session.userId) return res.redirect('/users');
  res.render('auth/login', { title: 'Login', error: null });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'Username atau password salah',
    });
  }

  req.session.userId = user.id;
  res.redirect('/users');
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};
