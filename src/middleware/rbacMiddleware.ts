import { Request, Response, NextFunction } from 'express';

/**
 * Middleware RBAC: cek apakah user memiliki permission yang dibutuhkan.
 * Alur:
 * 1. req.user sudah diisi oleh requireAuth middleware
 * 2. Cek apakah requiredPermission ada di daftar permissions user
 * 3. Jika ada -> lanjut (next()), jika tidak -> 403 Forbidden
 */
export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).redirect('/auth/login');

    if (req.user.permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).render('error', {
        title: 'Akses Ditolak',
        message: `Anda tidak memiliki izin untuk melakukan aksi ini. Permission dibutuhkan: "${requiredPermission}"`,
        user: req.user,
      });
    }
  };
};
