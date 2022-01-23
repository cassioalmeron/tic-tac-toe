import { Router } from 'express';
import GameController from './controllers/GameController';

const router = Router();

router.get('/room/players', GameController.players);
router.post('/room/join', GameController.join);
router.post('/room/start', GameController.start);
router.post('/room/play', GameController.play);
// router.get('/game/matrix', GameController.matrix);

export default router;
