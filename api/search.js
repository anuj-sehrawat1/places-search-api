const axios = require("axios");

let accessToken = null;
let tokenExpiry = 0;

// Automatically fetches a fresh access token from MapMyIndia
async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const client_id = "96dHZVzsAut86aiXNcbVhoqGQWqfTTrIWqqqlSW_ounY5wwhh21YLVmMohvZ34INGY2wKWCAGHPsX8pxf4gPXA==";
  const client_secret = "lrFxI-iSEg8OW0NGn1P_dnudgaDeETgE-5sdJ7c_8RZJvE4WJ0AXNObDS_7EDxNrXnPaLBygEk-5rOmUCuhcy_ijrIA3yz1S";

  const response = await axios.post(
    "https://outpost.mappls.com/api/security/oauth/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id,
      client_secret,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + 3600 * 1000; // 1 hour expiry
  return accessToken;
}

module.exports = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing ?q=..." });
  }

  try {
    const token = await getAccessToken();

    const result = await axios.get("https://atlas.mappls.com/api/search", {
      params: { address: query },
      headers: { Authorization: `Bearer ${token}` },
    });

    if (result.data.copResults && result.data.copResults.length > 0) {
      const place = result.data.copResults[0];
      return res.json({
        address: place.placeName,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lng),
        eloc: place.eLoc,
      });
    } else {
      return res.json({ message: "No matching place found" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "API Error", message: err.message });
  }
};
