// script.js
function updateImage() {
    var url = document.getElementById('imageURL').value;
    var img = document.getElementById('characterImage');

    // Check if the URL is valid
    if(url.trim() !== '') {
        img.src = url;
    }
}
