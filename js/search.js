$.getJSON("./anime.json", function (data) {
  const animeContainer = $(".anime-container");

  function filterAnime(query) {
    animeContainer.empty();

    const filteredData = data.filter((anime) => {
      return anime.title.toLowerCase().includes(query.toLowerCase());
    });

    if (filteredData.length === 0) {
      animeContainer.append($("<p>").text("No results found."));
      return;
    }

    filteredData.forEach((anime) => {
      const card = $("<div>").addClass("card");
      const image = $("<img>").attr("src", anime.image).addClass("card-img");
      const text = $("<div>").addClass("text-card");
      const title = $("<h2>").text(anime.title);
      const synopsis = $("<p>").text(anime.synopsis);
      text.append(title, synopsis);
      card.append(image, text);
      animeContainer.append(card);
    });
  }

  $("#search-input").on("input", function () {
    const query = $(this).val();
    filterAnime(query);
  });

  filterAnime("");
});
