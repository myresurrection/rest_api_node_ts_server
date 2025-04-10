import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleValidation } from './middleware/handleValidation'
import { handleInputerrors } from './middleware/handleInputErrors';
import { param } from 'express-validator';

const router = Router();
// Routing

router.get('/', getProducts)
router.get('/:id',

    param('id').isInt().withMessage('ID no válido'),
    handleInputerrors,
    getProductById)

router.post('/', handleValidation, handleInputerrors, createProduct)

router.put('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleValidation, handleInputerrors, updateProduct)

router.patch('/:id', 
    
    param('id').isInt().withMessage('ID no Válido')
    , handleInputerrors, updateAvailability)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputerrors,
    deleteProduct


)


export default router