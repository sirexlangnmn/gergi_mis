let RegistrationFullName = getId('RegistrationFullName');
let RegistrationMobileNumber = getId('RegistrationMobileNumber');
let RegistrationEmailAddress = getId('RegistrationEmailAddress');
let RegistrationPassword = getId('RegistrationPassword');
let RegistrationConfirmPassword = getId('RegistrationConfirmPassword');
let RegistrationTermsAndCondition = getId('RegistrationTermsAndCondition');

let RegistrationFullNameError = getId('RegistrationFullNameError');
let RegistrationMobileNumberError = getId('RegistrationMobileNumberError');
let RegistrationEmailAddressError = getId('RegistrationEmailAddressError');
let RegistrationPasswordError = getId('RegistrationPasswordError');
let RegistrationConfirmPasswordError = getId('RegistrationConfirmPasswordError');
let RegistrationTermsAndConditionError = getId('RegistrationTermsAndConditionError');

let registrationForm = getId('registrationForm');

function validateRegistrationForm() {
    const fullNameValue = RegistrationFullName.value;
    const mobileNumberValue = RegistrationMobileNumber.value;
    const emailAddressValue = RegistrationEmailAddress.value;
    const passwordValue = RegistrationPassword.value;
    const confirmPasswordValue = RegistrationConfirmPassword.value;
    const termsAndConditionValue = RegistrationTermsAndCondition.checked;

    resetErrorMessages();

    let isValid = true;

    if (!fullNameValue) {
        displayErrorMessage('Please enter a Name', RegistrationFullNameError);
        isValid = false;
    }

    if (!mobileNumberValue) {
        displayErrorMessage('Please enter a Mobile Number', RegistrationMobileNumberError);
        isValid = false;
    }

    if (!emailAddressValue) {
        displayErrorMessage('Please enter an Email Address', RegistrationEmailAddressError);
        isValid = false;
    }

    if (!passwordValue) {
        displayErrorMessage('Please enter a Password', RegistrationPasswordError);
        isValid = false;
    }

    if (!confirmPasswordValue) {
        displayErrorMessage('Please enter a Confirm Password', RegistrationConfirmPasswordError);
        isValid = false;
    }

    if (!termsAndConditionValue) {
        displayErrorMessage('Please accept Terms and Conditions', RegistrationTermsAndConditionError);
        isValid = false;
    }

    if (passwordValue !== confirmPasswordValue) {
        displayErrorMessage('Passwords do not match', RegistrationConfirmPasswordError);
        isValid = false;
    }

    return isValid;
}


function submitRegistrationForm(event) {
    event.preventDefault();

    if (!validateRegistrationForm()) {
        return;
    }

    const formData = {
        fullNameInput: RegistrationFullName.value,
        mobileNumberInput: RegistrationMobileNumber.value,
        emailAddressInput: RegistrationEmailAddress.value,
        passwordInput: RegistrationPassword.value
    };

    fetch(baseUrl + 'api/post/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Registration failed:', error);
            alert('Registration failed');
        });
}


function resetErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.innerHTML = '';
    });
}


function displayErrorMessage(message, elementId) {
    elementId.innerHTML = message;
}


registrationForm.addEventListener('submit', submitRegistrationForm);


RegistrationFullName.addEventListener("keyup", function (event) {
    event.target.value
        ? messageValidationToggle(RegistrationFullNameError, null)
        : messageValidationToggle(RegistrationFullNameError, 'Please enter a Name');
});

RegistrationMobileNumber.addEventListener("keyup", function (event) {
    event.target.value
        ? messageValidationToggle(RegistrationMobileNumberError, null)
        : messageValidationToggle(RegistrationMobileNumberError, 'Please enter a Mobile Number');
});

RegistrationEmailAddress.addEventListener("keyup", function (event) {
    event.target.value
        ? messageValidationToggle(RegistrationEmailAddressError, null)
        : messageValidationToggle(RegistrationEmailAddressError, 'Please enter an Email Address');
});

RegistrationPassword.addEventListener("keyup", function (event) {
    event.target.value
        ? messageValidationToggle(RegistrationPasswordError, null)
        : messageValidationToggle(RegistrationPasswordError, 'Please enter a Password');

    validatePasswordConfirmation();
});

RegistrationConfirmPassword.addEventListener("keyup", function (event) {
    event.target.value
        ? messageValidationToggle(RegistrationConfirmPasswordError, null)
        : messageValidationToggle(RegistrationConfirmPasswordError, 'Please enter a Confirm Password');

    validatePasswordConfirmation();
});

RegistrationTermsAndCondition.addEventListener("change", function (event) {
    event.target.checked
        ? messageValidationToggle(RegistrationTermsAndConditionError, null)
        : messageValidationToggle(RegistrationTermsAndConditionError, 'Please accept Terms and Conditions');
});


function validatePasswordConfirmation() {
    const passwordValue = RegistrationPassword.value;
    const confirmPasswordValue = RegistrationConfirmPassword.value;

    if (passwordValue && confirmPasswordValue) {
        if (passwordValue !== confirmPasswordValue) {
            messageValidationToggle(RegistrationPasswordError, 'Passwords do not match');
        } else {
            messageValidationToggle(RegistrationPasswordError, null);
        }
    }
}


function messageValidationToggle(element, message) {
    if (element) {
        if (message) {
            element.style.display = 'block';
            element.innerHTML = message;
        } else {
            element.style.display = 'none';
            element.innerHTML = '';
        }
    }
}