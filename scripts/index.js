// was aiming for the icebox, but here is where the players are passed to the first round
let players = "Player1" + "-" + "Player2";
let form = document.querySelector("form");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.location = "/round-1.html#" + players;
});

// console.log(form); // used for debug
