const Recipes=require("../models/recipe.js")
const multer  = require('multer')
const mongoose = require('mongoose');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname
      cb(null, filename)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

const getRecipes=async(req,res)=>{
    const recipes=await Recipes.find()
    return res.json(recipes)
}


const getRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        console.log("Received ID:", recipeId); // Log the received ID

        // Convert the string ID into a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(recipeId)) {
            return res.status(400).json({ message: "Invalid recipe ID format" });
        }

        const recipe = await Recipes.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

  

const addRecipe = async (req, res) => {
    try {
        const {title, ingredients, instructions, time} = req.body;

        // Validate required fields
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({
                message: "Required fields can't be empty"
            });
        }

        const coverImage = req.file ? req.file.filename : null;

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage,
            createdBy: req.user.id
        });

        return res.status(201).json(newRecipe);

    } catch (error) {
        return res.status(500).json({
            message: "Error creating recipe"
        });
    }
};


const editRecipe = async (req, res) => {
    const updateFields = {
        ...req.body,
        coverImage: req.file?.filename || recipe.coverImage,
    };

    try {
        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: "Failed to update recipe" });
    }
};

const deleteRecipe=async(req,res)=>{
    try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}