import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Node.js App is running on Vercel!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
