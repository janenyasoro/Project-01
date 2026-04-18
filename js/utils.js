//utility functions
export function validateEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function validatePhone(phone){
    const regex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phone);
}

export function validateName(name){
    return name && name.trim().length>=2;
}

export function showMessage(element,message,type){
    element.textContent = message;
    element.className = "form-message"${type};
    setTimeout(() => {
        element.textContent = "";
        element.className = "form-message";
    }, 5000);
}

export function showError(inputid, errorid, message){
    const errorElement = document.getElementById(errorId);
    if(errorElement){
        errorElement.textContent =  message;
    }
    const input = document.getElementById(inputId);
    if(input){
        input.style.borderColor = '#e74c3c';
    }

}
export function clearError(inputId, errorId){
    const errorElement = document.getElementById(errorId);
    if (errorElement){
        errorElement.textContent = "";
    }
    const input =  document.getElementsById(inputId);
    if(input){
        input.style.borderColor = "#ddd";
    }
}

export function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
}

export function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}