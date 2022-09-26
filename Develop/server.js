const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoutes);

app.use(express.static("public"));

// GET Route for notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at https://localhost:${PORT} 🚀`)
);
