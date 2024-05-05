import express from 'express';
import { Request, Response } from 'express';
import { Accessory } from '../model';


const router = express.Router();

router.get('/',async (req: Request, res: Response) => {
    const { current = 1, pageSize = 20, name, brand, category } = req.query
    const data = await Accessory.find({
        ...(name && {name} ),
        ...(brand && {brand} ),
        ...(category && {category} )
    })
        .skip((Number(current)-1) * Number(pageSize))
        .populate('category')
        .limit(Number(pageSize))
    const total = await Accessory.countDocuments(
        {
            ...(name && {name} ),
            ...(brand && {brand} ),
            ...(category && {category} )
        }
    ) 
    return res.status(200).json({ data, total });
});

router.post('/', (req:Request,res:Response) => {
    const body = req.body
    const accessoryModel = new Accessory({ ...body })
    accessoryModel.save()
    return res.json({ success: true, code: 200 })
})

router.delete('/:id', async (req:Request,res:Response)=>{
    const {id} = req.params
    await Accessory.findByIdAndDelete(id);
    return res.status(200).json({ success:true })
});

router.get('/:id', async(req: Request, res: Response)=>{
    const {id} = req.params;
    const accessory = await Accessory.findById(id).populate('category');
    if(accessory) {
        res.status(200).json({ data: accessory, success: true })
    }else {
        res.status(500).json({message:'This accessory does not exist'})
    }
})

router.put('/:id', async (req:Request, res:Response) => {
    const body = req.body
    const {id} = req.params
    await Accessory.findOneAndUpdate({_id: id}, body);
    return res.status(200).json({success: true})
})

export default router