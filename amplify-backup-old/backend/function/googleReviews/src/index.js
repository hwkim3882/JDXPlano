const fetch = require("node-fetch");

const API_KEY = "AIzaSyDouuNDIBo3VRO053E-haNdy61_BDiK2gY"; // 본인 키로 교체
const PLACE_ID = "ChIJ5cDjSvMnTIYRUyksVzTGHRQ"; // 본인 Place ID로 교체

exports.handler = async (event) => {
  console.log("API_KEY:", API_KEY);
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=review,rating,user_ratings_total&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Google API response:", JSON.stringify(data, null, 2));

    if (data.result && Array.isArray(data.result.reviews)) {
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data.result.reviews),
      };
    } else {
      return {
        statusCode: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({
          success: false,
          error: "No reviews found or API error",
          googleResponse: data,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
