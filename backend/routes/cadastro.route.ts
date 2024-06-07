import { NextFunction, Router, Request,Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const cadastroRouter = Router();
cadastroRouter.get('/clientes',(req: Request, res: Response,next: NextFunction) =>{
   const clientes = [{username: 'Paulo'}];
   res.status(200).send(clientes);
});

   cadastroRouter.get('/clientes/:uuid',(req: Request, res: Response,next: NextFunction) =>{
    const uuid = req.params.uuid;
   res.status(StatusCodes.OK).send({uuid});
   });

   cadastroRouter.post('/clientes',(req: Request, res: Response,next: NextFunction) =>{
    const newcadastro = req.body;
    res.status(StatusCodes.CREATED).send({newcadastro});
   });

    cadastroRouter.put('/clientes/:uuid',(req: Request, res: Response,next: NextFunction) =>{
        const uuid = req.params.uuid;
        res.status(StatusCodes.OK).send({uuid});
   });
    cadastroRouter.delete('/clientes/:uuid',(req: Request, res: Response,next: NextFunction) =>{
        const uuid = req.params.uuid;
        res.status(StatusCodes.OK).send({uuid});
   });
 export default cadastroRouter;