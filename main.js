const giftsContainer = document.querySelector(".gifs-container");
const input = document.querySelector("input");
const button = document.querySelector(".btn");
const trendingUrl =
  "https://api.giphy.com/v1/gifs/trending?api_key=AtVnoZaM6IzFTqjKY2e2NPFeg7kIs9kI&limit=25";

let searchUrl =
  "https://api.giphy.com/v1/gifs/search?api_key=AtVnoZaM6IzFTqjKY2e2NPFeg7kIs9kI&limit=25&offset=0&q=query";

// fetchs data
const fetchingifs = async (query) => {
  try {
    if (query) {
      const res = await fetch(`${searchUrl}q=${query}`);
      removingChildren();
      normalizeData(res);
      return;
    }
    const res = await fetch(trendingUrl);
    normalizeData(res);
  } catch (error) {
    console.log(error);
  }
};
// create Dom elements to be shown
const showGifs = (currentlyShowing) => {
  currentlyShowing.forEach((item, i) => {
    const imgContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    imgContainer.classList.add("img-container");
    imgElement.src = item.images.downsized_medium.url;
    imgElement.alt = item.title;
    imgContainer.append(imgElement);
    giftsContainer.append(imgContainer);
  });
};
// remove elements previously loaded
const removingChildren = () => {
  Array.from(giftsContainer.children).forEach((child) => {
    giftsContainer.removeChild(child);
  });
};

// sets data to a json
const normalizeData = async (res) => {
  const resJson = res.json();
  showGift(resJson.data);
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  fetchingifts(input.value);
  input.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  fetchingifs();
});
