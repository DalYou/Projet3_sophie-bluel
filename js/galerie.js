const categories = "http://localhost:5678/api/categories";
const Login = "http://localhost:5678/api/users/login";
let categoryId = 0;

const works = await fetch("http://localhost:5678/api/works");
const jsonGallery = await works.json();
console.log(jsonGallery);

//Vérifier si user est connecté
try{
  const token = JSON.parse(localStorage.getItem("bearer"));
  const connecte = token ? "flex" : "none";
  const tri_fetch = token ? "none" : "flex";
  document.querySelectorAll(".connecte").forEach((element) => {
    element.style.display = connecte;
  })
  document.querySelector("#buttontrie").style.display = tri_fetch; //Affichage des buttons de trie
}catch (error){
  console.error(error);
}

//Déclaration de la fonction générer la gallerie page index
function genererProjets(jsonGallery) {
  const divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = ""
  for (let i = 0; i < jsonGallery.length; i++) {
	  const projet = jsonGallery[i];	  
	  const figureElement= document.createElement("figure");
    figureElement.setAttribute("id", "figure-" + projet.id);	
    //figureElement.id = projet.id;  
	  const imageElement = document.createElement("img");
	  imageElement.src = projet.imageUrl;
    imageElement.crossOrigin = "anonymous";
	  imageElement.alt = projet.title;
	  const descriptionElement = document.createElement("figcaption");
	  descriptionElement.innerText = projet.title;

	  divGallery.appendChild(figureElement);    
	  figureElement.appendChild(imageElement);
	  figureElement.appendChild(descriptionElement);
  }
}

//Affichage de la gallerie dans la Modale 
function genererModal(jsonGallery) {
  const divGalleryModal = document.querySelector(".galleryeditor");
  divGalleryModal.innerHTML = ""
  for (let i = 0; i < jsonGallery.length; i++) {
	  const modal = jsonGallery[i];    
    const figureElement= document.createElement("figure");
    figureElement.style.width = '70px';
    figureElement.style.height = '110px';
    figureElement.style.position = 'relative';
    figureElement.style.marginRight = "9px"      
    figureElement.classList.add("modal_figure");
    figureElement.id = modal.id;
    const imageElement = document.createElement("img");
    imageElement.src = modal.imageUrl;
    imageElement.crossOrigin = "anonymous";
    imageElement.alt = modal.title;
    imageElement.style.width = '100%';
    imageElement.style.objectFit = 'cover';
    const descriptionElement = document.createElement("figcaption");
    descriptionElement.innerText = 'éditer';
    const supprButton = document.createElement("i");
    supprButton.classList.add('fa-solid', 'fa-trash-can', 'corbeille');
    supprButton.style.width = "15px";
    supprButton.style.height = "13px";
    supprButton.style.position = "absolute";
    supprButton.style.background = "black";
    supprButton.style.top = "0";
    supprButton.style.right = "0";
    supprButton.style.color = "white";
    supprButton.style.margin = "5px";
    supprButton.style.fontSize = "10px";
    supprButton.style.display = "flex";
    supprButton.style.justifyContent = "center";
    supprButton.style.alignItems = "center";
          
    divGalleryModal.appendChild(figureElement);    
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionElement);
    figureElement.appendChild(supprButton);
  };
  deleteGallery();
};

function updateDisplayImage(projet) {
  const projetElement = document.createElement("figure");
  projetElement.setAttribute("id", "figure-" + projet.id)
  projetElement.innerHTML = `<img src="${projet.imageUrl}" alt="${projet.title}" crossorigin="anonymous" >
          <figcaption>${projet.title}</figcaption>`
  document.querySelector(".gallery").appendChild(projetElement);
  console.log('projet dans DOM')
}

function updatedisplayGalleryEdit(projet) {
  const projetElement = document.createElement("figure");
  projetElement.style.width = '70px';
  projetElement.style.height = '110px';
  projetElement.style.position = 'relative';
  projetElement.style.marginRight = "9px"      
  projetElement.classList.add("modal_figure");
  projetElement.setAttribute("id", projet.id)
  projetElement.innerHTML = `<img src="${projet.imageUrl}" alt="${projet.title}" crossorigin="anonymous" style="width: 100%; objectFit: cover;">
                            <figcaption>Editer</figcaption>
                            <i class="fa-solid fa-trash-can corbeille" style="width: 15px; height: 13px; position: absolute; background: black; top: 0px; 
                            right: 0px; color: white; margin: 5px; font-size: 10px; display: flex; justify-content: center; align-items: center;"></i>`

  document.querySelector(".galleryeditor").appendChild(projetElement);
  //projetElement.appendChild(supprButton);
  deleteGallery();
}

// Appel de la fonction "genererProjets"
genererProjets(jsonGallery);
genererModal(jsonGallery);
AdminMode();  


