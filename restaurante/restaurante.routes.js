import {
  createRestaurante,
  deleteRestaurante,
  getRestaurante,
  patchRestaurante,
} from './restaurante.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getRestaurante);

// Endpoint POST /prueba
router.post('/', createRestaurante);

// Endpoint PATCH /prueba
router.patch('/', patchRestaurante);

// Endpoint DELETE /prueba
router.delete('/', deleteRestaurante);

export default router;
