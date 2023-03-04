const newContainer = $(".new-container");
const newUrl = "https://api.jikan.moe/v4/top/anime?enum=tv&filter=upcoming";

function createCard(anime, container, cardClass, textClass) {
  const card = $("<fig>").addClass(cardClass);
  card.css(
    "background-image",
    "url(" + anime.images.webp.large_image_url + ")"
  );
  const link = $("<a>").attr("href", anime.url);
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
  link.append(card);
  container.append(link);
}

$.getJSON(newUrl, function (info) {
  const animeData = info.data;
  console.log(info.data);
  $(animeData).each((index, anime) => {
    createCard(anime, newContainer, "top-airing-item", "ta-item-text");
  });
});
