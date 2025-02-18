let cart = [];
let sales = {};
document.addEventListener("DOMContentLoaded", function () {
    let collapsibleButtons = document.querySelectorAll(".collapsible");
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function () {
            let content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let collapsibleButtons = document.querySelectorAll(".collapsible1");
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function () {
            let content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let collapsibleButtons = document.querySelectorAll(".collapsible2");
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function () {
            let content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let collapsibleButtons = document.querySelectorAll(".collapsible3");
    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function () {
            let content = this.nextElementSibling;
            content.style.display = (content.style.display === "block") ? "none" : "block";
        });
    });
});
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((product, index) => {
        let li = document.createElement("li");
        li.textContent = `${product.item} - ₹${product.price}`;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function () {
            cart.splice(index, 1);
            updateCart();
        };
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += product.price;
    });
    totalPrice.textContent = total;
}
function clearCart() {
    cart = [];
    updateCart();
}
function updateSales() {
    let date = new Date().toISOString().split('T')[0];
    if (!sales[date]) {
        sales[date] = {};
    }
    cart.forEach(item => {
        sales[date][item.item] = (sales[date][item.item] || 0) + 1;
    });
    displaySales();
}
function displaySales() {
    let salesList = document.getElementById("sales-list");
    salesList.innerHTML = "";
    for (let date in sales) {
        for (let item in sales[date]) {
            let li = document.createElement("li");
            li.textContent = `${item} sold on ${date}: ${sales[date][item]}`;
            salesList.appendChild(li);
        }
    }
}
function resetSales() {
    sales = {};
    displaySales();
}
function printReceipt() {
    let receipt = "Café Cravings Receipt\n\n";
    cart.forEach(item => {
        receipt += `${item.item} - ₹${item.price}\n`;
    });
    receipt += `\nTotal: ₹${document.getElementById("total-price").textContent}`;
    alert(receipt);
    updateSales(); // Sales summary updates only after printing
    clearCart(); // Clears cart after printing receipt
}
