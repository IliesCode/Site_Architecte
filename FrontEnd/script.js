/*let works = [];

fetch('http://localhost:5678/api/works')
  .then(response => {
    if (!response.ok) {
      throw new Error('Problème de récupération des données');
    }
    return response.json(); 
  })
  .then(data => {
    works = data;
    console.log(works);
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données:', error);
  }); */







// import { connexionUser } from "./login";

// connexionUser(reponse.ok) {
//     // Afficher les nouveaux elements HTML

//     const modeEdition = document.createElement("div");
//     ajouterPhotoRectanlge.classList.add("edition");

// }

import { verifierConnexion } from "./login.js";

const btnValider = document.querySelector(".valider");
const btnAjoutPhoto = document.querySelector(".ajoutPhoto");

// Fonction pour récupérer tous les projets depuis l'API
async function allProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    return await reponse.json(); // Convertir en JSON et retourner les projets
}


// fonction submit des nouveaux projets
async function gestionSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    const imageFile = document.querySelector("input[type='file']").files[0];
    const getTitle = document.querySelector("input[name='titre']").value;
    const getcategory = document.querySelector(".menuDeroulant").value;

    const sendForm = new FormData();
    sendForm.append("image", imageFile);
    sendForm.append("title", getTitle);
    sendForm.append("category", getcategory);

    const newProjet = await fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`, // Correction de l'interpolation
            "Accept": "application/json",
        },
        body: sendForm
    });

    if (newProjet.ok) {
        reset(); // Reset les champs
        await genererProjets(); // Recharge la galerie principale
        afficherProjetsModale(); // Recharge la galerie modale

        modal.style.display = "none";
        overlay.style.display = "none";
    }
}

// retire et ajoute de nouveau l'event listener pour pallier au probleme de doublon
function attachEventListener() {
    btnValider.removeEventListener("click", gestionSubmit); 
    btnValider.addEventListener("click", gestionSubmit);
} 


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

genererProjets();


        // Ajout du menu déroulant des catégories 

        async function genererMenuCategories() {
            
            // Récupération des catégories depuis l'API
            const reponse = await fetch('http://localhost:5678/api/categories');
            const categories = await reponse.json();
            
            // Sélection du conteneur où ajouter le menu
            const container = document.querySelector(".galleryModale");
            // container.innerHTML = ""; // Nettoie le conteneur pour éviter les doublons
    

            // Ajout du titre "catégorie"
            const categorieTitre = document.createElement("h3");
            categorieTitre.innerHTML = "Catégorie";
            categorieTitre.classList.add("ajoutTitre");
            container.appendChild(categorieTitre);


            // Création du menu déroulant
            const select = document.createElement("select");
            select.classList.add("menuDeroulant"); // Classe pour le style
            container.appendChild(select);

        
            // Ajoute une option par défaut
            const optionDefaut = document.createElement("option");
            optionDefaut.value = "";
            optionDefaut.innerText = "";
            select.appendChild(optionDefaut);
        
            // Remplit le menu déroulant avec les catégories
            categories.forEach(categorie => {
                const option = document.createElement("option");
                option.value = categorie.id;
                option.innerText = categorie.name;
                select.appendChild(option);
            });


            // parametres fonction "verifierChamps" à charger avant la fonction
            btnValider.setAttribute("disabled", "true"); // Désactive le bouton
            btnValider.style.backgroundColor = "gray"; // Change la couleur du bouton
            btnValider.style.borderColor = "gray"; // Change la couleur de sa bordure
            const inputFile2 = document.querySelector("input[type='file']");
            const titreForm2 = document.querySelector("input[name='titre']");
            const selectCategorie = document.querySelector(".menuDeroulant"); // Si tu as un select pour la catégorie
            console.log(inputFile2);
            
            inputFile2.addEventListener("change", verifierChamps);
            titreForm2.addEventListener("input", verifierChamps);
            selectCategorie.addEventListener("change", verifierChamps);
    }

    function verifierChamps() {

        const inputFile2 = document.querySelector("input[type='file']");
        const titreForm2 = document.querySelector("input[name='titre']");
        const selectCategorie = document.querySelector(".menuDeroulant"); // Si tu as un select pour la catégorie
        console.log(inputFile2);

        console.log('verifierChamps');
    

            if (inputFile2.files.length > 0 && titreForm2.value.trim() !== "" && selectCategorie.value !== "") {
                console.log("2258");
                btnValider.removeAttribute("disabled"); // Active le bouton
                btnValider.style.backgroundColor = "#1D6154"; // Optionnel : changer la couleur
            }else{
                btnValider.setAttribute("disabled", "true"); // Désactive le bouton
                btnValider.style.backgroundColor = "gray"; // Optionnel : changer la couleur
            }
        }




// Fonction asynchrone pour générer les boutons des catégories
async function genererBoutonsCategories() {
    const token = localStorage.getItem("token");

    if (!token) {
    try {
        // Récupération des projets depuis l'API
        const reponse = await fetch('http://localhost:5678/api/works');
        const projets = await reponse.json(); // Conversion de la réponse en JSON
        
        // Sélection du conteneur des boutons dans le HTML
        const container = document.querySelector(".boutons");
        container.innerHTML = ""; // Nettoie l'ancien contenu pour éviter les doublons

         // Créé une div pour contenir les boutons
         const divBoutons = document.createElement("div");
         divBoutons.classList.add("boutons"); // Classe pour la div (si besoin, peut être utilisée pour le style)
        
        // Objet pour stocker les catégories uniques (évite les doublons)
        const categoriesUniques = {};

        // Parcours des projets pour extraire les catégories uniques
        projets.forEach(projet => {
            if (!categoriesUniques[projet.category.id]) { // Vérifie si la catégorie est déjà ajoutée
                categoriesUniques[projet.category.id] = projet.category.name; // Ajoute la catégorie
            }
        });

        // Création d'un bouton "Tous" pour afficher tous les projets
        const boutonTous = document.createElement("button");
        boutonTous.innerText = "Tous"; // Texte du bouton
        boutonTous.classList.add("filtreBouton"); // Ajout d'une classe pour le style
        boutonTous.classList.add("couleurBtnTous");
        boutonTous.addEventListener("click", () => afficherProjets(projets)); // Affichage de tous les projets au clic
        container.appendChild(boutonTous); // Ajout du bouton dans le conteneur


        boutonTous.addEventListener("click", (event) => {  
    
            document.querySelectorAll(".filtreBouton").forEach((element) => { 
            console.log("pa");
            element.style.backgroundColor = "#fefef2";
            element.style.color = "#1D6154";
            event.target.style.color = "#fefef2"
            event.target.style.backgroundColor = "#1D6154";
        });
    });


        // Création des boutons pour chaque catégorie trouvée
        Object.entries(categoriesUniques).forEach(([id, name]) => {
            const bouton = document.createElement("button"); // Création du bouton
            bouton.innerText = name; // Texte du bouton = nom de la catégorie
            bouton.classList.add("filtreBouton"); // Ajout d'une classe pour le style
            

            // Ajout d'un event listener pour filtrer les projets par catégorie
            
                bouton.addEventListener("click", (event) => {  
    
                    document.querySelectorAll(".filtreBouton").forEach((element) => { 
                    console.log("pa");
                    element.style.backgroundColor = "#fefef2";
                    element.style.color = "#1D6154";
                    event.target.style.color = "#fefef2"
                    event.target.style.backgroundColor = "#1D6154";
                });


                const projetsFiltres = projets.filter(projet => projet.category.id === parseInt(id)); // Filtrage
                afficherProjets(projetsFiltres);

            });
            container.appendChild(bouton); // Ajout du bouton dans le conteneur        // Ajout des boutons dans le conteneur
            
        });





    } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error); // Gestion des erreurs
        } 
    } else {
        const modif = document.querySelector(".textModifier")
        const modifierProjets = document.createElement("h3");
        
        modifierProjets.innerHTML = '<i class="fa-regular fa-pen-to-square" style="color: black; padding-right: 5px; padding-left: 10px;"></i>modifier';
        modifierProjets.classList.add("modifierProjets");

        modif.appendChild(modifierProjets);

        // Supprime la divBoutons et l'espace alloué
        const divBoutons = document.querySelector(".boutons"); // Rechercher la div après ajout des boutons
        if (divBoutons) {
            divBoutons.remove(); // Retirer la divBoutons, l'espace est également libéré
        }
    }
}
genererBoutonsCategories();



// // Exécute la fonction après le chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    console.log("Le DOM est chargé !");
    verifierConnexion();
    console.log("2");
    afficherModeEdition();
});

function afficherModeEdition() {
    const token = localStorage.getItem("token");

    if (token) {
        // Sélection du body ou d'un élément spécifique pour insérer la div
        const body = document.querySelector("body"); // Ou un autre conteneur
        console.log("1");
        // Création de la div
        const modeEdition = document.createElement("div");
        modeEdition.classList.add("edition"); // Ajoute une classe pour le CSS
        modeEdition.innerHTML = `
            <p><i class="fa-regular fa-pen-to-square" style="color: white; padding-right: 10px;"></i> Mode Edition</p>
        `;

        // Suppression du formulaire de contact
        contact.remove();

        // Transformation du btn login en logout
        let logout = document.querySelector(".login");
        logout.innerHTML = "logout"

        // Ajout de la div à la page
        body.prepend(modeEdition);

        // Gestion du bouton de déconnexion
        document.querySelector(".login").addEventListener("click", function () {
            localStorage.removeItem("token"); // Supprime le token
            window.location.href = "index.html"; // Redirige vers la page de connexion
        });
    }
}


//----------- FORMULAIRE ------------


// contact 
const contact = document.querySelector("#contact");

const contactText = document.createElement("h2");
contactText.innerHTML = "Contact";
contact.appendChild(contactText);
const textProjet = document.createElement("p");
textProjet.innerHTML = "Vous avez un projet ? Discutons-en !";
contact.appendChild(textProjet);




// Création du form
const form = document.createElement("form");
form.setAttribute("id", "form");
form.setAttribute("action", "#form");
form.setAttribute("method", "post");
contact.appendChild(form); // Ajoute le formulaire dans la section après le texte

// Nom 

const labelNom = document.createElement("label")
labelNom.innerHTML = "Nom";
form.appendChild(labelNom);

const nomForm = document.createElement("input");
nomForm.type = "text"; // Définit le type d'input
nomForm.name = "nom"; // Donne un nom à l'input
form.appendChild(nomForm);


// Email

const labelEmail = document.createElement("label")
labelEmail.innerHTML = "Email";
form.appendChild(labelEmail);

const emailForm = document.createElement("input");
emailForm.type = "text"; // Définit le type d'input
emailForm.name = "Email"; // Donne un nom à l'input
form.appendChild(emailForm);


// Message

const labelMessage = document.createElement("label")
labelMessage.innerHTML = "Message";
form.appendChild(labelMessage);

const messageForm = document.createElement("textarea");
messageForm.name = "Message"; // Donne un nom à l'input
messageForm.classList.add("message")
form.appendChild(messageForm);


// Bouton 

const btnEnvoyer = document.createElement("input")
btnEnvoyer.type = "submit";
btnEnvoyer.innerHTML = "envoyer";
form.appendChild(btnEnvoyer);

// const btnForm = document.createElement("textarea");
// messageForm.name = "Message"; // Donne un nom à l'input
// messageForm.classList.add("message")
form.appendChild(btnEnvoyer);





// --------------------MODALE----------------

// GESTION DE LA MODALE -----------------------------------------------

// Ouverture et fermeture de la modale
const modal = document.querySelector(".modalContent");
const overlay = document.querySelector(".overlay");
const openModal = document.querySelector(".modifierProjets");
const closeModal = document.querySelector(".close");

function reset() {
    photosAjoutees = true;
};


// Ouverture modale
openModal.addEventListener("click", function  () {
    reset();
    modal.style.display = "flex";
    overlay.style.display = "flex";
})


// Fermeture modale
closeModal.addEventListener("click", function  () {
    modal.style.display = "none"
    overlay.style.display = "none";
    reset();
})

overlay.addEventListener("click", function  () {
    modal.style.display = "none"
    overlay.style.display = "none";
    reset();
})


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


        // FLETCH DELETE
        iconeSuppr.addEventListener("click", async function(){
            const token = localStorage.getItem("token");
            const id = this.getAttribute("data-id"); // Utilisation de this et getAttribute car je suis dans l'icone suppr 
            const removeProjet = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, // Ajout du token
                    "Accept": "application/json",
                },
                })
                
            if (removeProjet.ok) {
                
                // Recharge la galerie principale
                await genererProjets();
                
                // Recharge la galerie modale
                afficherProjetsModale();
            }
        })
        
        // Ajout des éléments au projet
        projetElement.appendChild(imageElement);
        projetElement.appendChild(iconeSuppr);

        // Ajout du projet à la galerie de la modale
        galerieModale.appendChild(projetElement);
    });
}






// FONCTION AJOUT PHOTO


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

        const flecheRetour = document.createElement("i");
        flecheRetour.classList.add("fa-solid", "fa-arrow-left", "arrow");


        const txtAjoutPhoto = document.createElement("h2");
        txtAjoutPhoto.innerText = "Ajout Photo";

        const ajouterPhotoRectanlge = document.createElement("div");
        ajouterPhotoRectanlge.classList.add("rectangle");

        const sousRectangle = document.createElement("div");
        sousRectangle.classList.add("sousRectangle");
        sousRectangle.style.display = "none";

        // Créer l'élément image
        const imageRectangle = document.createElement("i");
        imageRectangle.classList.add("fa-regular", "fa-image", "imageRectangle");


        
// Ajouter l'image à la div


        const btnUpload = document.createElement("button");
        btnUpload.innerHTML = " + Ajouter Photo";
        // Clique sur l'input lors du clique sur le btn
        btnUpload.addEventListener("click", function () {
            inputFile.click();
        });

        btnUpload.addEventListener("change", function () {
            btnUpload.style.display = "none";
            imageRectangle.style.display = "none";
            sousRectangle.style.display = "block";
        })

        const formFile = document.createElement("form")
        formFile.action = "/upload";
        formFile.method = "POST";

        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.name = "avatar";
        inputFile.enctype = "multipart/form-data";
        inputFile.classList.add("imgFile");
       

        // Ajout de la catégorie titre

        const ajoutTitre = document.createElement("h3");
        ajoutTitre.innerHTML = "Titre";
        ajoutTitre.classList.add("ajoutTitre");

        const titreForm = document.createElement("input");
        titreForm.type = "text"; // Définit le type d'input
        titreForm.name = "titre"; // Donne un nom à l'input
        
        


        // Appeler la fonction pour afficher le menu au chargement de la page
        genererMenuCategories();
        
        
        

        btnUpload.appendChild(inputFile);
        ajouterPhotoRectanlge.appendChild(imageRectangle);
        ajouterPhotoRectanlge.appendChild(btnUpload);
        ajouterPhotoRectanlge.appendChild(sousRectangle)
        galerieModale.appendChild(txtAjoutPhoto);
        galerieModale.appendChild(ajouterPhotoRectanlge);
        galerieModale.appendChild(ajoutTitre);
        galerieModale.appendChild(titreForm);
        galerieModale.appendChild(flecheRetour);



        // action du btn valider

        
        

        verifierChamps();
        

        attachEventListener();
        



        // Fonction retour 
        flecheRetour.addEventListener("click", async function(){
            galerieModale.innerHTML = "";
            const projets = await allProjects(); // Récupération des projets
            projetModale(projets, galerieModale); // Affichage des projets dans la modale
            galerieModale.innerHTML = "<h2>Galerie photo</h2>"; // Titre

            

            let isRequestSent = false;

            btnAjoutPhoto.addEventListener("click", function () {
                if (isRequestSent) return; // Bloque si déjà envoyé
                isRequestSent = true;
        
            });
            

            const clrBtn = document.querySelector(".ajoutPhoto");
            clrBtn.style.backgroundColor = "#1D6154";

            
            projetModale(projets, galerieModale);
            photosAjoutees = true;
            
            btnValider.style.display = "none";
            btnAjoutPhoto.style.display = "block";
        })

        btnValider.style.backgroundColor = "#1D6154";

        btnAjoutPhoto.style.display = "none";
        btnValider.style.display = "block";


        
    } else {
        // Affichage des projets
        try {
            const projets = await allProjects(); 
            galerieModale.innerHTML = "<h2>Galerie photo</h2>"; // Titre

            projetModale(projets, galerieModale);
            
            btnValider.style.display = "none";
            btnAjoutPhoto.style.display = "block";
        } catch (error) {
            console.error("Erreur lors de l'affichage des projets dans la modale :", error);
        }
    }
}