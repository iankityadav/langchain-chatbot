import express from "express";
const app = express();
const PORT = 3001;

app.get('/api/policy/:id', (req, res) => {
  res.json({
    id: req.params.id,
    type: "Home Insurance",
    status: "Active",
    coverage: "Comprehensive",
    premium: 1200
  });
});

app.listen(PORT, () => console.log(`Mock Policy API running on port ${PORT}`));