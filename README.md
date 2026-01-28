<!DOCTYPE html>

<h1>🌍 Places Search API</h1>
<p>
  A lightweight experimental API that demonstrates how <b>global place autocomplete</b>
  data can be fetched and parsed into a clean, developer-friendly JSON format.
</p>

<hr />

<h2>⚠️ Disclaimer</h2>
<ul>
  <li>This project is created <b>strictly for educational and research purposes</b>.</li>
  <li>This repository is <b>NOT affiliated with, endorsed by, or associated with Google</b>
      or any other mapping provider.</li>
  <li>The author does <b>not encourage misuse</b> of this code.</li>
  <li>Anyone choosing to deploy or use this code is <b>solely responsible</b> for ensuring
      compliance with all applicable laws, platform terms, and policies.</li>
  <li>The author takes <b>no responsibility</b> for any misuse, damage, or violations.</li>
</ul>

<hr />
<hr />

<h2>🚨 Important Note (Read Carefully)</h2>
<p>
This API is based on <b>scraping and reverse-engineering techniques</b>, which makes it
<b>legally sensitive and potentially illegal</b> depending on how and where it is used.
</p>
<p>
If you are genuinely interested in understanding the internals for <b>educational or research purposes</b>,
<p>
I may choose to share the details <b>personally and selectively</b>.
<b>This is NOT a paid service</b> — no money involved.
</p>

<p>
<b>Once again, to be absolutely clear:</b>
</p>

<ul>
  <li>🚫 This is a <b>scraping-based API</b></li>
  <li>⚠️ It can be considered <b>illegal or against platform policies</b></li>
  <li>❌ It is <b>NOT safe for production use</b></li>
</ul>

<p>
Use this project <b>only for learning and experimentation</b>.
Any misuse or legal consequences are solely the responsibility of the user.
</p>
<h2>✨ Features</h2>
<ul>
  <li>🔎 Global place search (worldwide)</li>
  <li>📍 Latitude & Longitude extraction</li>
  <li>🏙️ City / State / Country parsing</li>
  <li>🆔 Place ID & short identifiers</li>
  <li>⚡ Fast response parsing</li>
  <li>🧠 Reverse-engineered response structure (research)</li>
  <li>🛠️ Minimal dependencies</li>
  <li>🌐 Works with any frontend or backend</li>
</ul>

<hr />

<h2>🚀 Live API (Demo)</h2>
<p>
  <b>Base URL:</b><br />
  <code>https://search-places-delta.vercel.app/api/find</code>
</p>
<p><i>(Demo endpoint may be rate-limited or disabled at any time.)</i></p>

<hr />

<h2>📡 API Usage</h2>

<h3>Endpoint</h3>
<pre>
GET /api/find?q=&lt;search_text&gt;
</pre>

<h3>Query Parameters</h3>
<table border="1" cellpadding="6">
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>q</td>
    <td>string</td>
    <td>Yes</td>
    <td>Search query (place name, city, area, etc.)</td>
  </tr>
</table>

<hr />

<h2>📥 Sample Request</h2>
<pre>
GET https://search-places-delta.vercel.app/api/find?q=chandigarh
</pre>

<hr />

<h2>📤 Sample Response</h2>
<pre>
{
  "query": "chandigarh",
  "total_results": 3,
  "suggestions": [
    {
      "name": "Chandigarh",
      "short_name": "Chandigarh",
      "state": "Chandigarh",
      "country": "India",
      "latitude": 30.7333,
      "longitude": 76.7794,
      "place_id": "example_place_id",
      "google_short_id": "example_short_id",
      "match_range": [0, 10],
      "flags": {
        "rank": 1,
        "codes": ["locality", "political"]
      }
    }
  ]
}
</pre>

<hr />

<h2>🧱 Project Structure</h2>
<pre>
places-search-api/
├── api/
│   └── find.js
├── package.json
└── README.html
</pre>

<hr />

<h2>🛠️ Installation & Local Setup</h2>

<h3>1️⃣ Clone the repository</h3>
<pre>
git clone https://github.com/anuj-sehrawat1/places-search-api.git
cd places-search-api
</pre>

<h3>2️⃣ Install dependencies</h3>
<pre>
npm install
</pre>

<h3>3️⃣ Run locally</h3>
<pre>
npm run dev
</pre>

<p>
API will be available at:<br />
<code>http://localhost:3000/api/find?q=delhi</code>
</p>

<hr />

<h2>🧠 Why This API Is Different</h2>

