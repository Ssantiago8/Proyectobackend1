import { createProducto, deleteProducto, getProducto, patchProducto } from './producto.controller';
import { Router } from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/', getProducto);

// Endpoint POST /prueba
router.post('/', createProducto);

// Endpoint PATCH /prueba
router.patch('/', patchProducto);

// Endpoint DELETE /prueba
router.delete('/', deleteProducto);

export default router;
