const axios = require('axios');

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
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
      }
    });

    res.status(200).send(googleResp.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch data from Google' });
  }
};
