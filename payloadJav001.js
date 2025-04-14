// Attempt automatic file access
function testAutomaticFileAccess() {
    try {
        // Create a file input element
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*'; // Allow all file types
        input.style.display = 'none'; // Hide the input from view

        // Simulate a file selection without user interaction
        input.addEventListener('change', function(event) {
            let file = event.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    console.log('File content:', e.target.result); // Output file content
                    alert('File content read: ' + e.target.result.slice(0, 100)); // Preview first 100 chars
                };
                reader.readAsText(file); // Attempt to read file content
            } else {
                alert('No file selected automatically.');
            }
        });

        // Append the input to the body and trigger a click event
        document.body.appendChild(input);
        input.click(); // Simulate user clicking the input

    } catch (e) {
        console.log('Automatic file access failed:', e.message);
    }
}

testAutomaticFileAccess();