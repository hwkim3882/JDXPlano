const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const API_KEY = "AIzaSyDouuNDIBo3VRO053E-haNdy61_BDiK2gY"; // 본인 키로 교체
const PLACE_ID = "ChIJ5cDjSvMnTIYRUyksVzTGHRQ";

router.get("/reviews", async (req, res) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=review,rating,user_ratings_total&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.result.reviews || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
