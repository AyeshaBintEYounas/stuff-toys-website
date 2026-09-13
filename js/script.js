document.addEventListener("DOMContentLoaded", () => {
  // 1) Responsive hamburger navigation
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.textContent = open ? "✕" : "☰";
    });
  }

  // 2) Client-side shopping cart using localStorage
  const getCart = () => JSON.parse(localStorage.getItem("stuffToysCart") || "[]");
  const saveCart = cart => localStorage.setItem("stuffToysCart", JSON.stringify(cart));
  const updateCount = () => {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
  };

  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const cart = getCart();
      const name = btn.dataset.product;
      const price = Number(btn.dataset.price);
      const existing = cart.find(item => item.name === name);
      if (existing) existing.qty += 1;
      else cart.push({ name, price, qty: 1 });
      saveCart(cart);
      updateCount();
      btn.textContent = "✓ Added";
      setTimeout(() => btn.textContent = "Add to cart", 900);
    });
  });

  const renderCart = () => {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if (!container || !totalEl) return;
    const cart = getCart();
    if (!cart.length) {
      container.innerHTML = '<div class="empty-cart"><span>🧸</span><h2>Your cart is empty</h2><p>Add a cute friend from the products page.</p><a class="btn" href="products.html">Browse Products →</a></div>';
      totalEl.textContent = "Rs. 0";
      return;
    }
    container.innerHTML = cart.map((item, index) => `
      <article class="cart-item">
        <div><h3>${item.name}</h3><p>Rs. ${item.price} each</p></div>
        <div class="cart-actions"><input class="qty" data-index="${index}" type="number" min="1" value="${item.qty}" aria-label="Quantity for ${item.name}">
        <strong>Rs. ${item.price * item.qty}</strong><button class="remove-item" data-index="${index}">Remove</button></div>
      </article>`).join("");
    totalEl.textContent = "Rs. " + cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    container.querySelectorAll(".qty").forEach(input => input.addEventListener("change", e => {
      const c = getCart(); c[Number(e.target.dataset.index)].qty = Math.max(1, Number(e.target.value) || 1); saveCart(c); renderCart(); updateCount();
    }));
    container.querySelectorAll(".remove-item").forEach(btn => btn.addEventListener("click", e => {
      const c = getCart(); c.splice(Number(e.target.dataset.index), 1); saveCart(c); renderCart(); updateCount();
    }));
  };
  renderCart();
  updateCount();

  // 3) Product search + sorting
  const grid = document.getElementById("productGrid");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const resultCount = document.getElementById("resultCount");
  if (grid && search && sort) {
    const cards = [...grid.children];
    const refreshProducts = () => {
      const query = search.value.toLowerCase().trim();
      let visible = cards.filter(card => card.dataset.name.toLowerCase().includes(query));
      const mode = sort.value;
      visible.sort((a,b) => {
        if (mode === "low") return Number(a.dataset.price) - Number(b.dataset.price);
        if (mode === "high") return Number(b.dataset.price) - Number(a.dataset.price);
        if (mode === "name") return a.dataset.name.localeCompare(b.dataset.name);
        return cards.indexOf(a) - cards.indexOf(b);
      });
      grid.innerHTML = "";
      visible.forEach(card => grid.appendChild(card));
      resultCount.textContent = `${visible.length} product${visible.length === 1 ? "" : "s"}`;
    };
    search.addEventListener("input", refreshProducts);
    sort.addEventListener("change", refreshProducts);
  }

  // 4) Gallery modal
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
    modalImg.src = item.dataset.full;
    modalImg.alt = item.querySelector("img").alt;
    modalCaption.textContent = item.querySelector("span").textContent;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }));
  const closeModal = () => { if (modal) { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); } };
  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // 5) FAQ accordion
  document.querySelectorAll(".accordion").forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("active");
    const panel = button.nextElementSibling;
    panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
  }));

  // 6) Contact form validation
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      let valid = true;
      const fields = [
        [document.getElementById("name"), "Please enter your name."],
        [document.getElementById("email"), "Please enter a valid email.", value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)],
        [document.getElementById("subject"), "Please enter a subject."],
        [document.getElementById("message"), "Please write a message."]
      ];
      fields.forEach(([input, message, test]) => {
        const error = input.parentElement.querySelector(".error");
        const value = input.value.trim();
        const ok = value && (!test || test(value));
        error.textContent = ok ? "" : message;
        input.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      const terms = document.getElementById("terms");
      if (!terms.checked) { alert("Please confirm that you understand this is a static demo form."); valid = false; }
      document.getElementById("formSuccess").classList.toggle("show", valid);
      if (valid) form.reset();
    });
  }
});