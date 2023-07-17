console.log('Hey!!');




//////////////////////////////////////////////////////////////////////////
// MAKE AN OBJECT FROM THE CSS ROOT COLOURS

const CssRootColors = document.styleSheets[0].cssRules[1].style;

let rootColorNames = [];

for (let i = 0; i < CssRootColors.length; i++) {
  const colorName = CssRootColors[i];
  rootColorNames.push(colorName);
}


let hexCodes = [];

function isThereAHexInThere (string) {
    for (let i = 0; i < string.length; i++){
        if (string[i] === '#'){
            hexCodes.push(string.slice(i, i+6));
        }   
    }
}
// console.log(hexCodes);

isThereAHexInThere(CssRootColors.cssText);


function createObject(keys, values) {
    if (keys.length !== values.length) {
      throw new Error("Arrays must have the same length");
    }
  
    return Object.fromEntries(keys.map((key, index) => [key, values[index]]));

  }
  
  const rootHexColors = createObject(rootColorNames, hexCodes);
//   console.log(rootHexColors);

  //////////////////////////////////////////////////////////////////////////
  // 

  function starWave () {
    const stars = document.getElementById('tumbleStars');
    let numberOfStars = 0;

    function splitStars (str) {
        
        let splitStr = str.split('');
        numberOfStars = splitStr.length;
        const star = splitStr[0];
        let spanStars = [];
        for (let i = 0; i < splitStr.length; i++){
                splitStr[i] =  `<span class="tumbleStar" id="star${i}">` + star + `</span>`;
                spanStars.push(splitStr[i]);
        }
        spanStars = spanStars.join(' ');
        return spanStars;
    }

    // Replace the tumbleStars <p> with all the individual <span>s for each star
    stars.outerHTML = splitStars(stars.innerHTML);
    
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



///////////////////////////////////////////////////////////
// These next two functions are supposted to work together, they iterate
//through wach color and reasign it tpo the next, so as to have the stars change color.
//it's not working: it is iterating though alright, but i can't get HTML to load every iterating, so the 
//stars DO NOT change color :(
    const reset = (n) => {
        let rootIndex = n;
        console.log('n', n);
        // rootIndex = rootIndex + 1 ;
        for (let i = 0; i < numberOfStars; i++){
            const starX = document.getElementById(`star${i}`);
            if(CssRootColors[rootIndex] === '--background'){
                rootIndex++;
            }

            starX.style.color = `var(${CssRootColors[rootIndex]})`;
            rootIndex++;
            if (rootIndex > CssRootColors.length - 1) {
                 rootIndex = 0;
            }
            // console.log('rootIndex: ' , rootIndex);
        }
  }

  const callReset = () => {
    while (true){
        for (let x = 0; x < CssRootColors.length; x++){
            console.log('x : ', x);
            reset(x);
            // setTimeout(callReset, 1.0 * 1000);

        }
    }
    
  }
///////////////////////////////////////////////////////////


// setTimeout(callReset, 1.0 * 1000);
// setTimeout(reset, 2.0 * 1000);

// const callResetAgain = () => {
//         reset(2);
// }
  
// setTimeout(callResetAgain, 2.0 * 1000);

    
}

  
  starWave();

// const reveal = (subjectId) => {
//     const subject = document.getElementById('subjectId');
//     subject.style.display = 'flex';

// }
  
// reveal(responseToSubmitContainer);


// let ball = document.getElementById('float-circle');

// // Write your code below
// function up () {
//   ball.style.bottom = '250px';
// }

// function down() {
//   ball.style.bottom = '50px';
// }

// document.addEventListener('keydown', up);

// document.addEventListener('keyup', down);  



let thanks = document.getElementById('responseToSubmitContainer');

// Write your code below
function reveal (event) {
  thanks.style.display = 'flex';
  event.preventDefault();

}

// document.addEventListener('keyup', reveal);


const form = document.getElementById("form");
form.addEventListener("submit", reveal);

