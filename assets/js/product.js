const chosenPhones = document.querySelector("#nav-bar-phones");
const display = document.querySelector("#display");
const displayMobile = document.querySelector("#displayMobile");
const displayThisLaptops = document.querySelector("#displayThisLaptops");
const subTotal = document.querySelector("#subtotal_price");
const numberItems = document.querySelector("#items_num");
const numberItemsE = document.querySelector("#items_num_e");
const cartItems = document.querySelector("#cart_items");
const checkoutButton = document.querySelector("#checkout");

if (display) {
  xmlRequest(`${baseBackendURL}`, "GET")
    .then((result) => {
      result.products.forEach((card, index) => {
        if (index === 10) {
          return;
        }
        if (index >= 0 && index < 10) {
          cardArray.push(card);

          display.innerHTML += creatCard(card);
        }
      });
    })
    .catch((err) => {
      console.log("server is down", err);
    });
}

if (displayMobile) {
  xmlRequest(`${baseBackendURL}`, "GET")
    .then((result) => {
      result.products.forEach((card, index) => {
        if (index === 10) {
          return;
        }
        if (index >= 0 && index < 5) {
          cardArray.push(card);

          displayMobile.innerHTML += creatCard(card);
        }
      });
    })
    .catch((err) => {
      console.log("server is down", err);
    });
}

if (displayThisLaptops) {
  xmlRequest(`${baseBackendURL}`, "GET")
    .then((result) => {
      result.products.forEach((card, index) => {
        if (index === 10) {
          return;
        }
        if (index >= 5 && index < 10) {
          cardArray.push(card);

          displayThisLaptops.innerHTML += creatCard(card);
        }
      });
    })
    .catch((err) => {
      console.log("server is down", err);
    });
}

checkoutButton.addEventListener("click", checkout);
