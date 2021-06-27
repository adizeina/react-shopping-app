// Node express and MongoDB server 

const express = require("express");  //web server  
const mongoose = require("mongoose");  //this connects to MongoDB database
const shortid = require("shortid"); //tgus is a librairy that will create a user id for the cart items --> checkout

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,

});

const Product = mongoose.model("products", new mongoose.Schema({
    _id : {type: String,  default: shortid.generate},
    title: String, 
    description: String, 
    image: String, 
    price: Number, 
    availableSizes: [String], 
    
    })
);

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});  //this is to return all products ==> has no condition
    res.send(products);
});


app.post("/api/products", async(req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);

});

app.delete("/api/products/:id", async(req, res)=>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));