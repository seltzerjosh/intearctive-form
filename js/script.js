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

designDropdown.addEventListener('change', (event) => {
//feed to modify color options so the regex match applies design->color
    
})

pageLoad();
modifyColorOptions(colorDropdown, 'Choose a Design', 'not-chosen');