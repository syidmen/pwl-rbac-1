import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/auth/login');

  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, username, role_id FROM users WHERE id = ?',
    [userId]
  );
  if (rows.length === 0) return res.redirect('/auth/login');

  // Ambil semua permission user berdasarkan role-nya
  const [permRows] = await pool.query<RowDataPacket[]>(
    `SELECT p.name FROM users u
     JOIN roles r ON u.role_id = r.id
     JOIN role_permissions rp ON r.id = rp.role_id
     JOIN permissions p ON rp.permission_id = p.id
     WHERE u.id = ?`,
    [userId]
  );

  req.user = {
    id: rows[0].id,
    role_id: rows[0].role_id,
    username: rows[0].username,
    permissions: permRows.map((p: RowDataPacket) => p.name),
  };
  next();
};
