document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('characterSheet');

    form.addEventListener('input', function(event) {
        var target = event.target;
        console.log('Changed ' + target.name + ' to ' + target.value);
    });
});
