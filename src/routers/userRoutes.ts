import { Router } from 'express';
import { listUsers, showCreateUser, storeUser, removeUser } from '../controllers/userController';
import { checkPermission } from '../middleware/rbacMiddleware';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);

router.get('/', checkPermission('user:view'), listUsers);
router.get('/create', checkPermission('user:create'), showCreateUser);
router.post('/', checkPermission('user:create'), storeUser);
router.post('/:id/delete', checkPermission('user:delete'), removeUser);

export default router;
