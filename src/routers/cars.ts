import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { authenticateJWT } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createCarSchemaZod}  from '../models/cars';
import {updateCarSchemaZod}  from '../models/cars';
import {carParamsSchema}  from '../models/cars';

const router = Router();
const carController = new CarController();

router.get('/', carController.getCars);

router.get('/:id', validate(carParamsSchema),carController.getCarById);
// Routes that change data need a valid JWT: Authorization: Bearer <token>
router.post('/', authenticateJWT, validate(createCarSchemaZod), carController.createCar);
router.put('/:id', authenticateJWT, validate(carParamsSchema), validate(updateCarSchemaZod), carController.updateCar);
router.delete('/:id', authenticateJWT, validate(carParamsSchema), carController.deleteCar);

export default router;
