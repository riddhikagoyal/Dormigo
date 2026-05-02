const hospitals = [
  {
    name: "Sudha Hospital",
    address: "Dadabari, Kota",
    phone: "0744-2325000",
    image: "https://kotadarpan.com/wp-content/uploads/2023/07/sudha-hospita.jpg",
    rating: "4.3"
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
    address: "Basant Vihar, Kota",
    phone: "0744-2392233",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-y_aPtGMcULNfnuKT1wnU3e_KAkZSfqv9Q&s",
    rating: "4.0"
  },
  {
    name: "Apex Hospital",
    address: "Baran Road, Talwandi, Kota, Rajasthan 324005",
    phone: "07446046046",
    image: "https://content.jdmagicbox.com/comp/bikaner/w4/9999px151.x151.220311114024.x3w4/catalogue/apex-hospital-rani-bazar-bikaner-hospitals-glxaw3j1bn.jpg",
    rating: "4.1"
  },
  {
    name: "Manipal Hospital",
    address: "Instrumentation Ltd Campus, Kota, Rajasthan 324005",
    phone: "07442377777",
    image: "https://content.jdmagicbox.com/v2/comp/bangalore/p3/080pxx80.xx80.170919171915.f2p3/catalogue/manipal-hospital-old-airport-road-bangalore-hospitals-cx9m9ft1u2.jpg",
    rating: "4.0"
  },
];

const container = document.getElementById("hospitalcontainer");

hospitals.forEach(hospital => {
  const card = document.createElement("div");
  card.className = "info-card";

  card.innerHTML = `
    <img src="${hospital.image}" class="info-image" alt="${hospital.name}">
    <div class="info-details">
      <h2>${hospital.name}</h2>
      <span class="tag green">Hospital</span>
      <p><i class="fas fa-map-marker-alt"></i> ${hospital.address}</p>
      <p class="rating"><i class="fas fa-star"></i> ${hospital.rating}</p>
      <p><i class="fas fa-phone"></i> ${hospital.phone}</p>

      <!-- Hospital booking button -->
      <a href="booking.html?type=Hospital&name=${encodeURIComponent(hospital.name)}" class="book-btn">
        Book Hospital
      </a>

      <!-- ✅ Ambulance booking button -->
      <a href="ambulance-booking.html"?hospital=${encodeURIComponent(hospital.name)}" class="book-btn" style="background: red; margin-left: 10px;">
        Book Ambulance 🚑
      </a>
    </div>
  `;

  container.appendChild(card);
});
