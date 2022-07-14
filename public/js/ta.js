
var facultyForm = document.querySelector("form");

facultyForm.addEventListener("submit", function () {
    var rollNumber = document.querySelector("#rollNumber").value;
    var pref1 = document.querySelector("#pref1").value;
    var pref2 = document.querySelector("#pref2").value;
    var pref3 = document.querySelector("#pref3").value;
    // var expert1 = document.querySelector("#expert1").value;
    // var expert2 = document.querySelector("#expert2").value;
    // var expert3 = document.querySelector("#expert3").value;
    
    console.log(rollNumber);
    console.log(pref1);
    console.log(pref2);
    console.log(pref3);
    // console.log(expert1);
    // console.log(expert2);
    // console.log(expert3);
    var data = {
        "rollNumber" : rollNumber,
        "pref1" : pref1,
        "pref2" : pref2,
        "pref3" : pref3
    }
    var url = '/tadetails';
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
    facultyForm.reset();
});
