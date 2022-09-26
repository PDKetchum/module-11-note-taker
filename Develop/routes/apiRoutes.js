const apiRoutes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  writeToFile,
  readFromFile,
} = require("../helpers/fsUtils");

// GET route for retrieving all notes
apiRoutes.get("/api/notes", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST route for new notes
apiRoutes.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  // If user provides a title and text, create a new note
  if (title && text) {
    const newNote = {
      title,
      text,
      // give the note a unique ID
      id: uuidv4(),
    };

    // push note to json file
    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    console.log("Error in posting note");
    res.json("Error in posting note");
  }
});

apiRoutes.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== id);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      console.log(`Note ${id} has been deleted`);
      res.json(`Note ${id} has been deleted`);
    });
});
module.exports = apiRoutes;
