import { Request, Response } from 'express';
import { getAllRoles, createRole, deleteRole } from '../models/roleModel';

export const listRoles = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'Manajemen Role',
    body: '../roles/list',
    roles,
    user: req.user,
  });
};

export const showCreateRole = (req: Request, res: Response) => {
  res.render('layouts/main', {
    title: 'Tambah Role',
    body: '../roles/create',
    user: req.user,
    error: null,
  });
};

export const storeRole = async (req: Request, res: Response) => {
  await createRole(req.body.name);
  res.redirect('/roles');
};

export const removeRole = async (req: Request, res: Response) => {
  await deleteRole(parseInt(req.params.id));
  res.redirect('/roles');
};
