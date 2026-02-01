let cart = [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalEl = document.getElementById("total");
const cartSection = document.getElementById("cart");
const checkoutSection = document.getElementById("checkout");
const checkoutBtn = document.getElementById("checkout-btn");

/* ADD TO CART */
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const product = btn.closest(".product");
        const name = product.querySelector("h3").innerText;
        const price = Number(product.dataset.price); // 🔥 FIX

        if (isNaN(price)) return;

        const existing = cart.find(i => i.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCart();
    });
});

/* UPDATE CART */
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartSection.classList.add("hidden");
        checkoutSection.classList.add("hidden");
        cartCount.textContent = "0";
        totalEl.textContent = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        count += item.qty;

        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
            <span class="cart-name">${item.name}</span>

            <div class="cart-qty">
                <button class="qty-btn minus" data-index="${index}">−</button>
                <span>${item.qty}</span>
                <button class="qty-btn plus" data-index="${index}">+</button>
            </div>

            <span class="cart-price">$${itemTotal.toFixed(2)}</span>
        `;

        cartItems.appendChild(row);
    });

    totalEl.textContent = total.toFixed(2);
    cartCount.textContent = count;
    cartSection.classList.remove("hidden");

    /* QTY CONTROLS */
    document.querySelectorAll(".plus").forEach(btn => {
        btn.onclick = () => {
            cart[btn.dataset.index].qty++;
            updateCart();
        };
    });

    document.querySelectorAll(".minus").forEach(btn => {
        btn.onclick = () => {
            const i = btn.dataset.index;
            cart[i].qty--;
            if (cart[i].qty === 0) cart.splice(i, 1);
            updateCart();
        };
    });
}

/* SHOW CHECKOUT */
checkoutBtn.addEventListener("click", () => {
    checkoutSection.classList.remove("hidden");
});

/* PLACE ORDER */
document.getElementById("checkout-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Order placed successfully!");
    cart = [];
    updateCart();
});