//Trie des boutons
const boutonTous = document.querySelector("#btntous");
boutonTous.addEventListener("click", function () {
  const filtreTous = jsonGallery.filter(function (proje) {
        return proje.category.id;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(filtreTous);
});

const boutonObjet = document.querySelector("#btnobjets");
boutonObjet.addEventListener("click", function () {
  const filtreObjets = jsonGallery.filter(function (proje) {
        return proje.category.id === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(filtreObjets);
});

const boutonAppartements = document.querySelector("#btnappartements");
boutonAppartements.addEventListener("click", function () {
  const filtreAppartements = jsonGallery.filter(function (projet) {
        return projet.category.id === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(filtreAppartements);
    console.log(filtreAppartements);
});

const boutonHotelsRestaurants = document.querySelector("#btnhotelsrestaurants");
boutonHotelsRestaurants.addEventListener("click", function () {
  const filtreHotelsRestaurants = jsonGallery.filter(function (projet) {
        return projet.category.id === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(filtreHotelsRestaurants);
});

// Déconnexion au clic sur le bouton logout
document.addEventListener("click", function (event) {
  if (event.target.matches("#logout")) {
      localStorage.removeItem("token");
      localStorage.removeItem("bearer")
      location.replace("index.html");
  };
});

//Affichage du bouton logout

function AdminMode() {
  if (localStorage.getItem("token")) {
    const login = document.querySelector("#login");
    login.innerHTML = "<a href=index.html id=logout>logout</a>";
  };
};



// mode fenêtre modale
const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const boutonModal2 = document.querySelector("#btnphotomodal2");
const closeAll = document.querySelectorAll(".js-modal-close");

let modal = null;
const openModal = async function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    (modal.style.display = null),
      modal.addEventListener("click", closeModal),
      modal.querySelector(".js-modal-close").addEventListener("click", closeModal),
      modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  },
  closeModal = function (e) {
    if (null === modal) return;
    e.preventDefault(),
      modal.removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-close").removeEventListener("click", closeModal),
      modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  },
  stopPropagation = function (e) {
    e.stopPropagation();
  };
document.querySelectorAll(".js-modal").forEach((e) => {
  e.addEventListener("click", openModal);
}),

// ouvrir la modal2
boutonModal2.addEventListener("click", function () {
  document.querySelector("#modal2").style.display = null;
  document.querySelector("#modal1").style.display = "none";
});

// passer de la modal2 à modal1
const retour = document.querySelector("#retour");
retour.addEventListener("click", function () {
  document.querySelector("#modal1").style.display = null;
  document.querySelector("#modal2").style.display = "none";
});

// Click extérieur ferme les modales
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// fermer toutes les modales
closeAll.forEach(function (close) {
  close.addEventListener("click", function () {
    document.querySelector("#modal2").style.display = "none";
    document.querySelector("#modal1").style.display = "none";
  });
});

window.addEventListener("click", function (event) {
  if (event.target === modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
});

function deleteGallery() {
  const corbeilles = document.querySelectorAll(".corbeille");
  corbeilles.forEach( (corbeille) => {
    corbeille.addEventListener("click",function(e){
      let id = e.target.parentNode.id
      //corbeille.parentNode.remove ();
      //alert(id);
      //alert(id);
      fetch(`http://localhost:5678/api/works/${id}` , {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + localStorage.token
        }, 
      }).then(response => {
        if (response.ok) {
          //corbeille.parentNode.remove ();
          alert("Projet supprimé");
          e.target.closest("figure").remove();
          document.querySelector("#figure-" + id).remove();
        } else {
            alert("La suppression a échoué.");
        }
    }).catch(error => {
        console.error(error);
    });
    })
  })
}

//Ajout du bouton "déplacer" sur la première image
const FirstImg = document.getElementsByClassName("modal_figure").item(0);
const depButton = document.createElement("i");
depButton.classList.add("fa-solid", "fa-up-down-left-right");
depButton.style.width = "15px";
depButton.style.height = "15px";
depButton.style.zIndex = 1;
depButton.style.position = "fixed";
depButton.style.color = "white";
depButton.style.background = "black";
depButton.style.fontSize = "11px";
depButton.style.marginLeft = "28px";
depButton.style.marginTop = "4px";
depButton.style.display = "flex";
depButton.style.justifyContent = "center";
depButton.style.alignItems = "center";
FirstImg.prepend(depButton);

//Aperçu de la photo avant de l'ajouter.
const blah = document.querySelector(".blah");
const apercu = document.querySelector(".apercu");
const montrer = document.querySelector(".montrer");


imgInp.onchange = () => {
  const [file] = imgInp.files;
  if (file) {
    blah.src = URL.createObjectURL(file);
    montrer.style.display = "block";
    apercu.style.display = "none";
  } else {
    // Réinitialiser l'aperçu de l'image si aucun fichier n'est sélectionné
    blah.src = "";
    montrer.style.display = "none";
    apercu.style.display = "block";
  }
};

//Ajouter des elements dans la modale 2
function genererImage () {
  const sectionModal = document.querySelector(".modal-wrapper");
  const formulairePhoto = document.getElementById("btnvalider");
  const addImage = document.querySelector("#imgInp");
  const addTitre = document.getElementById("title");
  const addCategory = document.getElementById("category");

  formulairePhoto.addEventListener("click", async function (e) {
    e.preventDefault();
    // Image et un titre ont été ajoutés ?
    if (!addImage.value || !addTitre.value) {
      alert("Veuillez ajouter une image et un titre.");
      return;    
    }

    console.log(addImage.files[0]);
    console.log(addImage.files[0].name);
    const formData = new FormData();
    formData.append("image", addImage.files[0], addImage.files[0].name);
    formData.append("title", addTitre.value);
    formData.append("category", addCategory.value);
    console.log(formData);
    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }).then(async (newProject) => {
      if (newProject.ok) {
        alert("Document ajouté");
        const jsonG = await newProject.json();

        updateDisplayImage(jsonG);
        updatedisplayGalleryEdit(jsonG)
        
        //vider le formulaire
        const form = document.getElementById('form');
        form.reset();

        // Réinitialiser l'aperçu de l'image de la première image
        if (addImage.files && addImage.files[0]) {
          const reader = new FileReader();
          reader.onload = function(e) {
            console.log(e);
            console.log(e.target.result);
            blah.src = e.target.result;
            montrer.style.display = "block";
            apercu.style.display = "none";
          };
          reader.readAsDataURL(addImage.files[0]);
        } else {
          blah.src = "";
          montrer.style.display = "";
          apercu.style.display = "";
        }
        
      } else {
        alert("Attention vous n'avez pas sélectionné de catégorie !");
      }
    });
});
};

genererImage ();





