var facultyForm = document.querySelector("form");
// const ID = require('../../src/models/ID')


facultyForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    console.log(username);
    var data = {
        "id" : username,
        "password" : password
    }
    var url = '/checkpassword';
    fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data)
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageLoc.textContent = data.error;
            } else {
                console.log(data.check);
                if (data.check == "yes") {
                    window.location.replace("/ta");
                } else {
                    document.getElementById('warn').classList.add('alert');
                    document.getElementById('warn').textContent = "Wrong Credentials!";
                }
            }
        });
    });


    // if (logedin) window.location.replace("/ta");
});

