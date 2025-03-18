const express = require("express");
const multer = require("multer");
const sharpMulter = require("sharp-multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors()); // Permet d'accepter les requêtes du frontend

// // Configuration de multer avec sharp-multer
// const storage = sharpMulter({
//     destination: "uploads/", // Où stocker les images
//     imageOptions: { resize: { width: 500, height: 500 } } // Redimensionner l'image
// });

// const upload = multer({ storage });

const storage =  
 SharpMulter ({
              destination:(req, file, callback) =>callback(null, "images"),
              imageOptions:{
               fileFormat: "jpg",
               quality: 80,
               resize: { width: 50, height: 50 },
                 }
           });
const upload  =  multer({ storage });



app.post("/upload", upload.single("avatar"), async  (req, res)  => {
    console.log(req.file);
    return  res.json("File Uploaded Successfully!");
    })















// // Route pour uploader une image
// app.post("/upload", upload.single("image"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "Aucune image reçue" });
//     }
//     res.json({ message: "Image uploadée avec succès", filename: req.file.filename });
// });

// // Servir les images uploadées statiquement
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Lancer le serveur
// const PORT = 5678/api;
// app.listen(PORT, () => console.log(`Serveur en écoute sur http://localhost:${PORT}`));





// const formData = new FormData();
// const fichier = document.querySelector("#imageInput").files[0];

// formData.append("image", fichier);

// fetch("http://localhost:5678/api", {
//     method: "POST",
//     body: formData
// })
// .then(response => response.json())
// .then(data => console.log("Réponse du serveur :", data))
// .catch(error => console.error("Erreur :", error));





