import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleValidation } from './middleware/handleValidation'
import { handleInputerrors } from './middleware/handleInputErrors';
import { param } from 'express-validator';

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price: 
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 * 
 *                  availability: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *               - Products
 *          description: Return a list of products
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content: 
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Product'
 */             


router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by  id
 *      tags:
 *          - Products
 *      desription: Return a products based on its unique ID
 *      parameters: 
 *        - in: path         
 *          name: id
 *          description: The ID of the product to retrive
 *          required: true
 *          schema: 
 *              type: integer
 * 
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:  
 *                          $ref: '#/components/schemas/Product'
 *          404: 
 *              description: Not Found
 *      
 *          400:    
 *              description: Bad Request - Invalid ID
 * 
 */


router.get('/:id',

    param('id').isInt().withMessage('ID no válido'),
    handleInputerrors,
    getProductById)
/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *            - Products
 *          descriptions: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  example: "Monitor Curvo"
 *                              price:
 *                                   type: number
 *                                   example: 300
 *                              availability:
 *                                   type: boolean
 *                                   example: true
 * 
 *          responses:
 *               201:       
 *                  description: Product creates successfully
 * 
 *               400:
 *                  description: Bad Request Data
 * 
 * 
 * 
 * 
 */



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