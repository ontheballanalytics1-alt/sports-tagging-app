const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function () {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "crosskeys" && password === "password123") {

        window.location.href = "tagging.html";

    } else {

        document.getElementById("login-error").textContent =
            "Incorrect username or password.";

    }

});