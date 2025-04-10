// src/middlewares/handleValidation.ts
import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';

export const handleValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    await check('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('price').isNumeric().withMessage('Valor no válido').notEmpty().withMessage('El precio es obligatorio').custom(value => value > 0).withMessage('El precio no es válido').run(req);
    await check('availability').isBoolean().withMessage('Valor para disponibilidad no valido').run(req);

    next();
};