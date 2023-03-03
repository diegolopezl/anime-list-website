const topAiringContainer = $(".top-airing-container");
const mostPopularContainer = $(".most-popular-container");
const upcomingContainer = $(".upcoming-container");
const topAiringUrl =
  "https://api.jikan.moe/v4/top/anime?enum=tv&filter=airing&limit=15";
const mostPopularUrl =
  "https://api.jikan.moe/v4/top/anime?enum=tv&filter=bypopularity&limit=15";
const upcomingUrl =
  "https://api.jikan.moe/v4/top/anime?enum=tv&filter=upcoming&limit=2";

// Define a function to create a card element and append it to a container
function createCard(anime, container, cardClass, textClass) {
  const card = $("<fig>").addClass(cardClass);
  card.css(
    "background-image",
    "url(" + anime.images.webp.large_image_url + ")"
  );
  const cardText = $("<div>").addClass(textClass);
  const genre = $("<p>");
  const title = $("<h4>");
  const longTitle = anime.title.substring(0, 20);
  if (anime.title.length > longTitle.length) {
    title.text(longTitle + "...");
  } else {
    title.text(anime.title);
  }
  if (anime.genres.length == 1) {
    genre.text(anime.genres[0].name);
  } else if (anime.genres.length > 1) {
    genre.text(anime.genres[0].name + " ・ " + anime.genres[1].name);
  }
  cardText.append(title, genre);
  card.append(cardText);
  container.append(card);
}

// Use $.getJSON() to get data from the API and create cards for each anime
$.getJSON(topAiringUrl, function (info) {
  const animeData = info.data;
  console.log(info.data);
  $(animeData).each((index, anime) => {
    createCard(anime, topAiringContainer, "top-airing-item", "ta-item-text");
  });
});

$.getJSON(mostPopularUrl, function (info) {
  const animeData = info.data;
  console.log(info.data);
  $(animeData).each((index, anime) => {
    createCard(
      anime,
      mostPopularContainer,
      "most-popular-item",
      "mp-item-text"
    );
  });
});

$.getJSON(upcomingUrl, function (info) {
  const animeData = info.data;
  console.log(info.data);
  $(animeData).each((index, anime) => {
    const upAnimeImg = $("<div>").addClass("up-image");
    upAnimeImg.css(
      "background-image",
      "url(" + anime.images.webp.large_image_url + ")"
    );
    const upAnimeInfo = $("<div>").addClass("up-info");
    const upAnimeTitle = $("<h4>").text(anime.title);
    const upAnimeDesc = $("<p>").text(anime.synopsis);
    const upAnimeLink = $("<a>").text("Read More");
    upAnimeLink.attr("href", anime.url);
    upAnimeInfo.append(upAnimeTitle, upAnimeDesc, upAnimeLink);
    const upcomingItem = $("<div>").addClass("upcoming-item");
    upcomingItem.append(upAnimeImg, upAnimeInfo);
    upcomingContainer.append(upcomingItem);
  });
});

$(document).ready(function () {
  $(".button-left-ta").on("click", function () {
    scrollSlider($(".top-airing-container"), "-=");
  });
  $(".button-left-mp").on("click", function () {
    scrollSlider($(".most-popular-container"), "-=");
  });

  $(".button-right-ta").click(function () {
    scrollSlider($(".top-airing-container"), "+=");
  });
  $(".button-right-mp").click(function () {
    scrollSlider($(".most-popular-container"), "+=");
  });

  function scrollSlider(container, direction) {
    let scrollAmount = 300; // set the amount of pixels to scroll
    let animationDuration = 250;
    container.animate(
      {
        scrollLeft: direction + scrollAmount,
      },
      animationDuration
    );
  }

  resetScrolls($(".most-popular-container"));
  resetScrolls($(".top-airing-container"));
  function resetScrolls(container) {
    container.scrollLeft(0);
  }
});
