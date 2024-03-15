import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import qr from "qr-image";
import fs from "fs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/generate-qr", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const qrPath = `public/qr_code.png`;
    var qr_svg = qr.image(url, { type: "png" });
    qr_svg.pipe(fs.createWriteStream(qrPath));

    res.json({ qrPath: "qr_code.png" });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
