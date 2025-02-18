/* script.js */
// Categorized menu data
const menuData = {
  cheeseCakes: [
    { id: 1, name: "Oreo Cheesecake", price: 300, image: "images/oreocheesecake.png" },
    { id: 2, name: "Basque Cheesecake", price: 350, image: "images/basquecheesecake.jpg" },
    { id: 3, name: "Classic Cheesecake", price: 320, image: "images/classiccheesecake.jpg" }
  ],
  miniCheeseCakes: [
    { id: 4, name: "Biscoff Mini Cheesecake", price: 200, image: "images/biskoffminicheesecake.jpeg" },
    { id: 5, name: "Biscoff Mini Cheesecake", price: 210, image: "images/biskoffminicheesecake.jpeg" }
  ],
  chocolatePudding: [
    { id: 6, name: "Rich Chocolate Pudding", price: 180, image: "images/biskoffminicheesecake.jpeg" }
  ],
  cupCakes: [
    { id: 7, name: "Chocolate Cupcake", price: 150, image: "images/biskoffminicheesecake.jpeg" },
    { id: 8, name: "Vanilla Cupcake", price: 140, image: "images/biskoffminicheesecake.jpeg" }
  ]
};
let cart = [];
// Helper: Create and insert menu items into the specified container
function createMenuItems(sectionData, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  sectionData.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="addToCart(${item.id})">Add</button>
    `;
    container.appendChild(itemDiv);
  });
}
// Initialize all menu sections
function initializeMenu() {
  createMenuItems(menuData.cheeseCakes, "cheese-cakes");
  createMenuItems(menuData.miniCheeseCakes, "mini-cheese-cakes");
  createMenuItems(menuData.chocolatePudding, "chocolate-pudding");
  createMenuItems(menuData.cupCakes, "cup-cakes");
}
// Add item to cart
function addToCart(id) {
  const allItems = [].concat(
    menuData.cheeseCakes,
    menuData.miniCheeseCakes,
    menuData.chocolatePudding,
    menuData.cupCakes
  );
  const item = allItems.find(i => i.id === id);
  if (item) {
    cart.push(item);
    displayCart();
  }
}
// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart();
}
// Display cart items
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const cartDiv = document.createElement("div");
    cartDiv.className = "menu-item";
    cartDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:80px; height:80px;">
      <span>${item.name} - ₹${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(cartDiv);
  });
  document.getElementById("total").innerText = total;
}
// Print receipt in a receipt-friendly format
document.getElementById("print-bill").addEventListener("click", function () {
  let receiptContent = `
    <div style="font-family: monospace; text-align: center; padding: 10px;">
      <h2>Café Cravings Receipt</h2>
      <p>Thank you for your order!</p>
      <hr>
  `;
  cart.forEach(item => {
    receiptContent += `<p>${item.name} - ₹${item.price}</p>`;
  });
  receiptContent += `
      <hr>
      <h3>Total: ₹${document.getElementById("total").innerText}</h3>
      <p>Visit Again!</p>
    </div>
  `;
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: monospace; padding: 20px; }
          h2, h3 { text-align: center; }
          p { margin: 5px 0; }
        </style>
      </head>
      <body onload="window.print();window.close();">
        ${receiptContent}
      </body>
    </html>
  `);
  printWindow.document.close();
});
// Collapsible sections functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeMenu();
  const coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
});