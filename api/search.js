const axios = require("axios");

module.exports = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing query (?q=...)" });
  }

  try {
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      query
    )}&lang=en&limit=10&apiKey=54e53471365d4fcebd6ee9aceb7259a9`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.features && data.features.length > 0) {
      const results = data.features.map((item) => ({
        address: item.properties.formatted,
        lat: item.properties.lat,
        lon: item.properties.lon,
      }));

      res.status(200).json({ count: results.length, results });
    } else {
      res.status(200).json({ count: 0, results: [], message: "No places found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Geoapify API failed",
      message: err.response?.data?.message || err.message,
    });
  }
};
