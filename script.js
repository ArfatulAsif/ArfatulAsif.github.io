// Find the button and message elements
const button = document.getElementById("helloButton");
const message = document.getElementById("message");

// Run this code when the button is clicked
button.addEventListener("click", function () {
    message.textContent = "Hello! JavaScript is working 🎉";
});
