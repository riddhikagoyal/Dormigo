const categories = [{
image: 'stay.jpg',
name: 'STAY',


},{
    image: 'food.jpg',
    name:'FOOD',
},{
    image: 'desk-essentials.jpg',
    name:'DESK ESSENTIALS',
},{
    image: 'institute.jpg',
    name:'INSTITUTE',
}];

let categoryHTML = '';
categories.forEach((category) =>{
categoryHTML +=  `
<div class="categories">
    <img class="category-image" src="${category.image}">
<a class="category-descriptionn" href="STAY.html"> ${category.name} </a>
    </div>`;
    });
    console.log(categoryHTML);
    document.querySelector('.js-categories-grid').innerHTML = categoryHTML;
