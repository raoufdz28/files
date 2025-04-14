// Check if we can access files via JavaScript
function checkFileAccess() {
    try {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';  // You can adjust the type to try and access different file types.
        
        input.addEventListener('change', function(event) {
            let file = event.target.files[0];
            alert('File selected: ' + file.name);
        });
        
        document.body.appendChild(input);
        input.click();
    } catch (e) {
        console.log("File access failed: " + e.message);
    }
}
checkFileAccess();