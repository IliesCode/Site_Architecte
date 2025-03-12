// GENERATION DES PROJETS ----------------------------------------------------

// Fonction pour récupérer tous les projets depuis l'API
async function allProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    return await reponse.json(); // Convertir en JSON et retourner les projets
}




// Afficher les nouveaux elements HTML

    const modeEdition = document.createElement("div");
        ajouterPhotoRectanlge.classList.add("rectangle");





// Fonction pour afficher les projets dans la galerie
function afficherProjets(projets) {
    const galerie = document.querySelector(".gallery");
    galerie.innerHTML = ""; // Nettoyer la galerie avant d'ajouter les projets

    projets.forEach(projet => {
        const projetElement = document.createElement("article");

        // Image
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        imageElement.alt = projet.title;

        // Titre
        const titreElement = document.createElement("h3");
        titreElement.innerText = projet.title;

        // Ajout des éléments dans l'article
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titreElement);

        // Ajout de l'article à la galerie
        galerie.appendChild(projetElement);
    });
}



// Fonction pour afficher TOUS les projets au chargement de la page
async function genererProjets() {
    try {
        const projets = await allProjects(); // Récupérer les projets
        afficherProjets(projets); // Afficher tous les projets
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }
}

// Exécuter la fonction au chargement de la page
genererProjets();







// GESTION DE LA MODALE -----------------------------------------------

// Ouverture et fermeture de la modale
const modal = document.querySelector(".modalContent");
const overlay = document.querySelector(".overlay");
const openModal = document.querySelector(".modalOuverture");
const closeModal = document.querySelector(".close");


// Ouverture modale
openModal.addEventListener("click", function  () {
    modal.style.display = "flex";
    overlay.style.display = "flex";
})


// Fermeture modale
closeModal.addEventListener("click", function  () {
    modal.style.display = "none"
    overlay.style.display = "none";
})

overlay.addEventListener("click", function  () {
    modal.style.display = "none"
    overlay.style.display = "none";
})



// //AFFICHAGE DES PROJETS DANS LA MODALE ------------------------------------------

// let photosAjoutees = false;

// // Des que la page est rechargée, il lance un eventListener
// document.addEventListener("DOMContentLoaded", () => {
//     const ajouterPhoto = document.querySelector(".ajoutPhoto"); // 
//     ajouterPhoto.addEventListener("click", function () {
//         photosAjoutees = !photosAjoutees; // Inverse la valeur de photosAjoutees
//         console.log("photosAjoutees est maintenant :", photosAjoutees);
//         afficherProjetsModale(); // Met à jour l'affichage après le switch
//     });
// });

// async function afficherProjetsModale() {
//     if (photosAjoutees) { // Vérification correcte
//         //AFFICHAGE DE LA FENÊTRE D'AJOUT PHOTOS ------------------------------------------
//         galerieModale.innerHTML = ""; // Nettoyage avant d'ajouter le contenu
//         ajouterPhotoMode(); // Appel de la fonction pour afficher "coucou"
//     } else {

//         //AFFICHAGE DES PROJETS DANS LA MODALE VIA LA FONCTION PROJETMODALE ------------------------------------------
//         try {
//             const projets = await allProjects(); // Récupère les projets
//             const galerieModale = document.querySelector(".galleryModale");
//             galerieModale.innerHTML = ""; // Nettoyer la galerie avant d'ajouter les projets

//             const txtGeleriePhoto = document.querySelector(".galleryModale");
//             txtGeleriePhoto.innerHTML = "<h2>Galerie photo</h2>";

//             projetModale(projets, galerieModale); // Afficher les projets
//         } catch (error) {
//             console.error("Erreur lors de l'affichage des projets dans la modale :", error);
//         }
//     }
// }

// function ajouterPhotoMode() {
//     const txtAjoutPhoto = document.querySelector(".galleryModale");
//     txtAjoutPhoto.innerHTML = "<h2>Ajout Photo </h2>"; // Affiche "ajout photo" dans la modale

    
//     const nouvellePhoto = document.querySelector(".nouvellePhoto");
//     nouvellePhoto.innerHTML = "<input type=file>";

//     const ajouterPhotoRectanlge = document.querySelector(".ajouterPhoto");
//     ajouterPhotoRectanlge.innerHTML = "<div class=rectangle></div>" ;

// }

// afficherProjetsModale();

// openModal.addEventListener("click", afficherProjetsModale);




let photosAjoutees = true;

// Ajout de l'événement au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    const ajouterPhoto = document.querySelector(".ajoutPhoto");
    ajouterPhoto.addEventListener("click", function () {
        photosAjoutees = !photosAjoutees; // Inverse l'état
        console.log("photosAjoutees est maintenant :", photosAjoutees);
        afficherProjetsModale(); // Met à jour l'affichage après le switch
    });
});

async function afficherProjetsModale() {
    const galerieModale = document.querySelector(".galleryModale");

    if (photosAjoutees === false) { 
        // Affichage de l'interface d'ajout de photo
        galerieModale.innerHTML = ""; // Nettoyage avant d'ajouter le contenu

        const txtAjoutPhoto = document.createElement("h2");
        txtAjoutPhoto.innerText = "Ajout Photo";

        const ajouterPhotoRectanlge = document.createElement("div");
        ajouterPhotoRectanlge.classList.add("rectangle");


        const inputFile = document.createElement("input");
        inputFile.type = "file";
        

        ajouterPhotoRectanlge.appendChild(inputFile);
        galerieModale.appendChild(txtAjoutPhoto);
        galerieModale.appendChild(ajouterPhotoRectanlge);

    } else {
        // Affichage des projets
        try {
            const projets = await allProjects(); 
            galerieModale.innerHTML = "<h2>Galerie photo</h2>"; // Titre

            projetModale(projets, galerieModale);
        } catch (error) {
            console.error("Erreur lors de l'affichage des projets dans la modale :", error);
        }
    }
}

// Ouverture de la modale et affichage des projets
openModal.addEventListener("click", afficherProjetsModale);









 //FONCTION POUR AFFICHER LES PROJETS DANS LA MODALE

function projetModale(projets,galerieModale) {

    projets.forEach(projet => {
        const projetElement = document.createElement("div");
        projetElement.classList.add("projetModale");

        // Image
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        imageElement.alt = projet.title;

        // Créer une icône de suppression pour chaque projet (en utilisant FontAwesome)
        const iconeSuppr = document.createElement("i");
        iconeSuppr.classList.add("fa", "fa-trash", "iconeSupprimer"); // Ajout des classes  pour pouvoir appliquer un style à l'icône
        iconeSuppr.setAttribute("data-id", projet.id); // Ajout d'un attribut "data-id" à l'icône, pour pouvoir identifier quel projet supprimer

        // Ajout des éléments au projet
        projetElement.appendChild(imageElement);
        projetElement.appendChild(iconeSuppr);

        // Ajout du projet à la galerie de la modale
        galerieModale.appendChild(projetElement);
    });
}

