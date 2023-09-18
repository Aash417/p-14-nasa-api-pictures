const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

function updateDOM() {
	resultsArr.forEach((e) => {
		// card container
		const card = document.createElement("div");
		card.classList.add("card");
		// Link
		const link = document.createElement("a");
		link.href = e.hurl;
		link.title = "View full image";
		link.target = "_blank";
		// Image
		const image = document.createElement("img");
		image.src = e.url;
		image.alt = "nasa pic of the day";
		image.loading = "lazy";
		image.classList.add("card-img-top");
		// Card-body
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");
		// Const title
		const cardTitle = document.createElement("h5");
		cardTitle.classList.add("card-title");
		cardTitle.textContent = e.title;
		// Save-Text
		const saveText = document.createElement("p");
		saveText.classList.add("clickable");
		saveText.textContent = "Add to favorites";
		saveText.setAttribute("onclick", `saveFavorite('${e.url}')`);
		// Card Text
		const cardText = document.createElement("p");
		cardText.textContent = e.explanation;
		// Footer container
		const footer = document.createElement("small");
		footer.classList.add("text-muted");
		// Date
		const date = document.createElement("strong");
		date.textContent = e.date;
		// Copyright
		const copyright = document.createElement("span");
		copyright.textContent = ` ${e.copyright ? e.copyright : " "}`;

		// Append
		footer.append(date, copyright);
		cardBody.append(cardTitle, saveText, cardText, footer);
		link.appendChild(image);
		card.append(link, cardBody);

		// console.log(card);
		imagesContainer.appendChild(card);
	});
}

// Nasa api
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArr = [];
let favorites = {};

// get images from nasa api
const getNasaPictures = async () => {
	try {
		const res = await fetch(apiUrl);
		resultsArr = await res.json();

		console.log(resultsArr);
		updateDOM();
	} catch (error) {
		console.log(error);
	}
};

// Add result to favorites
function saveFavorite(item) {
	// console.log(item);
	resultsArr.forEach((e) => {
		if (e.url.includes(item) && !favorites[item]) {
			favorites[item] = e;

			// Show save confirmation for 2 seconds
			saveConfirmed.hidden = false;
			setTimeout(() => {
				saveConfirmed.hidden = true;
			}, 2000);

			// Save favorites in local storage
			localStorage.setItem("nasaFav", JSON.stringify(favorites));
		}
	});
	console.log(favorites);
}

// on load
getNasaPictures();
