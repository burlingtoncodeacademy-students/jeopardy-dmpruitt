let players = "Player1" + "-" + "Player2";
let form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.location = "/round-1.html#" + players;
});


console.log(form); // Debug