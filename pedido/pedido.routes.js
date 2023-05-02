import { createPedido, deletePedido, getPedido, patchPedido } from './pedido.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getPedido);

// Endpoint POST /prueba
router.post('/', createPedido);

// Endpoint PATCH /prueba
router.patch('/', patchPedido);

// Endpoint DELETE /prueba
router.delete('/', deletePedido);

export default router;
