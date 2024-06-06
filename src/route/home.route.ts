import { NextFunction, Router, Request,Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const homeRouter = Router();
homeRouter.get('/clientes',(req: Request, res: Response,next: NextFunction) =>{
   const clientes = [{username: 'Paulo'}];
   res.status(StatusCodes.OK).send(clientes);
});

   homeRouter.post('/clientes',(req: Request, res: Response,next: NextFunction) =>{
      const newhome = req.body;
      res.status(StatusCodes.CREATED).send({newhome});
});
export default homeRouter;