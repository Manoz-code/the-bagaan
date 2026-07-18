

const typingText = document.getElementById("typing-text");

const loader = document.getElementById("welcome-loader");

const menu = document.getElementById("menu-content");
const search = document.getElementById("search");
const welcomeText = {

    en: "Welcome to Bagaan",

    np: "बगानमा स्वागत छ"

};

const translations = {

    en: {
        all :"All",
        drinks: "Drinks",
        burger: "Burger",
        pizza: "Pizza",
        chicken: "Chicken",
        mainCourse: "Main Course",
        dessert: "Dessert",
         search: "Search food or drinks..."

    },

    np: {
        all :"सबै",
        drinks: "पेय पदार्थ",
        burger: "बर्गर",
        pizza: "पिज्जा",
        chicken: "चिकेन",
        mainCourse: "मुख्य परिकार",
        dessert: "मिठाई",
          search: "खाना वा पेय खोज्नुहोस्..."

    }

};
const language = localStorage.getItem("language") || "en";
const text = welcomeText[language];
let index = 0;


function changeLanguage(language){

    document.querySelectorAll("[data-lang]").forEach(element=>{

        const key = element.dataset.lang;

        element.textContent = translations[language][key];

    });

}

document.querySelectorAll("[data-placeholder]").forEach(input => {

    const key = input.dataset.placeholder;

    input.placeholder = translations[language][key];

});

function typeWriter(){

    if(index < text.length){

        typingText.textContent += text.charAt(index);

        index++;

        setTimeout(typeWriter,80);

    }else{

        setTimeout(hideLoader,1000);

    }

}

function hideLoader(){

    loader.style.opacity="0";

    setTimeout(()=>{

        loader.style.display="none";

        menu.style.opacity="1";

        menu.style.transform="translateY(0)";

    },800);

}

window.addEventListener("load",()=>{

    changeLanguage(language)
    typeWriter();

});


search.addEventListener("input", () => {

    const value = search.value.toLowerCase().trim();


    document.querySelectorAll(".menu-card").forEach(card => {

        const data = card.dataset.search;


        if(data.includes(value)){

            card.style.display = "";

        }else{

            card.style.display = "none";

        }

    });

});


const categories = document.querySelectorAll(".category");

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(link => {

            link.classList.remove("active");

        });

        category.classList.add("active");

    });

});

const drinkButtons = document.querySelectorAll(".drink-category");


drinkButtons.forEach(button => {


    button.addEventListener("click",()=>{


        drinkButtons.forEach(btn=>{
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const selected = button.dataset.sub;



        document
        .querySelectorAll("#drinks .menu-card")
        .forEach(card=>{


            if(
                selected === "all" ||
                card.dataset.subcategory === selected
            ){

                card.style.display = "";


            }else{

                card.style.display = "none";

            }


        });


    });


});

function createCard(item){

    const card = document.createElement("article");

    card.className = "menu-card";


    // Search data
    card.dataset.search = 
    `
    ${item.name.en}
    ${item.name.np}
    ${item.description.en}
    ${item.description.np}
    `.toLowerCase();


    // Subcategory data
    card.dataset.subcategory = item.subcategory || "";



    card.innerHTML = `

        <div class="card-image">

            <img 
            src="${item.image}" 
            alt="${item.name[language]}"
            >

        </div>


        <div class="card-content">

            <h3>${item.name[language]}</h3>

            <p>${item.description[language]}</p>


            <div class="card-footer">

                <span class="price">
                    ${item.price[language]}
                </span>

            </div>

        </div>

    `;

    return card;

}
// menu js

async function loadMenu() {

    try {

        const response = await fetch("menu.json");
        const menu = await response.json();

     const sections = {

    drinks: document.querySelector("#drinks .menu-grid"),
    burger: document.querySelector("#burger .menu-grid"),
    pizza: document.querySelector("#pizza .menu-grid"),
    chicken: document.querySelector("#chicken .menu-grid"),
    "main-course": document.querySelector("#main-course .menu-grid"),
    dessert: document.querySelector("#dessert .menu-grid")

};

        menu.forEach(item => {

            const card = createCard(item);

           if (sections[item.category]) {
    sections[item.category].appendChild(card);
} else {
    console.warn(`Category "${item.category}" not found.`);
}

        });

    } catch(error){

        console.error(error);

    }

}

loadMenu();

document.addEventListener("click", (e)=>{

    const clickedCard = e.target.closest(".menu-card");


    if(!clickedCard) return;


    document.querySelectorAll(".menu-card").forEach(card=>{

        if(card !== clickedCard){

            card.classList.remove("expanded");

        }

    });


    clickedCard.classList.toggle("expanded");


});


