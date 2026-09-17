const foods = [
  { name: "Jollof Rice & Chicken", price: "₦3,500", category: "Rice", img: "assets/jollof.png" },
  { name: "Fried Rice & Turkey", price: "₦4,000", category: "Rice", img: "assets/fried.png" },
  { name: "Egusi Soup & Fufu", price: "₦3,000", category: "Soups", img: "assets/egusi.png" },
  { name: "Grilled Steak Special", price: "₦6,500", category: "Grills", img: "assets/steak.png" },
  { name: "Ofada Rice & Stew", price: "₦3,500", category: "Rice", img: "assets/ofada.png" },
  { name: "Afang Soup & Semo", price: "₦3,200", category: "Soups", img: "assets/afang.png" },
  { name: "Small Chops Pack", price: "₦2,500", category: "Small Chops", img: "assets/chops.png" },
  { name: "Event Catering", price: "From ₦150k", category: "Catering", img: "assets/catering.png" },
];
const categories = ["All", ...new Set(foods.map(f => f.category))];
const filterDiv = document.getElementById('filterButtons');
const grid = document.getElementById('menuGrid');

categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.innerText = cat;
  btn.onclick = () => filterMenu(cat, btn);
  filterDiv.appendChild(btn);
});
filterDiv.children[0].classList.add('active');

function filterMenu(category, btnClicked) {
  [...filterDiv.children].forEach(b => b.classList.remove('active'));
  btnClicked.classList.add('active');

  const filtered = category === "All" ? foods : foods.filter(item => item.category === category);
  renderMenu(filtered);
}

function renderMenu(list) {
  grid.innerHTML = "";
  list.forEach(food => {
    grid.innerHTML += `
      <div class="card">
        <img src="${food.img}" alt="${food.name}">
        <div class="card-content">
          <small>${food.category}</small>
          <h3>${food.name}</h3>
          <p class="price">${food.price}</p>
          <button class="order-btn" onclick="orderOnWhatsApp('${food.name}')">Order Now</button>
        </div>
      </div>
    `;
  });
}

function orderOnWhatsApp(foodName) {
  const number = "09159627267";
  const message = `Hello Adeh's Kitchen, I want to order ${foodName}`;
  window.open(`https://wa.me/234${number.substring(1)}?text=${encodeURIComponent(message)}`, '_blank');
}

renderMenu(foods);