const axios = require("axios");

/* ===============================
   Google Autocomplete Parser
================================ */
function parseLocationAutocomplete(rawResponse) {
  // remove security prefix
  const cleaned = rawResponse.replace(/^\)\]\}'\s*/, "");

  let data;
  try {
    data = JSON.parse(cleaned);
  } catch (e) {
    throw new Error("Invalid Google response");
  }

  const query = data?.[0]?.[0] || null;
  const rawSuggestions = data?.[0]?.[1] || [];
  const suggestions = [];

  for (const entry of rawSuggestions) {
    try {
      const p = entry[22];
      if (!Array.isArray(p)) continue;

      const name = p[0]?.[0] ?? null;
      const shortName = p[1]?.[0] ?? null;
      const matchRange = p[1]?.[1]?.[0] ?? null;
      const state = p[2]?.[0] ?? null;

      const latLng = p[11];
      const latitude = latLng?.[2] ?? null;
      const longitude = latLng?.[3] ?? null;

      const flagsBlock = p[7];
      const rank = flagsBlock?.[1] ?? null;
      const codes = flagsBlock?.[2] ?? [];

      const placeBlock = p[13]?.[0] || [];
      const placeId = placeBlock[0] ?? null;
      const googleShortId = placeBlock[10] ?? null;

      const country = p[35] ?? null;

      suggestions.push({
        name,
        short_name: shortName,
        state,
        country,
        latitude,
        longitude,
        place_id: placeId,
        google_short_id: googleShortId,
        match_range: matchRange,
        flags: {
          rank,
          codes
        }
      });
    } catch (_) {
      // skip broken entries
    }
  }

  return {
    query,
    total_results: suggestions.length,
    suggestions
  };
}

/* ===============================
   API Handler
================================ */
module.exports = async (req, res) => {
  try {
    const userQuery = req.query.q;

    if (!userQuery) {
      return res.status(400).json({ error: 'Missing "q" parameter in URL' });
    }

    const encodedQuery = encodeURIComponent(userQuery);

    const googleUrl = `https://www.google.com/s?gl=in&gs_ri=maps&suggest=p&tbm=map&q=${encodedQuery}&pb=!2i15!4m8!1m3!1d1702.7860451264771!2d76.82201819999999!3d30.651211700000044!3m2!1i360!2i381!4f13.1!10b1!22m5!7e140!9sqvtDaKjFMZ-d4-EP2-HV8AI%3A78453932291!17sqvtDaKjFMZ-d4-EP2-HV8AI%3A78453932292!24m1!2e1!23m2!1e108!10b1`;

    const googleResp = await axios.get(googleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    // 🔥 parse raw response
    const formatted = parseLocationAutocomplete(googleResp.data);

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch or parse Google data" });
  }
};
