console.log("welcome");


const translations = {
    en: {
        home : "Home",
        menu : "Menu",
        about : "About",
        contact : "Contact",
        welcome : "Welcome to Bagan Resturant",
        enterMenu : "Enter Menu",
        reviewusongoogle: "Review Us On Google"
    },

    np : {
           home: "गृहपृष्ठ",
        menu: "मेनु",
        about: "हाम्रो बारेमा",
        contact: "सम्पर्क",
        welcome: "बगान रेस्टुरेन्टमा स्वागत छ",
        enterMenu: "मेनु हेर्नुहोस्",
        reviewusongoogle : "कृपया Google मा हाम्रो समीक्षा गर्नुहोस्।",
    }
}

const languageSelector = document.querySelector("#language")

function changeLanguage(language) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        console.log(element)
        const key = element.dataset.lang;
        element.textContent = translations[language][key];


    });
}

languageSelector.addEventListener("change", (e) => {
    const language = e.target.value;

    localStorage.setItem("language", language);

    changeLanguage(language);
});

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    }, 2500);

});