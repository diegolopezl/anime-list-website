$(document).ready(function () {
  $("#episodes, #minutes").val("");
  $(".calculate-results").on("click", function () {
    const episodes = $("#episodes").val();
    const minutesPerEpisode = $("#minutes").val();

    let totalTimeInMinutes = episodes * minutesPerEpisode;
    let days = Math.floor(totalTimeInMinutes / 1440);
    let hours = Math.floor((totalTimeInMinutes % 1440) / 60);
    let minutes = totalTimeInMinutes % 60;

    let formattedTime =
      ("00" + days).slice(-2) +
      ":" +
      ("00" + hours).slice(-2) +
      ":" +
      ("00" + minutes).slice(-2);
    $(".results").text(formattedTime);
  });
});
