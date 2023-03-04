$.getJSON(
  "https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw",
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
        const img = $("<div>")
          .attr("src", anime.images.jpg.image_url)
          .addClass("card-img");
        img.css(
          "background-image",
          "url(" + anime.images.webp.large_image_url + ")"
        );
        const text = $("<div>").addClass("text-card");
        const title = $("<h2>").text(anime.title);

        // Truncate the synopsis to 100 characters and add a "read more" button
        const truncatedSynopsis = anime.synopsis.substring(0, 600);
        const fullSynopsis = anime.synopsis;
        const synopsis = $("<p>").text(truncatedSynopsis + "...");
        const readMoreBtn = $("<button>")
          .text("Read more")
          .addClass("read-more");
        const animeInfo = $("<p>")
          .text(
            "TV ・ Episodes " +
              anime.episodestitle +
              " ・ " +
              anime.studios[0].name +
              " ・ Score: " +
              anime.score
          )
          .addClass("anime-info");
        readMoreBtn.on("click", function () {
          card.css("height", "100%");
          if (synopsis.text() === truncatedSynopsis + "...") {
            synopsis.text(fullSynopsis);
            readMoreBtn.text("Read less");
          } else {
            card.css("height", "300px");
            synopsis.text(truncatedSynopsis + "...");
            readMoreBtn.text("Read more");
          }
        });
        text.append(title, animeInfo, synopsis, readMoreBtn);
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
