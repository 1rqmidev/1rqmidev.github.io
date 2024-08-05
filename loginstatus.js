const apiUrl = "https://request-status.glitch.me/get-status/1RqMi";
let newreq = true;
let fetchUserStatus = function () {



    // Fetch the user status from the server
    console.log("trying to get status....")
    fetch(apiUrl)
        .then(response => {
            // Check if the response is ok (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Handle the data
            const statusElement = document.querySelector('nav .logo .status');
            if (data.status) {
                console.log("changing...")
                statusElement.classList.remove(`offline`);
                statusElement.classList.remove(`online`);
                statusElement.classList.remove(`away`);
                statusElement.classList.add(`${data.status}`);
                newreq = true
            } else {
                console.log("no status found..")
            }
        })
        .catch(error => {
            // Handle errors
            console.error('There has been a problem with your fetch operation:', error);

        });
}

fetchUserStatus();

setInterval(function () {

    if (newreq = true) {
        newreq = false;
        console.log("interval works.")
        fetchUserStatus();
    } else {
        console.log("please wait...")
    }

}, 3000);
