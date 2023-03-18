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

//Affichage du bouton logout

function AdminMode() {
    if (localStorage.getItem('token')) {
      const login = document.querySelector("nav > ul > li > a");
      login.innerHTML = "<a href=index.html>logout</a>";
    }; 
};

AdminMode();

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

//Au clic sur le bouton logout

const logout = document.querySelector(".login");

logout.addEventListener("click", function (event) {
    if (event.target("#logout")) {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    };
});

const btn_photo = document.getElementById("btn_photo");
const modale2 = document.getElementById("modal2");
const modale1 = document.getElementById("modal1");

function returnModal () {
  const backmodal = document.querySelector(".modal2Return");
  backmodal.style.display = none;
}

/**Catégorie Modal 2 */
// function SelectFormulaire() {
//     fetch(category)
//         .then(function(response) {
//             if (response.ok) {
//                 return response.json();

//             }
//         })
//         .then(function(data) {
//             data.unshift({
//               id: 0,
//               name: ''
//             })
//             for(let category of data) {
//               const select = document.createElement("option");
//               select.classList.add("optionCategories");
//               select.setAttribute("id");
//               select.setAttribute("name");
//               select.innerText = category.name;
//               const selCategory = document.getElementById("category");
//               selCategory.append(select)
//             }
//         })        
// }

function sendData() {
  const title = document.getElementById("title").ariaValueMax;
  const selectformulaire = document.getElementById("category");
  const choice = category.value;
  const category = category.option[choice].id;
  const file = document.getElementById("imgInd").files[0];

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", file);
  formData.append("category", category);

  const token = localStorage.getItem("token");
  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer ${token}",
    }, 
  })

      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log("Données envoyée avec succès !");
        } else {
          console.error ("Erreur lors de l'envoi des données");
        };
      });
        //.catch(error => console.error("Erreur lors de l'envoi des données"));
};

//Ajout photos




// const imgInp = document.querySelector("#imgInp");

// imgInp.addEventListener("change", previoufile);

// function previoufile() {
// const file_extension_regex = /\.(jpeg|jpg|png|gif)$/i;
//   if(this.files.length === 0 || !file_extension_regex.test(this.files[0].name)) {
//   return;
// }

// const file = this.files[0];


// const file_reader = new FileReader();

// file_reader.readAsDataURL(file);

// file_reader.addEventListener("load", (event) => displayImage(event, file));

// }



// function displayImage(event, file) {
//   const figure_element = document.createElement("figure");
//   figure_element.classList.add("figureElement");

//FormData.append("image", file)
  //const image_element = document.createElement("img");
  //image_element.src = event.target.result;

  //figure_element.appendChild(image_element);

  //document.body.querySelector(".gallery").appendChild(figure_element);
//}



/**Bouton Modifier**/

// function ButtonIntro() {
//   let modifier = document.createElement('a');
//   modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
// };

// ButtonIntro();



