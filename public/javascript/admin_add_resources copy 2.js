document.addEventListener("DOMContentLoaded", function () {
    handleSubmit();
});

function handleSubmit() {
    const form = getId('addBookForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        sendFormData(formData)
            .then(handleSuccess)
            .catch(handleError);
    });
}

function sendFormData(formData) {
    return fetch('add-resources', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function handleSuccess(data) {
    console.log('Data saved successfully:', data);
}

function handleError(error) {
    console.error('Error:', error);
}






async function displayResources() {
    try {
        const response = await fetch(`${baseUrl}api/get/resources-order-by-latest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching resources : ', error);
        throw error;
    }
}

displayResources().then((data) => {
    generateTableRows(data)
})
    .catch((error) => {
        console.error('Error rendering resource : ', error);
    });


function generateTableRows(data) {
    const tbody = document.getElementById('resources-table-body');
    let html = '';

    data.forEach((item, index) => {
        html += `
            <tr>
                <th class="p-4 font-semibold border-t border-gray-100 text-start dark:border-gray-800">${item.id}</th>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">${item.title}</td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">
                    <span class="text-slate-400">Federex Potolin</span>
                </td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">
                    <span class="text-slate-400">${item.ISBN}</span>
                </td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800 flex space-x-3">

                <a href="javascript:void(0);" onclick="editResourcesDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                </a>

                <a href="javascript:void(0);" onclick="resourceSetupFormDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 20a1 1 0 0 0-1-1h-1v-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v2h-1a1 1 0 0 0-1 1H2v2h7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1h7v-2zm-6.75-9.92l1.16-1.16L11 10.5l3.59-3.58l1.16 1.41L11 13.08z"/></svg>
                </a>

                <a href="javascript:void(0);" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.03 19H5V5h2v2h10V5h2v4.5c.72.3 1.4.74 2 1.32V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h8.06c-.41-.26-.8-.55-1.16-.9c-.33-.34-.63-.71-.87-1.1M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m8.31 14.9c.44-.69.69-1.52.69-2.4c0-2.5-2-4.5-4.5-4.5S12 13 12 15.5s2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68L22 22.39L23.39 21zm-3.81.1a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"/></svg>
                </a>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}


function editResourcesDiv(resourceId) {
    getResourcesById(resourceId)
    getId('addresources').classList.add('hidden');
    getId('editresources').classList.remove('hidden');
    getId('resourcesetuppage').classList.add('hidden');
    getId('resourcesetup').classList.add('hidden');
}

function hideAddResourcesDiv() {
    getId('addresources').classList.remove('hidden');
    getId('editresources').classList.add('hidden');
    getId('resourcesetuppage').classList.add('hidden');
    getId('resourcesetup').classList.add('hidden');
}

function showAddResourcesDiv() {
    getId('addresources').classList.remove('hidden');
    getId('editresources').classList.add('hidden');
    getId('resourcesetuppage').classList.add('hidden');
    getId('resourcesetup').classList.add('hidden');
}

function showResourceSetupDiv() {
    getId('addresources').classList.add('hidden');
    getId('editresources').classList.add('hidden');
    getId('resourcesetuppage').classList.remove('hidden');
    getId('resourcesetup').classList.add('hidden');

    displayResources().then((data) => {
        generateTableRows(data)
    })
        .catch((error) => {
            console.error('Error rendering resource : ', error);
        });
}


function resourceSetupFormDiv(resourceId) {
    console.log('resourceSetupFormDiv resourceId : ', resourceId);
    getId('addresources').classList.add('hidden');
    getId('editresources').classList.add('hidden');
    getId('resourcesetuppage').classList.add('hidden');
    getId('resourcesetup').classList.remove('hidden');
}


function getResourcesById(resourceId) {
    console.log('getResourcesById resourceId : ', resourceId);

    // Configure the request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resourceId: resourceId })
    };

    // Send the request to the server
    fetch('/api/get/resources-by-id', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return the promise
        })
        .then(data => {
            console.log('getResourcesById response data.title : ', data.title);
            console.log('getResourcesById response data.url_link : ', data.url_link);
            console.log('getResourcesById response data.ISBN : ', data.ISBN);
            getId('update_id').value = data.id;
            getId('update_title').value = data.title;
            getId('update_download_link').value = data.url_link;
            getId('update_isbn').value = data.ISBN;
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });
}



const editResourcesForm = getId('editResourcesForm');

editResourcesForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(editResourcesForm);

    // Configure the request
    const requestOptions = {
        method: 'POST',
        body: formData
    };

    // Send the request to the server
    fetch('/api/update/resources', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // or response.json() if you expect JSON response
        })
        .then(data => {
            console.log('Resource updated successfully:', data);
            // Optionally, you can redirect or do something else here after successful update
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });
});


// Get reference to the select element by ID
const classificationData = getId('classificationData');

// Loop through classificationsReference and create options
classificationsReference.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.title;
    classificationData.appendChild(option);
});


// Function to populate organization select options based on classification ID
function populateOrganizations(classificationId) {
    const organizationDataElement = getId('organizationData');

    organizationDataElement.innerHTML = '';

    const filteredOrganizations = organizationsReference.filter(org => parseInt(org.classification_id) === parseInt(classificationId));

    filteredOrganizations.forEach(org => {
        const option = document.createElement('option');
        option.value = org.id;
        option.textContent = org.title;
        organizationDataElement.appendChild(option);
    });
}


// Add event listener to classification select
classificationData.addEventListener('change', function() {
    const selectedClassificationId = parseInt(this.value);
    populateOrganizations(selectedClassificationId);
});

// Initial population of organizations based on the default value of classification select
populateOrganizations(parseInt(classificationData.value));



// Function to populate department select options based on organization ID
function populateDepartments(organizationId) {
    const selectElement = document.getElementById('departmentData');
    // Clear existing options
    selectElement.innerHTML = '';
    // Filter departments based on organization ID
    const filteredDepartments = departmentsReference.filter(department => parseInt(department.organization_id) === parseInt(organizationId));

    // Create options for filtered departments or "None" if no departments found
    if (filteredDepartments.length === 0) {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        selectElement.appendChild(noneOption);
    } else {
        filteredDepartments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.title;
            selectElement.appendChild(option);
        });
    }
}

// Get reference to the organization select element
const organizationSelect = getId('organizationData');

// Add event listener to organization select
organizationSelect.addEventListener('change', function() {
    const selectedOrganizationId = this.value;
    populateDepartments(selectedOrganizationId);
});

// Initial population of departments based on the default value of organization select
populateDepartments(organizationSelect.value);