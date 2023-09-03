const displayPhones = document.querySelector("#displayPhones");
const displayLaptops = document.querySelector("#displayLaptops");
const main = document.querySelector("#main");
const openBtn = document.querySelector("#open_cart_btn");
const cart = document.querySelector("#sidecart");
const closeBtn = document.querySelector("#close_btn");
const backdrop = document.querySelector(".backdrop");

xmlRequest(`${baseBackendURL}`, "GET")
  .then((result) => {
    result.products.forEach((card, index) => {
      if (index === 10) {
        return;
      }

      if (index >= 0 && index < 3) {
        cardArray.push(card);
        displayPhones.innerHTML += creatCard(card);
      }

      if (index >= 5 && index < 8) {
        cardArray.push(card);
        displayLaptops.innerHTML += creatCard(card);
      }
    });
  })
  .catch((err) => {
    console.log("server is down", err);
  });

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);

function openCart() {
  cart.classList.add("open");
  backdrop.style.display = "block";
  setTimeout(() => {
    backdrop.classList.add("show");
  }, 0);
}

function closeCart() {
  cart.classList.remove("open");
  backdrop.classList.remove("show");
  backdrop.style.display = "none";
  setTimeout(() => {
    backdrop.classList.remove("show");
  }, 500);
}

function openCartFromOverlay() {
  remove();
  openCart();
}
