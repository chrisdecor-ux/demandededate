const noButton = document.getElementById("noButton");

const yesButton = document.getElementById("yesButton");

yesButton.addEventListener("click", function() {

    window.location.href = "page2.html";

});

noButton.addEventListener("mouseover", function() {

    const btnWidth  = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    const x = Math.random() * (window.innerWidth  - btnWidth);
    const y = Math.random() * (window.innerHeight - btnHeight);

    noButton.style.left = x + "px";
    noButton.style.top  = y + "px";

});