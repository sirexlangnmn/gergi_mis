
document.addEventListener('DOMContentLoaded', function () {
    // const organizationValue = '<%= data.organizationValue %>';

    fetch('/references/departments.json')
        .then(response => response.json())
        .then(data => {
            console.log('departments: ', data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    console.log('organizationValue: ', organizationValue)



    // async function getCourseById() {
    //     let response = await fetch(host + '/api/get/course'  + departmentId);
    //     let data = await response.json();
    //     return data;
    // }

    // // display all languages in frontend select option
    // getCourseById().then((data) => {
    //     console.lof('getCourseById : ', data)
    // });



});



function selectCourse(organizationValue) {
    console.log('organizationValue: ', organizationValue)
    // const fullUrl = baseUrl + organizationValue;
    // window.location.href = fullUrl;
}