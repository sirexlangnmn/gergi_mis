let toggleDiv = [
    'addresources',
    'editresources',
    'resourcesetuppage',
    'resourcesetup',
    'classificationspage',
    'organizationspage',
    'departmentspage',
    'coursespage',
    'categoriespage',
];


function editResourcesDiv(resourceId) {
    getResourcesById(resourceId)
    showAndHide('editresources', toggleDiv);
}

function hideAddResourcesDiv() {
    showAndHide('addresources', toggleDiv);
}

function showAddResourcesDiv() {
    showAndHide('addresources', toggleDiv);
}

function showResourceSetupDiv() {
    showAndHide('resourcesetuppage', toggleDiv);

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
    showAndHide('resourcesetup', toggleDiv);
}

function showResourceSetupDiv() {
    showAndHide('resourcesetuppage', toggleDiv);

    // displayResources().then((data) => {
    //     generateTableRows(data)
    // })
    //     .catch((error) => {
    //         console.error('Error rendering resource : ', error);
    //     });
}


function showClassificationsDiv() {
    showAndHide('classificationspage', toggleDiv);
}

function showAddClassificationDiv() {

}

function showOrganizationsDiv() {
    showAndHide('organizationspage', toggleDiv);
}

function showAddOrganizationDiv() {

}

function showDepartmentsDiv() {
    showAndHide('departmentspage', toggleDiv);
}

function showAddDepartmentDiv() {

}

function showCoursesDiv() {
    showAndHide('coursespage', toggleDiv);
}

function showAddCourseDiv() {

}

function showCategoriesDiv() {
    showAndHide('categoriespage', toggleDiv);
}

function showSubjectDiv() {
    showAndHide('subjectspage', toggleDiv);
}

function showAddSubjectDiv() {

}

function showAndHide(showElement, toggleDiv) {
    toggleDiv.forEach(id => {
        if (id === showElement) {
            getId(id).classList.remove('hidden');
        } else {
            getId(id).classList.add('hidden');
        }
    });
}
