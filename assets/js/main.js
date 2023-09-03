const baseBackendURL = "https://dummyjson.com/products";

const cardArray = [];
let cartArray = JSON.parse(localStorage.getItem("CART")) || [];

function creatCard(card) {
  updateCart();
  return `
    <div class="card" style="width: 18rem;">
      <img src="${card.thumbnail}" class="card-img-top" alt="${card.title} image">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Brand : ${card.brand}</li>
        <li class="list-group-item">Rating : ${card.rating} <i class="fa-solid fa-star" style="color: #ffd700;"></i></li>
        <li class="list-group-item">Price : ${card.price} <i class="fa-solid fa-dollar-sign" style="color: #1f5125;"></i></li>
      </ul>
      <div class="card-body">
         <a  class="card-link"><button class="btn btn-primary" onClick="previewCard('${card.id}')">Quick View</button></a>
         <a class="card-link"><button class="btn btn-primary bttns" onClick="addToCart(${card.id})">Add To Cart</button></a>
      </div>
    </div>
  `;
}

function xmlRequest(url, method, body = {}) {
  const xml = new XMLHttpRequest();
  xml.open(method, url);
  if (method !== "GET") {
    xml.setRequestHeader("Content-Type", "application/json");
  }
  xml.send(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    xml.onloadend = () => {
      if (xml.status === 200 || xml.status === 201 || xml.status === 4) {
        resolve(JSON.parse(xml.responseText));
      } else {
        reject(xml);
      }
    };
  });
}

function previewCard(id) {
  const card = cardArray.find((card) => card.id === Number(id));

  main.innerHTML += `<div class="overlay" id="myOverlay">
  <div class="card" >
      <img src="${card.thumbnail}"  alt="${card.title} image">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <p class="card-text">${card.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Brand : ${card.brand}</li>
        <li class="list-group-item">Rating : ${card.rating} <i class="fa-solid fa-star" style="color: #ffd700;"></i></li>
        <li class="list-group-item">Price :${card.price}<i class="fa-solid fa-dollar-sign" style="color: #1f5125;"></i></li>
      </ul>
      <div class="card-body">
        <a class="card-link"><button class="btn btn-primary bttns" onClick="addToCart(${card.id})">Add To Cart</button></a>
        <a class="card-link"><button class="btn btn-primary" onClick="openCartFromOverlay()">View in cart</button></a>
        <button class="close btn btn-danger" onClick="remove()" ><i class="fa-solid fa-xmark" style="color: #000000;"></i></button>
      </div>
    </div>
</div>`;
}

function remove() {
  const overlay = document.querySelector("#myOverlay");
  overlay.remove();
}

function addToCart(id) {
  if (cartArray.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    let item = cardArray.find((card) => card.id === Number(id));
    cartArray.push({ ...item, numberOfUnits: 1 });
  }

  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubTotal();

  localStorage.setItem("CART", JSON.stringify(cartArray));
}

function renderCartItems() {
  cartItems.innerHTML = "";
  cartArray.forEach((item) => {
    cartItems.innerHTML += `
    <div class="cart_item">
        <div class="remove_item">
          <span onClick="removeItemFromCart(${item.id})">&times;</span>
        </div>
        <div class="item_img">
          <img
            src="${item.thumbnail}"
            alt=""
          />
        </div>
        <div class="item_details">
          <p>${item.title}</p>
          <strong>$${item.price}</strong>
          <div class="qty">
            <span onClick="changeNumberOfUnits('minus',${item.id})">-</span>
            <strong>${item.numberOfUnits}</strong>
            <span onClick="changeNumberOfUnits('plus',${item.id})">+</span>
          </div>
        </div>
      </div>`;
  });
}

function changeNumberOfUnits(action, id) {
  cartArray = cartArray.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.stock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

function generateCartId(array) {
  array.unshift(Math.floor(Math.random() * 10000 + 10000));
  return array;
}

function renderSubTotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cartArray.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  numberItems.innerHTML = `${totalItems}`;
  subTotal.innerHTML = `${totalPrice}`;
  numberItemsE.innerHTML = `${totalItems}`;
}

function removeItemFromCart(id) {
  cartArray = cartArray.filter((item) => item.id !== id);
  updateCart();
}
function checkout() {
  generateCartId(cartArray);
  for (let i = 0; i < cartArray.length; i++) {
    if (cartArray.length > 1) {
      Swal.fire({
        icon: "success",
        title: `Your Order: #${cartArray[0]}`,
        text: `We got your order:
         total price is: ${subTotal.innerHTML}$`,
      });
      console.log(cartArray.title);
      console.log(cartArray);
      cartArray = [];
      localStorage.clear();
      updateCart();
    } else {
      Swal.fire({
        icon: "error",
        title: "Your Cart is Empty",
        text: "if you want to checkout add something to cart",
      });
    }
  }
}
