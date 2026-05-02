const hospitals = [
  {
    name: "Sudha Hospital",
    address: "Dadabari, Kota",
    phone: "0744-2325000",
    image: "https://kotadarpan.com/wp-content/uploads/2023/07/sudha-hospita.jpg",
    rating:"4.3"
  },
  {
    name: "MBS Hospital",
    address: "Gumanpura, Kota",
    phone: "0744-2423806",
    image: "https://hindi.cdn.zeenews.com/hindi/sites/default/files/styles/zm_700x400/public/2019/10/05/437783-mbs-hospital-new-1.jpg?itok=kDcelKG2",
    rating: "4.6"  
  },
  {
    name: "S.N pareek hospital",
    address: "basant vihar, Kota",
    phone: "0744-2392233",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-y_aPtGMcULNfnuKT1wnU3e_KAkZSfqv9Q&s",
    rating:"4.0"
 
  }
];

const container = document.getElementById("hospitalcontainer");

hospitals.forEach(hospital => {
  const card = document.createElement("div");
  card.className = "inst-card";

  card.innerHTML = `
  <img src="${hospital.image}" class="inst-img" alt="${hospital.name}">
  <div class="inst-info">
    <h3>${hospital.name}</h3>
    <span class="tag">Hospital</span>
    <p>${hospital.address}</p>
    <div class="rating"><i class="fas fa-star"></i> ${hospital.rating}</div>
    <p>📞 ${hospital.phone}</p>
    <button class="book-btn" onclick="window.location.href='booking.html?type=Hospital&name=${hospital.name}'">Book Now</button>
  </div>
`;

  container.appendChild(card);
});
