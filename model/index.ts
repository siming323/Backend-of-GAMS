import mongoose from "mongoose";
import userSchema from "./userModel";
import accessorySchema from "./accessoryModel";
import categorySchema from "./categoryModel";
const uri = "mongodb+srv://siming:Zx20010323@cluster0.qtylkq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main () {
    mongoose.connect(uri)
}

main()
    .then(() => {
        console.log('MongoDB Connected')
    }).catch((err) => {
        console.log(err)
    });

    const User = mongoose.model('User', userSchema)
    const Accessory = mongoose.model('Accessory', accessorySchema)
    const Category = mongoose.model('Category', categorySchema)
    //const Borrow = mongoose.model('Borrow', borrowSchema);
    export { User, Accessory, Category }
