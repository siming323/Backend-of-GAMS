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
exports.Category = exports.Accessory = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const accessoryModel_1 = __importDefault(require("./accessoryModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
const uri = "mongodb+srv://siming:Zx20010323@cluster0.qtylkq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(uri);
    });
}
main()
    .then(() => {
    console.log('MongoDB Connected');
}).catch((err) => {
    console.log(err);
});
const User = mongoose_1.default.model('User', userModel_1.default);
exports.User = User;
const Accessory = mongoose_1.default.model('Accessory', accessoryModel_1.default);
exports.Accessory = Accessory;
const Category = mongoose_1.default.model('Category', categoryModel_1.default);
exports.Category = Category;
