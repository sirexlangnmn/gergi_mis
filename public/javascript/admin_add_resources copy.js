document.addEventListener("DOMContentLoaded", function() {
    handleSubmit();
});

function handleSubmit() {
    const form = getId('addBookForm');
    form.addEventListener('submit', function(event) {
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
    console.log(`displayResources data`, data);
    generateTableRows(data)
})
.catch((error) => {
    console.error('Error rendering resource : ', error);
});






 // Data array
//  const data = [
//     { number: "01", id: "#tw001", date: "10th Aug 2023", price: "$253", status: "Delivered", statusColor: "bg-emerald-600/10 dark:bg-emerald-600/20 border border-emerald-600/10 dark:border-emerald-600/20 text-emerald-600" },
//     { number: "02", id: "#tw002", date: "13th Aug 2023", price: "$123", status: "New Order", statusColor: "bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-600/10 dark:border-indigo-600/20 text-indigo-600" }
// ];

// Function to generate table rows dynamically
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

                <li class="dropdown inline-block relative m-0.5">
                <button data-dropdown-toggle="dropdown" class="dropdown-toggle size-9 inline-flex items-center justify-center tracking-wide border align-middle duration-500 text-base text-center bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white rounded-md block" type="button">
                    <i class="uil uil-setting"></i>
                </button>
               
                <div class="dropdown-menu absolute start-0 m-0 z-10 w-48 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 hidden" onclick="event.stopPropagation();">
                    <ul class="py-2 text-start">
                        <li>
                            <a href="ui-components.html" class="block font-medium py-1.5 px-4 hover:text-red-600">Home</a>
                        </li>
                        <li>
                            <a href="ui-components.html" class="block font-medium py-1.5 px-4 hover:text-red-600">Service</a>
                        </li>
                        <li>
                            <a href="ui-components.html" class="block font-medium py-1.5 px-4 hover:text-red-600">About us</a>
                        </li>
                        <li class="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                        <li>
                            <a href="ui-components.html" class="block font-medium py-1.5 px-4 hover:text-red-600">Contact</a>
                        </li>
                    </ul>
                </div>
            </li>

                <a href="ui-components.html" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                </a>

                <a href="ui-components.html" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 20a1 1 0 0 0-1-1h-1v-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v2h-1a1 1 0 0 0-1 1H2v2h7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1h7v-2zm-6.75-9.92l1.16-1.16L11 10.5l3.59-3.58l1.16 1.41L11 13.08z"/></svg>
                </a>

                <a href="ui-components.html" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.03 19H5V5h2v2h10V5h2v4.5c.72.3 1.4.74 2 1.32V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h8.06c-.41-.26-.8-.55-1.16-.9c-.33-.34-.63-.71-.87-1.1M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m8.31 14.9c.44-.69.69-1.52.69-2.4c0-2.5-2-4.5-4.5-4.5S12 13 12 15.5s2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68L22 22.39L23.39 21zm-3.81.1a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"/></svg>
                </a>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Call the function to generate table rows
generateTableRows();


        const button = document.getElementById('hoverButton');
        const hoverText = document.getElementById('hoverText');

        button.addEventListener('mouseover', function() {
            hoverText.style.display = 'block';
        });

        button.addEventListener('mouseout', function() {
            hoverText.style.display = 'none';
        });