<ul>
  <li>
    <b>🔍 Specific Place Search (Not Just Cities)</b><br />
    Unlike many public place APIs that only return cities or regions, this API can
    resolve <b>very specific locations</b> such as:
    <ul>
      <li>Banks</li>
      <li>Hospitals</li>
      <li>Malls</li>
      <li>Institutions</li>
      <li>Landmarks</li>
      <li>Local areas & neighborhoods</li>
    </ul>
    This makes it useful for understanding how fine-grained place discovery works.
  </li>

  <br />

  <li>
    <b>📍 Exact Latitude & Longitude Included</b><br />
    Most autocomplete or search APIs only return place names or IDs.
    This API <b>directly exposes latitude and longitude</b> values for each result,
    making it suitable for:
    <ul>
      <li>Map rendering</li>
      <li>Distance calculations</li>
      <li>Geospatial analysis</li>
      <li>Location-based research</li>
    </ul>
  </li>

  <br />

  <li>
    <b>⚡ No Built-in Rate Limiting</b><br />
    There is <b>no artificial request cap</b> enforced at the API layer.
    This allows developers to observe real-world behavior under continuous or
    repeated queries during experimentation.
  </li>
</ul>

<hr />

<h2>☠️ Cons & Serious Warnings (Read Carefully)</h2>

<p>
<b>This section exists to clearly discourage careless or irresponsible usage.</b>
</p>

<ul>
  <li>
    <b>🚨 No Usage Guarantees</b><br />
    This API can stop working <b>at any moment</b> without warning.
    There are no uptime guarantees, SLAs, or stability promises.
  </li>

  <br />

  <li>
    <b>🔥 Extremely Fragile Response Structure</b><br />
    The underlying response format is <b>not documented</b> and can change anytime.
    A single upstream change may:
    <ul>
      <li>Break parsing completely</li>
      <li>Return incorrect data</li>
      <li>Crash dependent applications</li>
    </ul>
  </li>

  <br />

  <li>
    <b>⚠️ Not Suitable for Production Use</b><br />
    This project is <b>NOT designed</b> for production systems.
    Using it in live applications may lead to:
    <ul>
      <li>Unexpected downtime</li>
      <li>Application failures</li>
      <li>Data inconsistency</li>
    </ul>
  </li>

  <br />

  <li>
    <b>🚫 No Rate Limits = High Risk</b><br />
    While there is no enforced rate limiting, excessive usage may:
    <ul>
      <li>Trigger upstream blocks</li>
      <li>Result in temporary or permanent access denial</li>
      <li>Cause your deployment to be suspended</li>
    </ul>
  </li>

  <br />

  <li>
    <b>🧨 Legal & Compliance Risk</b><br />
    Depending on how and where this code is used, it may violate:
    <ul>
      <li>Third-party platform terms</li>
      <li>Service usage policies</li>
      <li>Local or regional regulations</li>
    </ul>
    <b>The author takes zero responsibility</b> for any such violations.
  </li>

  <br />

  <li>
    <b>💀 Use at Your Own Risk</b><br />
    If you choose to use, deploy, or modify this code:
    <ul>
      <li>You accept all risks</li>
      <li>You assume full responsibility</li>
      <li>You acknowledge that things <b>will break</b></li>
    </ul>
  </li>
</ul>

<hr />

<h2>⚙️ Deployment</h2>
<p>This project is optimized for <b>Vercel serverless functions</b>.</p>
<ul>
  <li>Push repo to GitHub</li>
  <li>Import project in Vercel</li>
  <li>No environment variables required</li>
</ul>

<hr />

<h2>⏱️ Rate Limiting</h2>
<ul>
  <li>No built-in rate limiting by default</li>
  <li>Recommended: add IP-based limits before production use</li>
</ul>

<hr />

<h2>🔐 Security Notes</h2>
<ul>
  <li>Do not expose this API publicly without protection</li>
  <li>Always add rate limiting and monitoring</li>
  <li>Avoid high-volume automated usage</li>
</ul>

<hr />

<h2>📚 Educational Purpose</h2>
<p>
This repository exists to help developers understand:
</p>
<ul>
  <li>How autocomplete systems work internally</li>
  <li>How complex nested responses can be parsed</li>
  <li>How location data is structured</li>
</ul>

<hr />

<h2>📄 License</h2>
<p>
MIT License<br />
Use at your own risk.
</p>

<hr />

<h2>👤 Author</h2>
<p>
Built for learning, reverse-engineering research, and curiosity.<br />
No guarantees. No liability.
</p>

<hr />

<h2>🚫 Final Note</h2>
<p>
This repository is intentionally <b>research-oriented</b> and <b>not user-friendly</b>.
If you are looking for a stable, supported, and compliant solution,
<b>this project is not for you</b>.
</p>

</body>
</html>
