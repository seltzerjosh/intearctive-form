//field selections
const userName = document.getElementById('name');
const userTitle = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const otherTitleLabel = otherTitle.previousElementSibling;
const form = document.querySelector('form');
//Make variable for the cost of selected events
let totalCost = 0;

//First set of instructions - focus and hide elements
function pageLoad() {
    userName.focus();
    otherTitleLabel.style.display = 'none';
    otherTitle.style.display = 'none';
}

//Adds field for optional free-text job role
userTitle.addEventListener('change', (event) => {
    if (userTitle.value !== 'other') {
        otherTitleLabel.style.display = 'none';

        otherTitle.style.display = 'none';
        otherTitle.value = '';
    } else {
        otherTitleLabel.style.display = '';
        otherTitle.style.display = '';
    }
})

const designDropdown = document.getElementById('design');
const colorDropdown = document.getElementById('color');

//Adds default and removes others
//Referenced https://www.plus2net.com/javascript_tutorial/list-adding.php
function modifyColorOptions(selectbox, text, value) {
    const optn = document.createElement('OPTION');
    optn.text = text;
    optn.value = value;
    optn.id = value;
    optn.selected = true;
    for (let i = 0; i < selectbox.length; i++) {
        selectbox[i].hidden = true;
    }
    selectbox.options.add(optn);
}


//Scans regex for the design and color, so that the correct t-shirts show up when you select that design
designDropdown.addEventListener('change', (event) => {
    document.getElementById('not-chosen').text = 'Choose a Design';
    document.getElementById('not-chosen').selected = true;
    const designType = /^\D*\s-\s(\D*)$/;
    const selection = event.target.options[event.target.selectedIndex].innerHTML; //supported by Tanerax https://stackoverflow.com/questions/5913/getting-the-text-from-a-drop-down-box
    const designPick = (selection.replace(designType, "$1"));
    for (let i = 0; i < colorDropdown.length; i++) {
        const shirtType = /^\D*\((\D*) shirt only\)/;
        if (colorDropdown[i].text.replace(shirtType, "$1") === designPick) {
            colorDropdown[i].hidden = false;
        } else {
            colorDropdown[i].hidden = true;
        }
    }
})

//Modifies instruction on Color Dropdown default
designDropdown.addEventListener('change', (e) => {
    if (e.target[e.target.selectedIndex].value === 'Select Theme') {
        document.getElementById('not-chosen').text = 'Choose a Design';
        document.getElementById('color').hidden = true;
        document.getElementById('color').previousElementSibling.hidden = true;
    } else {
        document.getElementById('not-chosen').text = 'Choose a Color';
        document.getElementById('color').hidden = false;
        document.getElementById('color').previousElementSibling.hidden = false;
    }
})

//Disables checkboxes based on timeslots
const checkboxes = document.querySelectorAll('.activities input');
const activityBoxes = document.querySelector('.activities');
activityBoxes.addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedType = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < checkboxes.length; i++) {
        if (clicked !== checkboxes[i] && clickedType === checkboxes[i].getAttribute('data-day-and-time')) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
            } else {
                checkboxes[i].disabled = false;
            }
        }
    }
    if (clicked.checked) {
        totalCost += parseInt(clicked.getAttribute('data-cost'));
    } else {
        totalCost -= parseInt(clicked.getAttribute('data-cost'));
    }
})

let totalInitializer = 0;

//create payment total visual
activityBoxes.addEventListener('change', (e) => {
    if (totalInitializer === 0) {
        const paymentDiv = document.createElement('span');
        paymentDiv.textContent = `Total Cost: $${totalCost}`;
        paymentDiv.id = 'payment-span';
        activityBoxes.appendChild(paymentDiv);
        totalInitializer += 1;
    } else if (totalCost === 0) {
        const paymentDiv = document.getElementById('payment-span');
        paymentDiv.hidden = true;
    } else {
        const paymentDiv = document.getElementById('payment-span');
        paymentDiv.hidden = false;
        paymentDiv.textContent = `Total Cost: $${totalCost}`;
    }
})


//Modifies payment section
function formatDiv(text) {
    if (text === 'credit-card')
        return 'credit card';
    else {
        return text
    }
}

