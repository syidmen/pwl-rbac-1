import { Router } from 'express';
import {
  listPermissions,
  showCreatePermission,
  storePermission,
  removePermission,
  showAssignPermission,
  assignPermission,
} from '../controllers/permissionController';
import { checkPermission } from '../middleware/rbacMiddleware';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);

// PENTING: route statis (/assign, /create) harus didefinisikan sebelum route dinamis (/:id/delete)
router.get('/assign', checkPermission('permission:assign'), showAssignPermission);
router.post('/assign', checkPermission('permission:assign'), assignPermission);
router.get('/create', checkPermission('permission:create'), showCreatePermission);
router.post('/', checkPermission('permission:create'), storePermission);
router.get('/', checkPermission('permission:view'), listPermissions);
router.post('/:id/delete', checkPermission('permission:delete'), removePermission);

export default router;
