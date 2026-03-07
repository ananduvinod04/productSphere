const Product = require("../models/Product")


//create product
exports.createProduct = async (req,res)=>{

    try{

        const {name,description,price,category} = req.body

        const product = await Product.create({
            name,
            description,
            price,
            category,
            createdBy:req.user.id
        })

        res.status(201).json(product)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}


//get all products
exports.getProducts = async (req,res)=>{

    try{

        const products = await Product.find()
        .populate("createdBy","name")

        res.json(products)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}


//get product by id
exports.getProductById = async (req,res)=>{

    try{

        const product = await Product.findById(req.params.id)
        .populate("createdBy","name")

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        res.json(product)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}


//update product
exports.updateProduct = async (req,res)=>{

    try{

        const {name,description,price,category} = req.body

        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        if(product.createdBy.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized"})
        }

        if(name) product.name = name
        if(description) product.description = description
        if(price !== undefined) product.price = price
        if(category) product.category = category

        await product.save()

        res.json(product)

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}


//delete product
exports.deleteProduct = async (req,res)=>{

    try{

        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({message:"Product not found"})
        }

        if(product.createdBy.toString() !== req.user.id && req.user.role !== "admin"){
            return res.status(403).json({message:"Not authorized"})
        }

        await product.deleteOne()

        res.json({message:"Product removed"})

    }
    catch(error){
        res.status(500).json({message:error.message})
    }

}