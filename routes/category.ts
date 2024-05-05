import express from 'express';
import { Request, Response } from 'express';
import { Accessory, Category } from '../model';


const router = express.Router();

router.get('/',async (req: Request, res: Response) => {
    const { current = 1, pageSize = 20, name, level } = req.query
    const data = await Category.find({
        ...(name && {name} ),
        ...(level && {level} ),
    })
        .skip((Number(current)-1) * Number(pageSize))
        .populate('parent')
        .limit(Number(pageSize))
    const total = await Category.countDocuments(
        {
            ...(name && {name} ),
            ...(level && {level} ),
        }
    ) 
    return res.status(200).json({ data, total });
});

router.post('/', async (req:Request,res:Response) => {
    const {name} = req.body;
    const oldCategory = await Category.findOne({ name })
    if(oldCategory) {
        return res.status(500).json({message: 'This category exists'})
    }else {
        const categoryModel = new Category({ ...req.body })
        await categoryModel.save()
        return res.json({ success: true, code: 200 })
    }
})

router.delete('/:id', async (req:Request,res:Response)=>{
    const {id} = req.params
    await Category.findByIdAndDelete(id);
    return res.status(200).json({ success:true })
});

router.get('/:id', async(req: Request, res: Response)=>{
    const {id} = req.params;
    const category = await Category.findById(id)
    if(category) {
        res.status(200).json({ data: category, success: true })
    }else {
        res.status(500).json({message:'This category does not exist'})
    }
})

router.put('/:id', async (req:Request, res:Response) => {
    const body = req.body
    const {id} = req.params
    await Category.findOneAndUpdate({_id: id}, body);
    return res.status(200).json({success: true})
})

export default router