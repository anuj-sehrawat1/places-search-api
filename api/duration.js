const axios = require("axios");

function formatDuration(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = [];
  if (days > 0) result.push(`${days} day${days !== 1 ? "s" : ""}`);
  if (hours > 0) result.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes > 0 || result.length === 0)
    result.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

  return result.join(" ");
}

function convertToSeconds(value, unit) {
  switch (unit) {
    case "milliseconds": return value / 1000;
    case "seconds": return value;
    case "minutes": return value * 60;
    case "hours": return value * 3600;
    case "days": return value * 86400;
    default: return 0;
  }
}

module.exports = async (req, res) => {
  const { from, to, add, format } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: "Missing 'from' or 'to' query parameters" });
  }

  try {
    const [fromLat, fromLon] = from.split(",").map(parseFloat);
    const [toLat, toLon] = to.split(",").map(parseFloat);

    if (
      isNaN(fromLat) || isNaN(fromLon) ||
      isNaN(toLat) || isNaN(toLon)
    ) {
      return res.status(400).json({ error: "Invalid coordinates format. Use lat,lon." });
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${fromLon},${fromLat};${toLon},${toLat}?overview=full`;

    const response = await axios.get(url);
    const durationSec = response.data.routes?.[0]?.duration || 0;

    let finalSeconds = durationSec;

    if (add && format) {
      const addValue = parseFloat(add);
      const extraSeconds = convertToSeconds(addValue, format.toLowerCase());
      finalSeconds += extraSeconds;
    }

    const formatted = formatDuration(finalSeconds);
    res.status(200).json({ duration: formatted });
  } catch (err) {
    res.status(500).json({
      error: "Failed to get duration",
      message: err.message || "Unknown error",
    });
  }
};
