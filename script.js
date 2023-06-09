let skills = [];
let stunts = [];

function printInput(inputId, outputId) {
    let input = document.getElementById(inputId).value;
    document.getElementById(outputId).innerText = input;
}

function updateImage() {
    let newURL = document.getElementById('imageURL').value;
    document.getElementById('characterImage').src = newURL;
}

function addSkill() {
    if (skills.length < 20) {
        skills.push(document.getElementById('skillsInput').value);
        document.getElementById('skillsOutput').innerText = skills.join(", ");
    }
}

function addStunt() {
    if (stunts.length < 20) {
        stunts.push(document.getElementById('stuntsInput').value);
        document.getElementById('stuntsOutput').innerText = stunts.join(", ");
    }
}
