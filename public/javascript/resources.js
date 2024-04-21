document.addEventListener("DOMContentLoaded", async function() {
    displayResources();
});

async function displayResources() {
    // const resourcesContainer = document.getElementById("resourcesContainer");
    // const items = [
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/macular-and-retinal-diseases.webp`, label: "Macular and Retinal Diseases", author: "Author : Al Solis", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/Atlas-and-Clinical-Reference-Guide-for-Corneal-Topography.webp`, label: "Atlas and Clinical Reference Guide for Corneal Topography", author: "Author : Federex Potolin", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/ophthalmology-current-and-future-developments-vol-3.webp`, label: "Ophthalmology: Current and Future Developments (Vol. 3)", author: "Author : WebMaster", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/macular-and-retinal-diseases.webp`, label: "Macular and Retinal Diseases", author: "Author : Al Solis", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/Atlas-and-Clinical-Reference-Guide-for-Corneal-Topography.webp`, label: "Atlas and Clinical Reference Guide for Corneal Topography", author: "Author : Federex Potolin", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/ophthalmology-current-and-future-developments-vol-3.webp`, label: "Ophthalmology: Current and Future Developments (Vol. 3)", author: "Author : WebMaster", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/macular-and-retinal-diseases.webp`, label: "Macular and Retinal Diseases", author: "Author : Al Solis", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/Atlas-and-Clinical-Reference-Guide-for-Corneal-Topography.webp`, label: "Atlas and Clinical Reference Guide for Corneal Topography", author: "Author : Federex Potolin", publicationYear: "Publication Year : 2021" },
    //     { imageSrc: `${baseUrl}/uploads/gergi/optometry/ophthalmology-current-and-future-developments-vol-3.webp`, label: "Ophthalmology: Current and Future Developments (Vol. 3)", author: "Author : WebMaster", publicationYear: "Publication Year : 2021" }
    //     // Add more items as needed
    // ];

    // items.forEach(item => {
    //     const div = document.createElement("div");
    //     div.classList.add("group");

    //     div.innerHTML = `
    //         <div class="relative overflow-hidden duration-500 rounded-md shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800">
    //             <img src="${item.imageSrc}" alt="">
    //             <div class="absolute duration-500 -bottom-20 group-hover:bottom-3 start-3 end-3">
    //                 <a href="/" class="inline-block w-full px-5 py-2 text-base font-semibold tracking-wide text-center text-white align-middle duration-500 border rounded-md bg-slate-900 border-slate-900">Download</a>
    //             </div>
    //             <ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500">
    //                 <li><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-heart"></i></a></li>
    //                 <li class="mt-1"><a href="/" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-eye-outline"></i></a></li>
    //                 <li class="mt-1"><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-bookmark-outline"></i></a></li>
    //             </ul>
    //             <ul class="list-none absolute top-[10px] start-4">
    //                 <li><a href="javascript:void(0)" class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">New</a></li>
    //             </ul>
    //         </div>
    //         <div class="mt-4">
    //             <a href="/" class="text-lg font-semibold hover:text-indigo-600">${item.label}</a>
    //             <div class="items-center justify-between mt-1">
    //                 <p class="text-gray-600">${item.author}</p>
    //                 <p class="text-gray-600">${item.publicationYear}</p>
    //             </div>
    //         </div>
    //     `;
    //     resourcesContainer.appendChild(div);
    // });










    const course = convertToTitleCase(courseValue);


    try {
        const response = await fetch(baseUrl + 'api/get/resources-by-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('frontend resources data: ', data)

            const resourcesContainer = getId("resourcesContainer");

            const imageSrc = `${baseUrl}/uploads/gergi/optometry/ophthalmology-current-and-future-developments-vol-3.webp`
            const publicationYear = 'Publication Year : 2021';
            const author = "Author : WebMaster";

            data.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("group");
        
                div.innerHTML = `
                    <div class="relative overflow-hidden duration-500 rounded-md shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800">
                        <img src="${imageSrc}" alt="">
                        <div class="absolute duration-500 -bottom-20 group-hover:bottom-3 start-3 end-3">
                            <a href="${item.url_link}" target="_blank" class="inline-block w-full px-5 py-2 text-base font-semibold tracking-wide text-center text-white align-middle duration-500 border rounded-md bg-slate-900 border-slate-900">Download</a>
                        </div>
                        <ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500">
                            <li><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-heart"></i></a></li>
                            <li class="mt-1"><a href="/" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-eye-outline"></i></a></li>
                            <li class="mt-1"><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-bookmark-outline"></i></a></li>
                        </ul>
                        <ul class="list-none absolute top-[10px] start-4">
                            <li><a href="javascript:void(0)" class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">New</a></li>
                        </ul>
                    </div>
                    <div class="mt-4">
                        <a href="${item.url_link}" target="_blank" class="text-lg font-semibold hover:text-indigo-600">${item.title}</a>
                        <div class="items-center justify-between mt-1">
                            <p class="text-gray-600">${author}</p>
                            <p class="text-gray-600">${publicationYear}</p>
                        </div>
                    </div>
                `;
                resourcesContainer.appendChild(div);
            });

        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



function updateOrganizationTitle(organizationId) {
    const organizationAngleRight = getId("organization-angle-right");
    const organizationTitleElement = getId("organization-title");

    const organization = findOrganizationById(organizationId);

    if (organization) {
        organizationAngleRight.style.display = "inline-block";
        setElementContent(organizationTitleElement, organization.title);
    } else {
        organizationAngleRight.style.display = "none";
        setElementContent(organizationTitleElement, '');
    }
}

function updateDepartmentTitle(departmentTitle) {
    const departmentAngleRight = getId("department-angle-right");
    const departmentTitleElement = getId("department-title");

    if (departmentTitle) {
        departmentAngleRight.style.display = "inline-block";
        setElementContent(departmentTitleElement, departmentTitle);
    } else {
        departmentAngleRight.style.display = "none";
        setElementContent(departmentTitleElement, '');
    }
}

function updateCourseTitle(courseValue) {
    const courseAngleRight = getId("course-angle-right");
    const courseTitleElement = getId("course-title");

    if (courseValue) {
        courseAngleRight.style.display = "inline-block";
        setElementContent(courseTitleElement, courseValue);
    } else {
        courseAngleRight.style.display = "none";
        setElementContent(courseTitleElement, '');
    }
}

function findOrganizationById(organizationId) {
    return organizationsReference.find(item => item.id === parseInt(organizationId));
}

function setElementContent(element, content) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    const newContent = document.createTextNode(content);
    element.appendChild(newContent);
}

// Usage
updateOrganizationTitle(organizationId);
updateDepartmentTitle(departmentTitle);
updateCourseTitle(courseValue);
