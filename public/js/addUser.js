var facultyForm = document.querySelector("form");


facultyForm.addEventListener("submit", function () {
    var username = document.querySelector("#id").value;
    var password = document.querySelector("#password").value;
    console.log(username);
    var data = {
        "id" : username,
        "password" : password
    }
    var url = '/adduser';
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
                console.log("a");
            }
        });
    });
});

