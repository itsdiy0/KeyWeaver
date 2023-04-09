'use strict';

let allLetters = {
    lowCase : "abcdefghijklmnopqrstuvxyz",
    upCase : "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    numbers : "0123456789",
    specialChar : "£$&()*+[]@#^-_!?"
}

function randomChar(n){
    return Math.floor(Math.random() * n);
}

function no_char(checkBoxes){
    let all = structuredClone(allLetters);
    for(let i in checkBoxes){
        if(checkBoxes[i]==false){
            delete all[i];
        }
        else{
            all[i] = allLetters[i];
        }
    }
    return all;
}

function notInclude(letters,all){
    letters = letters.split("");
    for(let i in letters){
        for(let key in all){
            if(all[key].includes(letters[i])){
                all[key] = all[key].replace(letters[i],"");
            }
        }
    }
    return all;
}

function generate(password_length,all){
    let letters = [],password = [];
    for (const [key, value] of Object.entries(all)) {
        letters.push(value);
    }
    letters = letters.join("");
    for(let i=0;i<password_length;i++){
        let index = randomChar(letters.length);
        password.push(letters[index]);
    }
    password = password.join("");
    return password;
}

function selectText(main_input) {
    main_input.focus();
    main_input.select();
    return main_input;
  }

let main_input = document.getElementById("mainInput");
let generate_button = document.getElementById("generateButton");
let forbidden_letters = document.getElementById("notInclude");
generate_button.onclick = function(){
    let checkBoxes = {
        numbers : document.getElementById("noNumber").checked,
        specialChar : document.getElementById("noSpecial").checked,
        lowCase : document.getElementById("noLower").checked,
        upCase : document.getElementById("noUpper").checked
    };
    let password_length = Number(document.getElementById("passwordLength").value);
    let password = generate(password_length,notInclude(forbidden_letters.value,no_char(checkBoxes)));
    const changeInputFontSize = function (main_input,password){
        switch(true){
            case (password.length>16 && password.length<=32):
                main_input.style.fontSize="1.6rem";
                break;
            case (password.length>32 && password.length<=48):
                main_input.style.fontSize="1.3rem";
                break;
            case (password.length>48 && password.length<=64):
                main_input.style.fontSize="1rem";
                break;
            default:
        }
        return main_input;
    }
    main_input = changeInputFontSize(main_input,password);
    main_input.value = password;
    main_input = selectText(main_input);    
};

const passwordLengthInput = document.getElementById('passwordLength');
const passwordLengthValue = document.getElementById('password-length-value');
// Update the value label whenever the range input changes
passwordLengthInput.addEventListener('input', () => {
  passwordLengthValue.textContent = passwordLengthInput.value;
});
