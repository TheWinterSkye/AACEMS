document.getElementById('pic-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the form from submitting normally
    var url = document.getElementById('pic-url').value;
    document.getElementById('character-pic').src = url;
});
