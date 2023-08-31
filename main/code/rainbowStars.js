const CssRootColors = document.styleSheets[0].cssRules[1].style;
const starsContainer = document.getElementById('tumbleStars');

function isThereAHexInThere(string) {
    let hexCodes = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '#') {
            hexCodes.push(string.slice(i, i + 7));
        }
    }
    return hexCodes;
}

const hexCodes = isThereAHexInThere(CssRootColors.cssText);

function createObject(keys, values) {
    if (keys.length !== values.length) {
        throw new Error("Arrays must have the same length");
    }
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
}

const rootColorNames = Array.from(CssRootColors).map(item => item.trim());
const rootHexColors = createObject(rootColorNames, hexCodes);
let numberOfStars;

function splitStars(str) {
    let splitStr = str.split('');
    numberOfStars = splitStr.length;
    const stars = splitStr.map((star, i) => {
        return `<span class="tumbleStar" id="star${i}">${star}</span>`;
    }).join('');
    return stars;
}

starsContainer.innerHTML = splitStars(starsContainer.innerText);

const stars = document.querySelectorAll('.tumbleStar');

let currentColorIndex = 0;



    //this sets the initial colours for the stars, setting colour to roll though the rootcolors 
    function setAllStarColors (){
        let rootColorIndex = 0;
        for (let i = 0; i < numberOfStars; i++){
            const starX = document.getElementById(`star${i}`);
            if(CssRootColors[rootColorIndex] === '--background'){
                rootColorIndex++;
            }
            starX.style.color = `var(${CssRootColors[rootColorIndex]})`;
            rootColorIndex++;
            if (rootColorIndex > CssRootColors.length - 1) {
                 rootColorIndex = 0;
            }
            // console.log('rootColorIndex: ' , rootColorIndex);
        }
    }
    setAllStarColors();

    let intervalId;

    function changeStarColors() {
        stars.forEach((star, index) => {
            star.style.color = `var(${rootColorNames[(index + currentColorIndex) % rootColorNames.length]})`;
        });
        currentColorIndex = (currentColorIndex + 1) % rootColorNames.length;
    }
    
    starsContainer.addEventListener('mouseenter', () => {
        intervalId = setInterval(changeStarColors, 150); // 0.25 seconds
    });
    
    starsContainer.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        // stars.forEach(star => {
        //     star.style.color = '';
        // });
    });













