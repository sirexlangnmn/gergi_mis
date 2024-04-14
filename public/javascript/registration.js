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

function submitRegistrationForm(event) {
    event.preventDefault();

    let fullNameValue = RegistrationFullName.value;
    let mobileNumberValue = RegistrationMobileNumber.value;
    let emailAddressValue = RegistrationEmailAddress.value;
    let passwordValue = RegistrationPassword.value;
    let confirmPasswordValue = RegistrationConfirmPassword.value;
    let termsAndConditionValue = RegistrationTermsAndCondition.checked;

    resetErrorMessages();

    var isValid = true;

    if (!fullNameValue) {
        displayErrorMessage('Please enter a Name', RegistrationFullNameError);
        isValid = false;
    }

    if (!mobileNumberValue) {
        displayErrorMessage('Please enter a Mobile Number', RegistrationMobileNumberError);
        isValid = false;
    }

    if (!emailAddressValue) {
        displayErrorMessage('Please enter a Email Address', RegistrationEmailAddressError);
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
        displayErrorMessage('Passwords do not match', RegistrationPasswordError);
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    var formData = {
        fullNameInput: fullNameValue,
        mobileNumberInput: mobileNumberValue,
        emailAddressInput: emailAddressValue,
        passwordInput: passwordValue
    };

    fetch(baseUrl + 'api/post/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        window.location.href = '/login';
    })
    .catch(function(error) {
        console.error('Registration failed:', error);
        alert('Registration failed');
    });
}


registrationForm.addEventListener('submit', submitRegistrationForm);


function resetErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(element) {
        element.innerHTML = '';
    });
}


function displayErrorMessage(message, elementId) {
    elementId.innerHTML = message;
}


RegistrationFullName.addEventListener("keyup", function(event) {
    event.target.value
        ? messageValidationToggle(RegistrationFullNameError, null)
        : messageValidationToggle(RegistrationFullNameError, 'Please enter a Name -2');
});

RegistrationMobileNumber.addEventListener("keyup", function(event) {
    event.target.value
        ? messageValidationToggle(RegistrationMobileNumberError, null)
        : messageValidationToggle(RegistrationMobileNumberError, 'Please enter a Mobile Number -2');
});

RegistrationEmailAddress.addEventListener("keyup", function(event) {
    event.target.value
        ? messageValidationToggle(RegistrationEmailAddressError, null)
        : messageValidationToggle(RegistrationEmailAddressError, 'Please enter a Email Address -2');
});

RegistrationPassword.addEventListener("keyup", function(event) {
    event.target.value
        ? messageValidationToggle(RegistrationPasswordError, null)
        : messageValidationToggle(RegistrationPasswordError, 'Please enter a Password -2');

    let passwordValue = RegistrationPassword.value;
    let confirmPasswordValue = RegistrationConfirmPassword.value;

    if (passwordValue && confirmPasswordValue) {
        if (passwordValue !== confirmPasswordValue) {
            messageValidationToggle(RegistrationPasswordError, 'Passwords do not match -2');
        } else {
            messageValidationToggle(RegistrationPasswordError, null)
        }
    }

});

RegistrationConfirmPassword.addEventListener("keyup", function(event) {
    event.target.value
        ? messageValidationToggle(RegistrationConfirmPasswordError, null)
        : messageValidationToggle(RegistrationConfirmPasswordError, 'Please enter a Confirm Password -2');

    let passwordValue = RegistrationPassword.value;
    let confirmPasswordValue = RegistrationConfirmPassword.value;

    if (passwordValue && confirmPasswordValue) {
        if (passwordValue !== confirmPasswordValue) {
            messageValidationToggle(RegistrationPasswordError, 'Passwords do not match -2');
        } else {
            messageValidationToggle(RegistrationPasswordError, null)
        }
    }
});

RegistrationTermsAndCondition.addEventListener("change", function(event) {
    event.target.checked
        ? messageValidationToggle(RegistrationTermsAndConditionError, null)
        : messageValidationToggle(RegistrationTermsAndConditionError, 'Please accept Terms and Conditions -2');
});


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