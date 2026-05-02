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
  },
  
  {
    name: "Career Point",
    address: "CP Tower, Road No.1, IPIA, Kota, Rajasthan 324005",
    phone: "07442665500",
    image: "https://careerpoint.ac.in/wp-content/uploads/2022/03/CP-Tower-1024x666.jpg",
    rating: 4.3
  },
  {
    name: "Nucleus Education",
    address: "B-50, Indraprastha Industrial Area, Kota, Rajasthan 324005",
    phone: "07442777000",
    image: "https://images.firstpost.com/wp-content/uploads/2020/08/kota-640.jpg?im=FitAndFill=(596,336)",
    rating: 4.4
  },
  {
    name: "Reliable Institute",
    address: "A-10, Road No. 1, IPIA, Kota, Rajasthan 324005",
    phone: "07446060000",
    image: "https://content.jdmagicbox.com/comp/kota-rajasthan/q4/9999px744.x744.220129203300.b8q4/catalogue/reliable-institute-indraprastha-industrial-area-kota-rajasthan-tutorials-wil05gjz8i.jpg",
    rating: 4.1
  },
{
  name: "Aakash Institute",
  address: "Plot No. 1, CAD Circle, Kota, Rajasthan 324009",
  phone: "07443242900",
  image: "https://img.studydekho.com/uploads/c/2017/3/c-aakash-institute-kota-2348.jpg",
  rating: 4.0
},
{
  name: "Bansal Classes",
  address: "A-10, Road No. 1, Indraprastha Industrial Area, Kota, Rajasthan 324005",
  phone: "07442423232",
  image: "https://content.jdmagicbox.com/comp/kota-rajasthan/n5/9999px744.x744.190516092649.e5n5/catalogue/bansal-classes-kota-rajasthan-tutorials-o9xgqhyxa9.jpg",
  rating: 4.1
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
      <p>📍 ${inst.address}</p>

       <div class="rating"><i class="fas fa-star"></i> ${inst.rating}</div>
      <p>📞 ${inst.phone}</p>
      <button class="book-btn" onclick="window.location.href='booking.html?name=${encodeURIComponent(inst.name)}'">Book Now</button>

      
    </div>
  `;
  

  container.appendChild(card);
});
