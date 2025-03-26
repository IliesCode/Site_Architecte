



import { liPCL } from "./export.js";


liPCL();


export async function connexionUser() {
    const requeteConnexion = document.querySelector("#connexion");

    if (!requeteConnexion) return;
    requeteConnexion.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#mdp").value;
        
        console.log(JSON.stringify({ email, password }));
        try {
            const reponse = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })

            });

            const data = await reponse.json();

            if (reponse.ok ) { // reponse étant un objet, on ne peut pas le mettre  devant "=== true" car il contient plusieurs choses
                localStorage.setItem("token", data.token);
                window.location.href = "index.html"; 
                // indiquer la connexion avec code
            } else {
                afficherMessageErreur("Identifiants incorrects. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            afficherMessageErreur("Une erreur est survenue. Veuillez réessayer plus tard.");
        }
    });
}
connexionUser();


function afficherMessageErreur(message) {
    const messageErreur = document.querySelector("#messageErreur"); // Un élément HTML où afficher l'erreur
    if (!messageErreur) {
        console.error("L'élément #messageErreur est introuvable !");
        return;
    }
    messageErreur.textContent = message;
    messageErreur.style.color = "red"; // Optionnel, juste pour bien voir l'erreur
}


export function verifierConnexion() {
    const token = localStorage.getItem("token");
    const pageActuelle = window.location.pathname.split("/").pop(); 

    if (!token && pageActuelle !== "index.html") {
        window.location.href = "login.html";
    }
}


