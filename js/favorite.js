const menuButton = document.getElementById("menu-hamburguer")

const aside = () => {
    menuButton.style.display = "none"
    menuButton.style.opacity = 0;
    document.querySelector("aside").style.transform = "translateX(0%)";
    document.querySelector(".main").style.marginLeft = "150px"
    if(window.screen.width <= 600){
      document.querySelector("#close-button-aside").style.marginLeft = "85vw"
      document.querySelector("#close-button-aside").style.marginTop = "1vh"
      document.querySelector(".main").style.display = "none"
      document.querySelectorAll(".link").forEach((link) => link.style.width = "100vw")
    }
};

document.querySelector("aside img").addEventListener("click", () => {
  menuButton.style.display = "flex";
  document.querySelector("aside").style.transform = "translateX(-100%)";
  document.querySelector(".main").style.marginLeft = "0px"
  if(window.screen.width <= 600){
    setTimeout(() => {
      document.querySelector(".main").style.display = "block"
    }, 300)
  }
  setTimeout(() => {
    menuButton.style.opacity = "1";
  }, 200)
});

menuButton.addEventListener("click", () => {
  aside()
})

document.querySelector("#home").addEventListener("click", () => {
  window.location.href = "index.html" 
})