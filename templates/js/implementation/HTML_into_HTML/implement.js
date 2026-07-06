// Fetch the external HTML file
fetch('content.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Inject the HTML directly into the container
        document.getElementById('external-container').innerHTML = data;
    })
    .catch(error => {
        console.error('Error loading the HTML:', error);
        document.getElementById('external-container').innerHTML = 'Failed to load content.';
    });
