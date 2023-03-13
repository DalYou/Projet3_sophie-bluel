// Récupération de la galerie depuis le BackEnd 
const works = await fetch("http://localhost:5678/api/works");
const jsonGallery = await works.json();
  console.log(jsonGallery);

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

/**Affichage de la gallerie dans la Modale **/

function genererModal(jsonGallery) {
  const divGalleryModal = document.querySelector(".gallery_modal");
  divGalleryModal.innerHTML = ""
  for (let i = 0; i < jsonGallery.length; i++) {
	  const modal = jsonGallery[i];	  
	  const figureElement= document.createElement("figure");
    figureElement.style.width = '50px';
    figureElement.style.height = '90px';	  
	  const imageElement = document.createElement("img");
	  imageElement.src = modal.imageUrl;
	  imageElement.alt = modal.title;
    imageElement.style.width = '100%';
    imageElement.style.objectFit = 'cover';
	  const descriptionElement = document.createElement("figcaption");
	  descriptionElement.innerText = 'éditer';
    const supprButton = document.createElement("i");
    supprButton.classList.add('fa', 'fa-light', 'fa-trash-can');
    supprButton.style.width = "15px";
    supprButton.style.height = "15px";
    supprButton.style.zIndex = 1;
    supprButton.style.position = "fixed";
    supprButton.style.marginTop = "-81px";
    supprButton.style.marginLeft = "36px";
    supprButton.style.background = "white";
    supprButton.setAttribute("class", "corbeille")
    supprButton.id = modal.id;
          
    divGalleryModal.appendChild(figureElement);    
    figureElement.appendChild(imageElement);
    figureElement.appendChild(descriptionElement);
    figureElement.appendChild(supprButton);
      
  };
  };
  
genererModal(jsonGallery);
 

function deleteGallery() {
  const corbeille = document.querySelectorAll(".corbeille");
  corbeille.forEach(function (corbeille) {
    corbeille.addEventListener("click",function(e){
      let id = e.target.id
      fetch('http://localhost:5678/api/works/${id}' , {
        method: 'DELETE',
        body: null,
        headers: {
          "Authorization": 'Bearer ${localStorage.getItem("token")}',
          "Content-type": "application/json charset=UTF-8"
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

/**Affichage de Modal 2 Formulaire */

/**Ouvrir la modal 2*/

function Modal2Form () {
  const modalWrapper = document.querySelector(".modal-wrapper");
}

document.addEventListener('click', function (event) {
    if (event.target.matches('.#modal2')) {
        const modal = document.querySelector('.modal');
        modal.style.display = 'none';
        Modal2Form();
    };
});

function returnModal () {
  const backmodal = document.querySelector(".modal2Return");
  backmodal.style.display = none;
}

document.addEventListener('click', function (event) {
    if (event.target.matches('')) {
        returnModal ()
  };
});

/**Catégorie Modal 2 */


/**Bouton Modifier**/

function ButtonIntro() {
  let modifier = document.createElement('a');
  modifier.innerHTML = '<i class="fas fa-regular fa-pen-to-square fa-lg"></i> modifier';
};

ButtonIntro();