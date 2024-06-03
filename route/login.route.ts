import { NextFunction, Router, Request,Response } from 'express';
import { StatusCodes } from 'http-status-codes';


const loginRouter = Router();
loginRouter.get('/clientes',(req: Request, res: Response,next: NextFunction) =>{
   const clientes = [{username: 'Paulo'}];
   res.status(200).send(clientes);
});

   loginRouter.get('/clientes/:uuid',(req: Request, res: Response,next: NextFunction) =>{
    const uuid = req.params.uuid;
   res.status(StatusCodes.OK).send({uuid});
   });

   loginRouter.post('/clientes',(req: Request, res: Response,next: NextFunction) =>{
    const newlogin = req.body;
    res.status(StatusCodes.CREATED).send({newlogin});
});

export default loginRouter;