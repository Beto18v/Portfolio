const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  getAllWallpapers,
  getWallpaperById,
  createWallpaper,
  getWallpapersByCategory,
  searchWallpapers,
} = require("../controllers/wallpapers");

// Rutas públicas
router.get("/", getAllWallpapers);
router.get("/search", searchWallpapers);
router.get("/:id", getWallpaperById);
router.get("/category/:category", getWallpapersByCategory);

// Rutas protegidas (solo admin)
router.post("/", auth, adminAuth, upload.single("image"), createWallpaper);

module.exports = router;
