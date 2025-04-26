const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const app = express();

app.use(express.json());

app.get("/fetch-feed", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    const xml = response.data;
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(xml, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
