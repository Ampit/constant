const snackbar = (message) => {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");
  // Add data to the snackbar div
  x.innerHTML = message;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
};
