const products = [
  { id: 1, name: 'Noise-Canceling Headphones', category: 'Electronics', price: 89.99, image: 'watch-1.jpg' },
  { id: 2, name: 'Classic Campus Backpack', category: 'Accessories', price: 44.5, image: 'bag.svg' },
  { id: 3, name: 'Running Sneakers', category: 'Footwear', price: 65.0, image: 'shoe-1.jpg' },
  { id: 4, name: 'Smart Fitness Watch', category: 'Electronics', price: 120.0, image: 'watch-3.jpg' },
  { id: 5, name: 'Unisex Hoodie', category: 'Clothing', price: 39.95, image: 'jacket-2.jpg' },
  { id: 6, name: 'Floral Perfume', category: 'Cosmetics', price: 32.0, image: 'perfume.jpg' }
];

const cart = new Map();

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const message = document.getElementById('message');

function renderProducts(items) {
  productGrid.innerHTML = items
    .map(
      (product) => `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-body">
          <h4>${product.name}</h4>
          <p>${product.category}</p>
          <div class="product-meta">
            <span class="price">$${product.price.toFixed(2)}</span>
            <button class="btn btn-primary" data-add="${product.id}">Add to Cart</button>
          </div>
        </div>
      </article>
    `
    )
    .join('');
}

function renderCart() {
  if (cart.size === 0) {
    cartItems.innerHTML = '<p>Your cart is empty. Add something you like.</p>';
    cartCount.textContent = '0';
    cartTotal.textContent = '$0.00';
    return;
  }

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.innerHTML = [...cart.values()]
    .map((item) => {
      totalItems += item.qty;
      totalPrice += item.qty * item.price;

      return `
        <div class="cart-item">
          <span>${item.name} (x${item.qty})</span>
          <span>$${(item.price * item.qty).toFixed(2)}</span>
          <button data-remove="${item.id}">Remove</button>
        </div>
      `;
    })
    .join('');

  cartCount.textContent = String(totalItems);
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.get(id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.set(id, { ...product, qty: 1 });
  }

  renderCart();
  message.textContent = `${product.name} added to cart.`;
}

function removeFromCart(id) {
  const item = cart.get(id);
  if (!item) return;

  cart.delete(id);
  renderCart();
  message.textContent = `${item.name} removed from cart.`;
}

productGrid.addEventListener('click', (event) => {
  const addBtn = event.target.closest('[data-add]');
  if (!addBtn) return;

  addToCart(Number(addBtn.dataset.add));
});

cartItems.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('[data-remove]');
  if (!removeBtn) return;

  removeFromCart(Number(removeBtn.dataset.remove));
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});

checkoutBtn.addEventListener('click', () => {
  if (cart.size === 0) {
    message.textContent = 'Cart is empty. Please add products before checkout.';
    return;
  }

  message.textContent = 'Checkout simulated successfully. (Demo for university project)';
  cart.clear();
  renderCart();
});

renderProducts(products);
renderCart();
