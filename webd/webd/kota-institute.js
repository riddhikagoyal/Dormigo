const institutes = [
  {
    name: "Allen Career Institute",
    address: "Rajeev Gandhi Nagar, Kota",
    phone: "09035429100",
    image: "https://myexam.allen.in/wp-content/uploads/2020/05/allen-kota.jpg-1280x720.jpg",
    rating:4.5
  },
  {
    name: "Resonance Eduventures",
    address: "JLN Marg, Kota",
    phone: "0900000001",
    image: "https://image-static.collegedunia.com/public/image/institute/cover_16948559121.jpg",
    rating:4.3
  },
  {
    name: "Vibrant Academy",
    address: "Indraprastha Industrial Area, Kota",
    phone: "0900000002",
    image: "https://image-static.collegedunia.com/public/image/institute/cover_16989303832222.jpg",
    rating:4.2
  }
];

const container = document.getElementById("institutecontainer");

institutes.forEach(inst => {
  const card = document.createElement("div");
  card.className = "inst-card";

  card.innerHTML = `
    <img src="${inst.image}" class="inst-img" alt="${inst.name}">
    <div class="inst-info">
      <h3>${inst.name}</h3>
      <span class="tag">Institute</span>
      <p>${inst.address}</p>
       <div class="rating"><i class="fas fa-star"></i> ${inst.rating}</div>
      <p>📞 ${inst.phone}</p>
      <button class="book-btn" onclick="window.location.href='booking.html?name=${encodeURIComponent(inst.name)}'">Book Now</button>

      
    </div>
  `;

  container.appendChild(card);
});
