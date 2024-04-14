document.addEventListener('DOMContentLoaded', function () {
    // you can see this to organizations.ejs
    // const classificationValue = '<%= data.classificationValue %>';

    // console.log('organization.js classificationsReference : ', classificationsReference)
    // console.log('organization.js organizationsReference : ', organizationsReference)

    const classification = convertToTitleCase(classificationValue);
    // console.log('organization.js classification : ', classification)

    // Filter classifications based on the classificationValue
    const classifications = classificationsReference.filter(item => item.title === classification );
    // console.log('organization.js classifications : ', classifications)

    // if (classifications.length === 0) {
    //     console.error('No matching classification found');
    //     return;
    // }

    const classificationId = classifications[0].id;

    // Filter organizations based on the classificationId
    const foundItems = organizationsReference.filter(item => item.classification_id === classificationId);

    const organizationContainer = document.getElementById('organizationContainer');
    organizationContainer.innerHTML = ''; // Clear existing content

    foundItems.forEach(item => {
        const slug = slugilize(`${item.title}`);
        const div = document.createElement('div');
        div.className = 'p-6 mt-6 text-center duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 rounded-2xl';

        const innerHTML = `
            <div onclick="selectDepartment('${slug}')" id="card2" class="flex items-center justify-center mx-auto text-3xl text-indigo-600 align-middle shadow-sm bg-indigo-600/5 rounded-xl dark:shadow-gray-800">
                <img src="${baseUrl}/uploads/gergi/national_university.svg" class="h-100 w-100" alt="">
            </div>
            <div class="content mt-7">
                <a href="javascript:void(0)" onclick="selectDepartment('${slug}')" class="text-lg font-medium title h5 hover:text-indigo-600">${item.title}</a>
            </div>
        `;

        div.innerHTML = innerHTML;
        organizationContainer.appendChild(div);
    });

});


function selectDepartment(organizationValue) {
    console.log('organizationValue: ', organizationValue)
    const fullUrl = baseUrl + 'organization/' + organizationValue;
    console.log('organizationValue fullUrl: ', fullUrl)
    window.location.href = fullUrl;
}