//show and hide payment info on change from dropdown
const paymentSelection = document.getElementById('payment');
paymentSelection.remove(0, 1); //hides the 'select payment method' selection
paymentSelection[0].selected = true; //sets default to creditcard
paymentSelection.parentNode.querySelectorAll('div')[4].style.display = 'none'; //hides paypal by default
paymentSelection.parentNode.querySelectorAll('div')[5].style.display = 'none'; //hides bitcoin by default
//Changes the payment selected based on drop-down
paymentSelection.addEventListener('change', (e) => {
    const selectedPayment = e.target[e.target.selectedIndex].value;
    const paymentDivs = e.target.parentNode.querySelectorAll('div');
    for (let j = 0; j < paymentDivs.length; j++) {
        for (let i = 0; i < paymentSelection.length; i++) {
            if (formatDiv(paymentDivs[j].id) === selectedPayment) {
                paymentDivs[j].style.display = 'block';
            } else if (formatDiv(paymentDivs[j].id) == '') { //avoids trouble of non-id'd children divs)
                paymentDivs[j].style.display = 'block';
            } else {
                paymentDivs[j].style.display = 'none';
            }
        }
    }

})

/*Form Validation*/
//fields

//Name field can't be blank
function validUsername() {
    const regex = /\w+/;
    const usernameInput = userName.value;
    return regex.test(usernameInput);
}

//email field must be \w@\w.\w
function validEmail() {
    const regex = /^\w+@[a-z0-9]+\.\w+$/i;
    const email = document.getElementById('mail');
    emailInput = email.value;
    return regex.test(emailInput);
}

//usercheck boxes >0 selected
function validCheckboxes() {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
    }
    return false;
}

//Credit card # valid 13-16 digit
function validCc() {
    const regex = /^\d{13,16}$/;
    const cc = document.getElementById('cc-num');
    const ccInput = cc.value;
    return regex.test(ccInput);
}

//zip code 5 digit
function validZip() {
    const regex = /^\d{5}$/;
    const zip = document.getElementById('zip');
    zipInput = zip.value;
    return regex.test(zipInput);
}

//cvv 3 digit number
function validCvv() {
    const regex = /^\d{3}$/;
    const cvv = document.getElementById('cvv');
    cvvInput = cvv.value;
    return regex.test(cvvInput);
}

//validation function
form.addEventListener('submit', (e) => {
    if (!(validUsername() && validEmail() && validCheckboxes())) {
        e.preventDefault();
    } else if (paymentSelection[0].selected) {
        if (!(validCc() && validZip() && validCvv())) {
            e.preventDefault();
        }
    }
})

//error messages creation function
function createErrors(text, target) {
    const errorMessage = document.createElement('span');
    errorMessage.textContent = text;
    if (target.id) {
        errorMessage.id = target.id + '-error';
    } else {
        errorMessage.id = 'checkbox-error';
    }
    //add hide
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    target.insertAdjacentElement('beforebegin', errorMessage);
}

//Create error messages
createErrors('Invalid username', userName);
createErrors('Invalid email address', document.getElementById('mail'));
createErrors('Check at least one activity', activityBoxes.nextElementSibling);
createErrors('Must be 13-16 digit credit card number', document.getElementById('cc-num'));
createErrors('5 digit zip code', document.getElementById('zip'));
createErrors('3 digit CVV code', document.getElementById('cvv'));

//show hide errors
function displayErrors(id, func) {
    const errorMessage = document.getElementById(`${id}-error`);
    const target = document.getElementById(`${id}`);
    //const funct = func();
    if (func()) {
        errorMessage.style.display = 'none';
    } else {
        errorMessage.style.display = 'block';
    }
    return func();
}

//valid username upon input or submit
userName.addEventListener("input", (e) => {
    displayErrors('name', validUsername);
});
form.addEventListener("submit", (e) => {
    displayErrors('name', validUsername);
});

//valid email upon input or submit
const mail = document.getElementById('mail');
mail.addEventListener("input", (e) => {
    displayErrors('mail', validEmail);
});

form.addEventListener("submit", (e) => {
    displayErrors('mail', validEmail);
});
//at least one checkbox upon input or submit
activityBoxes.addEventListener("input", (e) => {
    displayErrors('checkbox', validCheckboxes);
});

form.addEventListener("submit", (e) => {
    displayErrors('checkbox', validCheckboxes);
});
//credit card upon input or submit
//cc number
const ccInputs = document.getElementById('cc-num');
ccInputs.addEventListener("input", (e) => {
    displayErrors('cc-num', validCc);
});

form.addEventListener("submit", (e) => {
    displayErrors('cc-num', validCc);
});

//zip error
const zips = document.getElementById('zip');
zips.addEventListener("input", (e) => {
    displayErrors('zip', validZip);
});

form.addEventListener("submit", (e) => {
    displayErrors('zip', validZip);
});

//cvv error
const cvvs = document.getElementById('cvv');
cvvs.addEventListener("input", (e) => {
    displayErrors('cvv', validCvv);
});

form.addEventListener("submit", (e) => {
    displayErrors('cvv', validCvv);
});



//runtime
pageLoad();
modifyColorOptions(colorDropdown, 'Choose a Design', 'not-chosen');
document.getElementById('color').hidden = true;
document.getElementById('color').previousElementSibling.hidden = true;