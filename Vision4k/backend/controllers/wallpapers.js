const Wallpaper = require("../models/Wallpaper");
const path = require("path");

const getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.getAll();
    res.json(wallpapers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getWallpaperById = async (req, res) => {
  try {
    const wallpaper = await Wallpaper.getById(req.params.id);
    if (!wallpaper) {
      return res.status(404).json({ message: "Wallpaper not found" });
    }

    const relatedWallpapers = await Wallpaper.getRelated(
      wallpaper.category,
      wallpaper.id
    );

    res.json({
      wallpaper,
      relatedWallpapers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createWallpaper = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const url = `/uploads/${req.file.filename}`;

    const newWallpaper = await Wallpaper.create({
      title,
      description,
      category,
      url,
    });

    res.status(201).json(newWallpaper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getWallpapersByCategory = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.getByCategory(req.params.category);
    res.json(wallpapers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const searchWallpapers = async (req, res) => {
  try {
    const wallpapers = await Wallpaper.search(req.query.q);
    res.json(wallpapers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllWallpapers,
  getWallpaperById,
  createWallpaper,
  getWallpapersByCategory,
  searchWallpapers,
};
