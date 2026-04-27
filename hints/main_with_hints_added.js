// main.js

// The following functions are partially complete. Use your knowledge of DOM
// manipulation and events to complete them and complete the game.  Feel free
// to test and inspect other code here, but you only need to actually fill in
// the blank areas of functions marked with "TODO":


// Retrieve an array of matching button DOM elements, if the given "numberButton" were clicked
function getMatchingButtons(numberButton) {
    let myValue = numberButton.getAttribute('data-value');
    let myTD = numberButton.parentNode;
    let myTR = myTD.parentNode;

    let buttons = []; // This will be a "bucket" to hold all the matching buttons

    // Get my right sibling... (e.g. NEXT <td></td> cell after me)
    let nextTD = myTD.nextSibling;
    if (nextTD) { // There is a next cell (e.g. not at the right side)
        let nextButton = nextTD.querySelector('button');
        if (nextButton) { // A button was added to this next cell...
            let nextButtonValue = nextButton.getAttribute('data-value');
            if (nextButtonValue === myValue) {
                buttons.push(nextButton); // Add it to the Array
            }
        }
    }

    // TODO: You'll need to make it check for the other 3 possible matching buttons.
    // Hint: Note that checking to the left will be very similar (except using
    // "previousSibling"), however, checking above and below will require
    // somewhat different code, due to it needing to select a certain element
    // in the next or previous table row (tr).
    // let prevTD = myTD.previousSibling;
    // if (prevTD) { // ...

  
    let prevTD = myTD.previousElementSibling;
    if (prevTD) {
        let prevButton = prevTD.querySelector('button');
        if (prevButton) {
            let prevButtonValue = prevButton.getAttribute('data-value');
            if (prevButtonValue === myValue) {
            buttons.push(prevButton);
            }
        }
}


    let prevTR = myTR.previousElementSibling;
    if (prevTR) {
        let index = Array.from(myTR.children).indexOf(myTD);
        let aboveTD = prevTR.children[index];
        if (aboveTD) {
            let aboveButton = aboveTD.querySelector('button');
            if (aboveButton) {
                let aboveValue = aboveButton.getAttribute('data-value');
                if (aboveValue === myValue) {
                    buttons.push(aboveButton);
                }
            }
        }
    }


    let nextTR = myTR.nextElementSibling;
    if (nextTR) {
    let index = Array.from(myTR.children).indexOf(myTD);
    let belowTD = nextTR.children[index];
    if (belowTD) {
        let belowButton = belowTD.querySelector('button');
        if (belowButton) {
            let belowValue = belowButton.getAttribute('data-value');
            if (belowValue === myValue) {
                buttons.push(belowButton);
            }
        }
    }
}

    // Always remember to return the variables you need outside!
    return buttons;
};

function setupNumberButton(numberButton) {
    numberButton.addEventListener('click', function () {
        // alert('Button was clicked! ' + numberButton.textContent);
        console.log(numberButton);
        
        let buttons = getMatchingButtons(numberButton);
        console.log(buttons);

        if (buttons.length >= 2) {
            let currentValue = parseInt(numberButton.getAttribute('data-value'), 10);

            // include clicked tile + matching neighbors
            let totalTiles = buttons.length + 1;

            // COMBINE RULE: double per merge "layer"
            let newValue = currentValue * totalTiles;

            numberButton.setAttribute('data-value', newValue);
            numberButton.textContent = newValue;

            buttons.forEach(btn => {
                btn.parentNode.innerHTML = '';
            });
        }
    });

    numberButton.addEventListener('mouseover', function () {
        // This means the user "hovered" or moved their mouse over
        let buttons = getMatchingButtons(numberButton);
        // TODO: Complete this 
        // Hint: Similar to click, but only add the class Tile--highlight to the button's parent element

        buttons.forEach(btn => {
        btn.parentNode.classList.add('Tile--highlight');
            });

         // Also highlight hovered button
        numberButton.parentNode.classList.add('Tile--highlight');

    });

    // TODO: Add another event for mouseleave
    // Hint: Similar to mouseover, but removing

    numberButton.addEventListener('mouseleave', function () {
        let buttons = getMatchingButtons(numberButton);
        document.querySelectorAll('.Tile--highlight').forEach(tile => {
    tile.classList.remove('Tile--highlight');
});
    });

}

console.log('Main.js loaded');
