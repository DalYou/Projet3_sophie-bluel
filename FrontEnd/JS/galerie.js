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
  });
}catch (error){
 console.error(error);
}

//Déclaration de la fonction générer la gallerie page index
function genererProjets(jsonGallery) {
  const divGallery = document.querySelector(".gallery");
  //on vide le contenu de notre classe ".gallery" ou du moins son contenu Html
  divGallery.innerHTML = ""
  for (let i = 0; i < jsonGallery.length; i++) {
	  const projet = jsonGallery[i];	  
      //Récupération de l'élément du DOM qui accueillera les fiches + créations balises
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

// Affichage du bouton logout

//function AdminMode() {
    //if (localStorage.getItem('token')) {
      //const login = document.querySelector("nav > ul > li > a");
      //login.innerHTML = "<a href=index.html>logout</a>";
    //}; 
//};

//AdminMode();

/**Affichage de la gallerie dans la Modale **/

function genererModal(jsonGallery) {
  const divGalleryModal = document.querySelector(".galleryeditor");
  divGalleryModal.innerHTML = ""
  for (let i = 0; i < jsonGallery.length; i++) {
	  const modal = jsonGallery[i];	  
	  const figureElement= document.createElement("figure");
    figureElement.style.width = '50px';
    figureElement.style.height = '90px';	  
	  const imageElement = document.createElement("img");
	  imageElement.src = modal.imageUrl;
    imageElement.crossOrigin = "anonymous";
	  imageElement.alt = modal.title;
    imageElement.style.width = '100%';
    imageElement.style.objectFit = 'cover';
	  const descriptionElement = document.createElement("figcaption");
	  descriptionElement.innerText = 'éditer';
    const supprButton = document.createElement("i");
    supprButton.classList.add('fa', 'fa-light', 'fa-trash-can', 'corbeille');
    supprButton.style.width = "15px";
    supprButton.style.height = "15px";
    supprButton.style.zIndex = 1;
    supprButton.style.position = "fixed";
    supprButton.style.marginTop = "-81px";
    supprButton.style.marginLeft = "36px";
    supprButton.style.background = "white";
    //supprButton.setAttribute("class", "corbeille")
    supprButton.id = modal.id;
          
    divGalleryModal.appendChild(figureElement);    
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionElement);
    figureElement.appendChild(supprButton);  
  };
  deleteGallery();
};
  
genererModal(jsonGallery);

// mode fenetre modale
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

// passer de a modal2 à modal1
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
      let id = e.target.id
      fetch(`http://localhost:5678/api/works/${id}` , {
        method: "DELETE",
        body: null,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json charset=UTF-8",
        }, 
      }).then(async(response) => {
        alert("Projet supprimer");
        document.querySelector(".gallery").innerHTML = "";
        const works = await fetch("http://localhost:5678/api/works");
        const jsonmodal = await works.json();
        genererProjets(jsonmodal);
        genererModal(jsonmodal);
      });
    })
  })
}


// // Ajout d'un lien vers la modal sur Modifier
// const buttonModifier = document.querySelector("portfolio a #modal1");
//   buttonModifier.href = ".#modal1";
//   buttonModifier.classList.add("open-modal");

// //Ouverture de la modal au clic sur modifier
// document.addEventListener('click', function (event) {
//   if (event.target.matches('.open-modal')) {
//       openModal();
//   };
// });

const btn_photo = document.getElementById("btn_photo");
const modale2 = document.getElementById("modal2");
const modale1 = document.getElementById("modal1");
//Fermeture de la modal
// document.addEventListener("click", function (event) {
//     if (event.target("js-btn-close")) {
//       closeModal();
//     } else if (event.target("#modal1")) {
//       closeModal();
//     };
// });

// //Ouverture de la Modal2
// document.addEventListener("click", function (event) {
//     if (event.target.matches(".image")) {
//       const modalWrapper = document.querySelector("deleteGallery");
//       modalWrapper.style.display = "none";
//       genererModal();
//     }
// })

// btn_photo.addEventListener("click", () => {
//     if(getComputedStyle(modale1). display !="none"){;
//       modale1.style.display =  "none";
//     } else {
//       modale1.style.display = "block";
//     };
// });

// btn_photo.addEventListener("click", () => {
//   if(getComputedStyle(modale2). display !="none"){;
//    modale2.style.display =  "none";
//   } else {
//     modale2.style.display = "block";
//   };
// });

//   document.querySelectorbyId("#modal1").style.display = "none";
//   document.querySelectorById("#modal2").style.display = "block";
// })


//Au clic sur le bouton logout
document.addEventListener("click", function (event) {
    if (event.target.matches("#logout")) {
        localStorage.removeItem("token");
        window.location.href = "index.html"
    };
});

/**Affichage de Modal 2 Formulaire */

/**Ouvrir la modal 2*/

//document.addEventListener('click', function (event) {
  //if (event.target('#modal2')) {
      //const modal = document.querySelector('.btn_photo');
      //modal.style.display = 'none';
  //};
//});

function returnModal () {
  const backmodal = document.querySelector(".modal2Return");
  backmodal.style.display = none;
}

//Retour vers la modal au click

// document.addEventListener("click", function (event) {
//   if (event.target(".modal2return")) {
//     returnModal()
//   };
// });

/**Catégorie Modal 2 */
function SelectFormulaire() {
    fetch(categories)
        .then(function(response) {
            if (response.ok) {
                return response.json();

            }
        })
        .then(function(data) {
            data.unshift({
              id: 0,
              name: ''
            })
            for(let category of data) {
              const select = document.createElement("option");
              select.classList.add("optionCategories");
              select.setAttribute("id");
              select.setAttribute("name");
              select.innerText = category.name;
              const selCategory = document.getElementById("category");
              selCategory.append(select)
            }
        })        
}

/**Retour vers la page précédente */



/**Bouton Modifier**/

function ButtonIntro() {
  let modifier = document.createElement('a');
  modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
};

ButtonIntro();

