document.addEventListener("DOMContentLoaded", function () {

});

let title = getId('title');
let titleError = getId('titleError');
let addBookSuccessMessage = getId('addBookSuccessMessage');
let addBookErrorMessage = getId('addBookErrorMessage');
let addBookForm = getId('addBookForm');



let editResourcesSuccessMessage = getId('editResourcesSuccessMessage');
let editResourcesErrorMessage = getId('editResourcesErrorMessage');
let editResourcesForm = getId('editResourcesForm');


function validateAddBookForm() {
    title = title.value;

    resetErrorMessages();

    let isValid = true;

    if (!title) {
        displayErrorMessage('Please enter a Title', titleError);
        isValid = false;
    }

    return isValid;
}



addBookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validateAddBookForm()) {
        return;
    }

    const formData = new FormData(addBookForm);
    sendFormData(formData)
        .then(handleSuccess)
        .catch(handleError);
});

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
    showSuccessMessage('Data saved successfully', addBookSuccessMessage)
    addBookForm.reset();
}

function handleError(error) {
    console.error('Error:', error);
    showErrorMessage('Data saved failed', addBookErrorMessage)
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

                <a href="javascript:void(0);" onclick="resourceSetupFormDiv(${item.id}, '${item.title}')" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
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





function resourceSetupFormDiv(resourceId, title) {
    getId('resourcesTitle').innerHTML = title;
    getId('resourceId').value = resourceId;

    getId('addresources').classList.add('hidden');
    getId('editresources').classList.add('hidden');
    getId('resourcesetuppage').classList.add('hidden');
    getId('resourcesetup').classList.remove('hidden');
}


function getResourcesById(resourceId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resourceId: resourceId })
    };


    fetch('/api/get/resources-by-id', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            getId('update_id').value = data.id;
            getId('update_title').value = data.title;
            getId('update_download_link').value = data.url_link;
            getId('update_isbn').value = data.ISBN;
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });
}





editResourcesForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(editResourcesForm);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch('/api/update/resources', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // or response.json() if you expect JSON response
        })
        .then(data => {
            console.log('Resource updated successfully:', data);
            showSuccessMessage('Resource updated successfully', editResourcesSuccessMessage)
            editResourcesForm.reset();
            setTimeout(function(){
                showResourceSetupDiv();
            }, 2000);
        })
        .catch(error => {
            console.error('Error updating resource:', error);
            showErrorMessage('Error updating resource', editResourcesErrorMessage)
        });
});





const resourceSetupForm = document.getElementById('resourceSetupForm');

resourceSetupForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const resourceId = getId('resourceId').value;
    const classification = getId('classificationData').value;
    const organization = getId('organizationData').value;
    const department = getId('departmentData').value;
    const course = getId('courseData').value;
    const category = getId('categoryData').value;
    const subject = getId('subjectData').value;


    const data = {
        resourceId: resourceId,
        classification: classification,
        organization: organization,
        department: department,
        course: course,
        category: category,
        subject: subject
    };


    fetch('/api/post/resource-setup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data sent successfully:', data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
});





function populateOrganizations(classificationId) {
    const organizationSelect = document.getElementById('organizationData');
    organizationSelect.innerHTML = '';
    const departmentSelect = document.getElementById('departmentData');
    departmentSelect.innerHTML = '';

    const filteredOrganizations = organizationsReference.filter(org => parseInt(org.classification_id) === parseInt(classificationId));

    filteredOrganizations.forEach(org => {
        const option = document.createElement('option');
        option.value = org.id;
        option.textContent = org.title;
        organizationSelect.appendChild(option);
    });

    populateDepartments(organizationSelect.value);
}

function populateDepartments(organizationId) {
    const departmentSelect = document.getElementById('departmentData');
    departmentSelect.innerHTML = '';

    const filteredDepartments = departmentsReference.filter(department => parseInt(department.organization_id) === parseInt(organizationId));

    if (filteredDepartments.length === 0) {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        departmentSelect.appendChild(noneOption);
    } else {
        filteredDepartments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.title;
            departmentSelect.appendChild(option);
        });
    }

    const courseDataSelect = document.getElementById('courseData');
    courseDataSelect.innerHTML = '';

    populateCourses(departmentSelect.value);
}

function populateCourses(departmentId) {
    const courseDataSelect = document.getElementById('courseData');
    courseDataSelect.innerHTML = '';

    if (departmentId === 'None') {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        courseDataSelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ departmentId: departmentId })
        };

        fetch('/api/get/courses-by-department-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(course => {
                    const option = document.createElement('option');
                    option.value = course.id;
                    option.textContent = course.course_title;
                    courseDataSelect.appendChild(option);
                });

                populateCategories(courseDataSelect.value);
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}

function populateCategories(courseId) {
    const categoryDataSelect = document.getElementById('categoryData');
    categoryDataSelect.innerHTML = '';

    if (courseId === 'None') {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        categoryDataSelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId: courseId })
        };

        fetch('/api/get/categories-by-course-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.title;
                    categoryDataSelect.appendChild(option);
                });

                populateSubjects(categoryDataSelect.value);
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}

function populateSubjects(categoryId) {
    const subjectDataSelect = document.getElementById('subjectData');
    subjectDataSelect.innerHTML = '';

    if (categoryId === 'None') {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        subjectDataSelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId: categoryId })
        };

        fetch('/api/get/subjects-by-category-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject.id;
                    option.textContent = subject.subject_title;
                    subjectDataSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}

const classificationSelect = document.getElementById('classificationData');
const organizationSelect = document.getElementById('organizationData');
const departmentSelect = document.getElementById('departmentData');
const categoryDataSelect = document.getElementById('categoryData');

// Populate classification select options
classificationsReference.forEach(classification => {
    const option = document.createElement('option');
    option.value = classification.id;
    option.textContent = classification.title;
    classificationSelect.appendChild(option);
});

// Event listeners
classificationSelect.addEventListener('change', function () {
    populateOrganizations(this.value);
});

organizationSelect.addEventListener('change', function () {
    populateDepartments(this.value);
});

departmentSelect.addEventListener('change', function () {
    populateCourses(this.value);
});

categoryDataSelect.addEventListener('change', function () {
    populateSubjects(this.value);
});

// Populate organizations for default classification
const defaultClassificationId = parseInt(classificationSelect.value);
populateOrganizations(defaultClassificationId);
