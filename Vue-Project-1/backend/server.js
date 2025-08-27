import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use('/images', express.static(path.join(process.cwd(), 'images')));

// 기존 JSON 로드
const dataPath = path.join(process.cwd(), "data", "mbti_traditional_alcohol.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
const recommendData = JSON.parse(rawData);

// MBTI 추천 기본 API
app.get("/mbti/recommend", (req, res) => {
    const mbti = req.query.mbti;
    const rec = recommendData[mbti];

    if (!rec) return res.status(404).json({ error: "MBTI를 찾을 수 없습니다." });
    res.json(rec);

});

app.listen(7001, () =>
    console.log("웹 서버 호출됨 -> http://localhost:7001")
);
