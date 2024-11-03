const fromText = document.querySelector(".from-text"),
    toText = document.querySelector(".to-text"),
    selectTag = document.querySelectorAll("select"),
    exchangeIcon = document.querySelector(".exchange"),
    icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

    selectTag.forEach((tag, id) => {
        for (const country_code in countries) {
            let selected;
            if (id == 0 && country_code == "en-GB") {
                selected = "selected";
            } else if (id == 1 && country_code == "hi-IN") {
                selected = "selected";
            }
            let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);

        }
    });
exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
        tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
})
translateBtn.addEventListener("click", () => {
    let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = ` https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {

        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    })
}
);
// icons.forEach(icon => {
//     icon.addEventListener("click", ({ target }) => {
//         if (!fromText.value || !toText.value) return;
//         if (target.classList.contains("bxs-copy")) {
//             if (target.id == "from") {
//                 navigator.clipboard.writeText(fromText.value);
//             } else {
//                 navigator.clipboard.writeText(toText.value);
//             }
//         } else {
//             let utterance;
//             if (target.id == "from") {
//                 utterance = new SpeechSynthesisUtterance(fromText.value);
//                 utterance.lang = selectTag[0].value;
//             } else {
//                 utterance = new SpeechSynthesisUtterance(toText.value);
//                 utterance.lang = selectTag[1].value;
//             }
//             speechSynthesis.speak(utterance);
//         }
//     });
// });
icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (!fromText.value || !toText.value) return;

        if (target.classList.contains("bxs-copy")) {
            if (target.id === "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (target.id === "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            // Set default volume, rate, and pitch
            utterance.volume = 1;
            utterance.rate = 1;
            utterance.pitch = 1;

            // Cancel any ongoing speech
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }
    });
});
// icons.forEach(icon => {
//     icon.addEventListener("click", ({ target }) => {
//         if (!fromText.value || !toText.value) return;

//         if (target.classList.contains("bxs-copy")) {
//             if (target.id === "from") {
//                 navigator.clipboard.writeText(fromText.value);
//             } else {
//                 navigator.clipboard.writeText(toText.value);
//             }
//         } else {
//             let utterance;
//             if (target.id === "from") {
//                 utterance = new SpeechSynthesisUtterance(fromText.value);
//                 utterance.lang = selectTag[0].value;
//             } else {
//                 utterance = new SpeechSynthesisUtterance(toText.value);
//                 utterance.lang = selectTag[1].value;
//             }
//             // Set default volume, rate, and pitch
//             utterance.volume = 1;
//             utterance.rate = 1;
//             utterance.pitch = 1;

//             // Attempt to find and use the Telugu voice
//             let voices = speechSynthesis.getVoices();
//             let teluguVoice = voices.find(voice => voice.lang === 'te-IN');
//             if (teluguVoice) {
//                 utterance.voice = teluguVoice;
//             }

//             // Cancel any ongoing speech and speak
//             speechSynthesis.cancel();
//             speechSynthesis.speak(utterance);
//         }
//     });
// });
