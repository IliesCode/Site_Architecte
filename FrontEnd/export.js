
// Affichage des Li projets contact login
export function liPCL () {
    const li = document.querySelector(".pcl");
    console.log("de");
    const liProjets = document.createElement("li");
    liProjets.innerText = "projets";
    
    const liContact = document.createElement("li");
    liContact.innerText = "contact";
    
    const liLogin = document.createElement("li");
    liLogin.innerHTML = "<a href=login.html>login</a>";
    liLogin.classList.add("login");
    liLogin.classList.add("logoLogin")
    
    const liInsta = document.createElement("li");
    liInsta.innerHTML = "<img src=./assets/icons/instagram.png alt=Instagram>"
    liInsta.classList.add("logoInsta")
    
    li.appendChild(liProjets)
    li.appendChild(liContact)
    li.appendChild(liLogin)
    li.appendChild(liInsta)
    
    }
    
//----


// Fonction pour récupérer tous les projets depuis l'API
export async function allProjects() {
    const reponse = await fetch('http://localhost:5678/api/works');
    return await reponse.json(); // Convertir en JSON et retourner les projets
}




// Fonction pour afficher les projets dans la galerie
export function afficherProjets(projets) {
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
export async function genererProjets() {
    try {
        const projets = await allProjects(); // Récupérer les projets
        afficherProjets(projets); // Afficher tous les projets
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }
}


// Affiche le mode édition une fois connecté 
export function afficherModeEdition() {
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


export function form() {
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
    
    }

