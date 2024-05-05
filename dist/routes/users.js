"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../model");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current = 1, pageSize = 20, name, status } = req.query;
    const data = yield model_1.User.find(Object.assign(Object.assign({}, (name && { name })), (status && { status })))
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize));
    const total = yield model_1.User.countDocuments(Object.assign(Object.assign({}, (name && { name })), (status && { status })));
    return res.status(200).json({ data, total });
}));
router.post('/', (req, res) => {
    const body = req.body;
    const userModel = new model_1.User(Object.assign({}, body));
    userModel.save();
    return res.json({ success: true, code: 200 });
});
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield model_1.User.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield model_1.User.findById(id).populate('category');
    if (user) {
        res.status(200).json({ data: user, success: true });
    }
    else {
        res.status(500).json({ message: 'This user does not exist' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { id } = req.params;
    yield model_1.User.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ success: true });
}));
exports.default = router;
