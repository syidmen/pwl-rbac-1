import { Request, Response } from 'express';
import {
  getAllPermissions,
  createPermission,
  deletePermission,
  assignPermissionToRole,
} from '../models/permissionModel';
import { getAllRoles } from '../models/roleModel';

export const listPermissions = async (req: Request, res: Response) => {
  const permissions = await getAllPermissions();
  res.render('layouts/main', {
    title: 'Manajemen Permission',
    body: '../permissions/list',
    permissions,
    user: req.user,
  });
};

export const showCreatePermission = (req: Request, res: Response) => {
  res.render('layouts/main', {
    title: 'Tambah Permission',
    body: '../permissions/create',
    user: req.user,
    error: null,
  });
};

export const storePermission = async (req: Request, res: Response) => {
  await createPermission(req.body);
  res.redirect('/permissions');
};

export const removePermission = async (req: Request, res: Response) => {
  await deletePermission(parseInt(req.params.id));
  res.redirect('/permissions');
};

export const showAssignPermission = async (req: Request, res: Response) => {
  const [roles, permissions] = await Promise.all([getAllRoles(), getAllPermissions()]);
  res.render('layouts/main', {
    title: 'Assign Permission ke Role',
    body: '../permissions/assign',
    roles,
    permissions,
    user: req.user,
    success: req.query.success === '1',
  });
};

export const assignPermission = async (req: Request, res: Response) => {
  const { role_id, permission_id } = req.body;
  await assignPermissionToRole(parseInt(role_id), parseInt(permission_id));
  res.redirect('/permissions/assign?success=1');
};
