import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response)=>{

    const query = `
        SELECT *
        FROM heroes
    `;

    MySQL.ejecutarQuery(query, (err: any, data: Object[]) => {

        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data
        });

    });
});


router.get('/heroes/:id', (req: Request, res: Response)=>{

    let id = req.params.id;

    let escapeId = MySQL.instance.cnn.escape(id);

    const query = `
        SELECT *
        FROM heroes
        WHERE id=${ escapeId }
    `;

    MySQL.ejecutarQuery(query, (err:any, data: Object[]) => {

        if(err){
            return res.status(404).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            data
        });

    });

});


export default router;