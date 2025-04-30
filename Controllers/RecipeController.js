import Recipe from "../Model/Recipe.js";
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log(recipes);
    if (!recipes) {
      res.status(500).json({ message: "failed to fetch" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(500).json({ message: "failed to fetch" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
  }
};

export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      res.json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipe({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy: req.user.id,
    });
    await newRecipe.save();
    res.status(201).json({ message: "created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipe.findById(req.params.id);

  try {
    if (recipe) {
      let coverImage = req.file?.filename
        ? req.file?.filename
        : recipe.coverImage;
      await Recipe.findByIdAndUpdate(
        req.params.id,
        { ...req.body, coverImage },
        { new: true }
      );
      res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await Recipe.findByIdAndDelete(id);
    if (!del) {
      res.status(404).json("failed to delete");
    }
    res.status(200).json(del);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
