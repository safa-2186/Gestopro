import express from "express";
import 'dotenv/config';


// server's main object. we use it to define routes and configure the server.
const app = express();

// middleware
// Tells Express to use a middleware.
// express.json() Allows Express to read JSON data sent in the HTTP request body.
app.use(express.json());






let projets = [
    { id: 1, nom: "Site vitrine", termine : false },
    { id: 2, nom: "App Mobile", termine : true},
]







app.get("/", (req, res) => {
    res.json({message : "GestoPro V1"});
})





app.get("/projets", (req,res) =>{
    res.status(200).json(projets)
});









app.post("/projets", (req,res) =>{
    const {nom} = req.body;
    if(!nom) {
        res.status(400).json({message : "Invalid data"});
    } 
    const newProject = {id : projets.length +1 , nom, termine: false}
    projets.push(newProject)
    res.status(201).json(projets)
});






app.get("/projets/:id", (req, res) => {
    // const {id} = req.params;
    const id = Number(req.params.id);
    const projet = projets.find(p => p.id === id);

    if (!projet) {
        return res.status(404).json({ message: "No project" });
    }

    res.status(200).json(projet);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("server is UP on ${PORT}")
})





