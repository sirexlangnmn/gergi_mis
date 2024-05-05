async function getOrganizations() {
    try {
        const response = await fetch(`${baseUrl}api/get/organizations`, {
            method: 'GET',
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

getOrganizations().then((data) => {
    displayOrganizations(data)
})
    .catch((error) => {
        console.error('Error rendering resource : ', error);
    });


function displayOrganizations(data) {
    let html = '';

    data.forEach((item, index) => {
        html += `
            <tr>
                <th class="p-4 font-semibold border-t border-gray-100 text-start dark:border-gray-800">${item.id}</th>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">${item.title}</td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800 flex space-x-3">
                    <a href="javascript:void(0);" onclick="editResourcesDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                    </a>
                </td>
            </tr>
        `;
    });

    organizationsTableBody.innerHTML = html;

}