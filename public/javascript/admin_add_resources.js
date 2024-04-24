document.addEventListener("DOMContentLoaded", function() {
    const form = getId('addBookForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(form);

        // Fetch API endpoint to handle form submission
        fetch('add-resources', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful response
            console.log('Data saved successfully:', data);
            // You can add any further action here, like showing a success message, redirecting, etc.
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
            // You can add error handling here, like showing an error message to the user
        });
    });
});
