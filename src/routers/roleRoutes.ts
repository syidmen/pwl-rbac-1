import { Router } from 'express';
import { listRoles, showCreateRole, storeRole, removeRole } from '../controllers/roleController';
import { checkPermission } from '../middleware/rbacMiddleware';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);

router.get('/', checkPermission('role:view'), listRoles);
router.get('/create', checkPermission('role:create'), showCreateRole);
router.post('/', checkPermission('role:create'), storeRole);
router.post('/:id/delete', checkPermission('role:delete'), removeRole);

export default router;
