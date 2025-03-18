
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
    liLogin.classList.add("login")
    
    const liInsta = document.createElement("li");
    liInsta.innerHTML = "<img src=./assets/icons/instagram.png alt=Instagram>"
    
    li.appendChild(liProjets)
    li.appendChild(liContact)
    li.appendChild(liLogin)
    li.appendChild(liInsta)
    
    }
    
    
    export function ping() {
        console.log("ping");
    }
    
    
    // liPCL();

