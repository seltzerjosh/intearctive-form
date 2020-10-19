//field selections
const userName = document.getElementById('name');
const userTitle = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const otherTitleLabel = otherTitle.previousElementSibling;

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
    optn.selected = true;
    for (let i = 0; i < selectbox.length; i++) {
        selectbox[i].hidden = true;
    }
    selectbox.options.add(optn);
}


//Scans regex for the design and color, so that the correct t-shirts show up when you select that design
designDropdown.addEventListener('change', (event) => {
    modifyColorOptions(colorDropdown, 'Choose a Design', 'not-chosen');
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
        modifyColorOptions(colorDropdown, 'Choose a Design', 'not-chosen');
    } else {
        modifyColorOptions(colorDropdown, 'Choose a Color', 'not-chosen');
    }
})

//Disables checkboxes based on timeslots
const checkboxes = document.querySelectorAll('.activities input');
document.querySelector('.activities').addEventListener('change', (e) => {
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
})

//runtime
pageLoad();
modifyColorOptions(colorDropdown, 'Choose a Design', 'not-chosen');