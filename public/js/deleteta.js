



var facultyForm = document.querySelector("form");


facultyForm.addEventListener("submit", function () {
    var rollNumber = document.querySelector("#rollNumber").value;
    

    var data = {
        "rollNumber" : rollNumber
    }
    var url = '/deleteta1';
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
                console.log(data.coursCode);
                console.log(data.ugpg);
            }
        });
    });
});