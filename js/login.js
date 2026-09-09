const loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "crosskeys" && password === "password123") {

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("lastActivity", Date.now());

        window.location.replace("tagging.html?team=crosskeys");

    } else if (username === "trial" && password === "trial") {

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("lastActivity", Date.now());

        window.location.replace("tagging.html?team=trial");

    } else if (username === "testing" && password === "testing") {

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("lastActivity", Date.now());

        window.location.replace("tagging.html?team=testing");

    } else {

        document.getElementById("login-error").textContent =
            "Incorrect username or password.";

    }

});