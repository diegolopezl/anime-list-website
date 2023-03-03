$.getJSON(
  "https://api.jikan.moe/v4/top/anime?filter=bypopularity",
  function (info) {
    const animeContainer = $(".anime-container");
    console.log(info.data);
    function filterAnime(query) {
      animeContainer.empty();

      const filteredData = info.data.filter((anime) => {
        return anime.title.toLowerCase().includes(query.toLowerCase());
      });

      if (filteredData.length === 0) {
        const noResults = $("<p>")
          .text("No results found.")
          .addClass("no-results");
        animeContainer.append(noResults);
        return;
      }

      filteredData.forEach((anime) => {
        const card = $("<div>").addClass("card");
        const img = $("<img>")
          .attr("src", anime.images.jpg.image_url)
          .addClass("card-img");
        const text = $("<div>").addClass("text-card");
        const title = $("<h2>").text(anime.title);

        // Truncate the synopsis to 100 characters and add a "read more" button
        const truncatedSynopsis = anime.synopsis.substring(0, 600);
        const fullSynopsis = anime.synopsis;
        const synopsis = $("<p>").text(truncatedSynopsis + "...");
        const readMoreBtn = $("<button>")
          .text("Read more")
          .addClass("read-more");
        readMoreBtn.on("click", function () {
          if (synopsis.text() === truncatedSynopsis + "...") {
            synopsis.text(fullSynopsis);
            readMoreBtn.text("Read less");
          } else {
            synopsis.text(truncatedSynopsis + "...");
            readMoreBtn.text("Read more");
          }
        });
        text.append(title, synopsis, readMoreBtn);
        card.append(img, text);
        animeContainer.append(card);
      });
    }

    $("#search-input").on("input", function () {
      const query = $(this).val();
      filterAnime(query);
    });

    filterAnime("");
  }
);
