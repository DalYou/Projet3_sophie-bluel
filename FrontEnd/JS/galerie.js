const categories = "http://localhost:5678/api/categories"
const Login = "http://localhost:5678/api/users/login"
let categoryId = 0;

// Récupération de la galerie depuis le BackEnd 
const works = await fetch("http://localhost:5678/api/works");
const jsonGallery = await works.json();
console.log(jsonGallery);

//Vérifier si user est connecté
try{
  const token = JSON.parse(localStorage.getItem("bearer"));
  const connecte = token ? "flex" : "none";
  document.querySelectorAll(".connecte").forEach((element) => {
    element.style.display = connecte;
  })
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

// Appel de la fonction "genererProjets"
genererProjets(jsonGallery);

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


//Affichage des buttons de trie
function Trie() {
    if(localStorage.getItem("token")) {
      const buttontrie = document.querySelector("#buttontrie");
        buttontrie.style.display = "none";
    }
}

Trie ();

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

AdminMode();

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
    //supprButton.style.zIndex = 1;
    supprButton.style.position = "absolute";
    //supprButton.style.marginTop = "-105px";
    //supprButton.style.marginLeft = "51px";
    supprButton.style.background = "black";
    supprButton.style.top = "0";
    supprButton.style.right = "0";
    supprButton.style.color = "white";
    supprButton.style.margin = "5px";
    supprButton.style.fontSize = "10px";
    supprButton.style.display = "flex";
    supprButton.style.justifyContent = "center";
    supprButton.style.alignItems = "center";
    //supprButton.setAttribute("class", "corbeille")
    //supprButton.id = modal.id;
          
    divGalleryModal.appendChild(figureElement);    
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionElement);
    figureElement.appendChild(supprButton);
  };
  deleteGallery();
};
  
genererModal(jsonGallery);

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
  const corbeille = document.querySelectorAll(".corbeille");
  corbeille.forEach(function (corbeille) {
    corbeille.addEventListener("click",function(e){
      let id = e.target.parentNode.id
      fetch(`http://localhost:5678/api/works/${id}` , {
        method: "DELETE",
        body: null,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json charset=UTF-8",
        }, 
      }).then(async(response) => {
        alert("Projet supprimé");
        corbeille.parentNode.remove ();
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
    }).then(async (response) => {
      if (response.ok) {
        alert("Document ajouté");
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
        //apparition de l'élément
        //document.querySelector(".galleryeditor").innerHTML= "";
        //const works = await fetch("http://localhost:5678/api/works");
        //const articles = await works.json();
        //genererArticles();
        //genererModal();
        //returnModal ();
        
      } else {
        alert("Attention vous n'avez pas sélectionné de catégorie !");
      }
    });
});
};

genererImage ();

function verif () {
  const formulairePhoto = document.getElementById("btnvalider");
  const addImage = document.querySelector("#imgInp");
  const addTitre = document.getElementById("title");
  const addCategory = document.getElementById("category");

    if (!addImage.value) {
      formulairePhoto.className = "#btnvalider";
    }else {
      formulairePhoto.className = ".validermodif";
    };
};

verif();




