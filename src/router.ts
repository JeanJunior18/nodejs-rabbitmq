import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({ message: 'Hello world With Docker Change' });
});

export default router;
