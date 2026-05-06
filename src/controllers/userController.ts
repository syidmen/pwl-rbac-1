import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { getAllUsers, createUser, deleteUser } from '../models/userModel';
import { getAllRoles } from '../models/roleModel';

export const listUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.render('layouts/main', {
    title: 'Manajemen User',
    body: '../users/list',
    users,
    user: req.user,
  });
};

export const showCreateUser = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'Tambah User',
    body: '../users/create',
    roles,
    user: req.user,
    error: null,
  });
};

export const storeUser = async (req: Request, res: Response) => {
  const { username, password, role_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ username, password: hashedPassword, role_id: parseInt(role_id) });
  res.redirect('/users');
};

export const removeUser = async (req: Request, res: Response) => {
  await deleteUser(parseInt(req.params.id));
  res.redirect('/users');
};
