document.addEventListener("DOMContentLoaded", () => {

// LOGIN SECURITY
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes for testing

let idleTimer;

function logoutUser() {
  sessionStorage.removeItem("loggedIn");
  sessionStorage.removeItem("lastActivity");
  window.location.replace("index.html");
}

function checkLoginSession() {

  const loggedIn = sessionStorage.getItem("loggedIn");
  const lastActivity = Number(sessionStorage.getItem("lastActivity"));

  if (loggedIn !== "true" || !lastActivity) {
    logoutUser();
    return false;
  }

  // Check whether the user has been inactive too long
  if (Date.now() - lastActivity >= SESSION_TIMEOUT) {
    logoutUser();
    return false;
  }

  return true;
}

function resetIdleTimer() {

  // Record the user's latest activity
  sessionStorage.setItem("lastActivity", Date.now());

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    logoutUser();
  }, SESSION_TIMEOUT);
}

// Check login when the page loads
if (!checkLoginSession()) {
  return;
}

// Start the inactivity timer
resetIdleTimer();

// Reset inactivity timer whenever the user interacts
[
  "click",
  "touchstart",
  "pointerdown",
  "keydown"
].forEach((eventName) => {
  document.addEventListener(eventName, resetIdleTimer);
});

// Check again when using browser Back/Forward
window.addEventListener("pageshow", () => {

  if (!checkLoginSession()) {
    return;
  }

});

const params = new URLSearchParams(window.location.search);
const team = params.get("team");

const teamName = document.getElementById("team-name");
const buttonTeamName = document.getElementById("button-team-name");

const playerTogglesColumn = document.getElementById("player-toggles-column");

const matchReportTab = document.getElementById("match-report-tab");
const gsTab = document.getElementById("gs-tab");
const gaTab = document.getElementById("ga-tab");
const waTab = document.getElementById("wa-tab");
const cTab = document.getElementById("c-tab");
const wdTab = document.getElementById("wd-tab");
const gdTab = document.getElementById("gd-tab");
const gkTab = document.getElementById("gk-tab");
const s1Tab = document.getElementById("S1-tab");
const s2Tab = document.getElementById("S2-tab");
const s3Tab = document.getElementById("S3-tab");
const s4Tab = document.getElementById("S4-tab");
const s5Tab = document.getElementById("S5-tab");

const matchReportBox = document.querySelector(".match-report-box");
const gsBox = document.querySelector(".gs-box");
const gaBox = document.querySelector(".ga-box");
const waBox = document.querySelector(".wa-box");
const cBox = document.querySelector(".c-box");
const wdBox = document.querySelector(".wd-box");
const gdBox = document.querySelector(".gd-box");
const gkBox = document.querySelector(".gk-box");
const s1Box = document.querySelector(".s1-box");
const s2Box = document.querySelector(".s2-box");
const s3Box = document.querySelector(".s3-box");
const s4Box = document.querySelector(".s4-box");
const s5Box = document.querySelector(".s5-box");

const playerTabs = [
  waTab,
  cTab,
  wdTab,
  gdTab,
  gkTab,
  s1Tab,
  s2Tab,
  s3Tab,
  s4Tab,
  s5Tab
];

const gsToggle = document.getElementById("gs-toggle");
const playerLock = document.getElementById("player-lock-toggle");

const gsName = document.getElementById("gs-name");

gsName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    gsName.blur();
  }
});

gsName.addEventListener("input", () => {
  gsToggle.textContent = gsName.textContent.trim() || "GS";
});

if (team === "testing") {

  // Show all tabs
  matchReportTab.style.display = "flex";
  gsTab.style.display = "flex";
  gaTab.style.display = "flex";
  waTab.style.display = "flex";
  cTab.style.display = "flex";
  wdTab.style.display = "flex";
  gdTab.style.display = "flex";
  gkTab.style.display = "flex";
  s1Tab.style.display = "flex";
  s2Tab.style.display = "flex";
  s3Tab.style.display = "flex";
  s4Tab.style.display = "flex";
  s5Tab.style.display = "flex";

  playerTabs.forEach((tab) => {
    tab.style.display = "flex";
  });


  // Hide all player containers for now
  matchReportBox.style.display = "block";
  gsBox.style.display = "none";
  gaBox.style.display = "none";
  waBox.style.display = "none";
  cBox.style.display = "none";
  wdBox.style.display = "none";
  gdBox.style.display = "none";
  gkBox.style.display = "none";
  s1Box.style.display = "none";
  s2Box.style.display = "none";
  s3Box.style.display = "none";
  s4Box.style.display = "none";
  s5Box.style.display = "none";


  // MATCH REPORT is active by default
  matchReportTab.classList.add("active");
  gsTab.classList.remove("active");
  gaTab.classList.remove("active");
  waTab.classList.remove("active");
  cTab.classList.remove("active");
  wdTab.classList.remove("active");
  gdTab.classList.remove("active");
  gkTab.classList.remove("active");
  s1Tab.classList.remove("active");
  s2Tab.classList.remove("active");
  s3Tab.classList.remove("active");
  s4Tab.classList.remove("active");
  s5Tab.classList.remove("active");

  playerTabs.forEach((tab) => {
    tab.classList.remove("active");
  });


  // ==================================================
  // MATCH REPORT TAB
  // ==================================================

  matchReportTab.addEventListener("click", () => {

    matchReportBox.style.display = "block";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    matchReportTab.classList.add("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // GS TAB
  // ==================================================

  gsTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "block";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    gsTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // GA TAB
  // ==================================================

  gaTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "block";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    gaTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // WA TAB
  // ==================================================

  waTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "block";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    waTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // C TAB
  // ==================================================

  cTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "block";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    cTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // WD TAB
  // ==================================================

  wdTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "block";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    wdTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // GD TAB
  // ==================================================

  gdTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "block";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    gdTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // GK TAB
  // ==================================================

  gkTab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "block";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    gkTab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

  });


  // ==================================================
  // S1 TAB
  // ==================================================

  s1Tab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "block";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    s1Tab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    s1Tab.classList.add("active");

  });


  // ==================================================
  // S2 TAB
  // ==================================================

  s2Tab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "block";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    s2Tab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    s2Tab.classList.add("active");

  });


  // ==================================================
  // S3 TAB
  // ==================================================

  s3Tab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "block";
    s4Box.style.display = "none";
    s5Box.style.display = "none";

    s3Tab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s4Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    s3Tab.classList.add("active");

  });


  // ==================================================
  // S4 TAB
  // ==================================================

  s4Tab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "block";
    s5Box.style.display = "none";

    s4Tab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s5Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    s4Tab.classList.add("active");

  });


  // ==================================================
  // S5 TAB
  // ==================================================

  s5Tab.addEventListener("click", () => {

    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";
    wdBox.style.display = "none";
    gdBox.style.display = "none";
    gkBox.style.display = "none";
    s1Box.style.display = "none";
    s2Box.style.display = "none";
    s3Box.style.display = "none";
    s4Box.style.display = "none";
    s5Box.style.display = "block";

    s5Tab.classList.add("active");
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");
    waTab.classList.remove("active");
    cTab.classList.remove("active");
    wdTab.classList.remove("active");
    gdTab.classList.remove("active");
    gkTab.classList.remove("active");
    s1Tab.classList.remove("active");
    s2Tab.classList.remove("active");
    s3Tab.classList.remove("active");
    s4Tab.classList.remove("active");

    playerTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    s5Tab.classList.add("active");

  });


  // ==================================================
// PLAYER TABS
// ==================================================

const playerTabBoxes = {
  "wa-tab": waBox,
  "c-tab": cBox,
  "wd-tab": document.querySelector(".wd-box"),
  "gd-tab": document.querySelector(".gd-box"),
  "gk-tab": document.querySelector(".gk-box"),
  "S1-tab": document.querySelector(".s1-box"),
  "S2-tab": document.querySelector(".s2-box"),
  "S3-tab": document.querySelector(".s3-box"),
  "S4-tab": document.querySelector(".s4-box"),
  "S5-tab": document.querySelector(".s5-box")
};


playerTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    // Hide all containers
    matchReportBox.style.display = "none";
    gsBox.style.display = "none";
    gaBox.style.display = "none";
    waBox.style.display = "none";
    cBox.style.display = "none";

    document.querySelector(".wd-box").style.display = "none";
    document.querySelector(".gd-box").style.display = "none";
    document.querySelector(".gk-box").style.display = "none";
    document.querySelector(".s1-box").style.display = "none";
    document.querySelector(".s2-box").style.display = "none";
    document.querySelector(".s3-box").style.display = "none";
    document.querySelector(".s4-box").style.display = "none";
    document.querySelector(".s5-box").style.display = "none";


    // Remove active from all tabs
    matchReportTab.classList.remove("active");
    gsTab.classList.remove("active");
    gaTab.classList.remove("active");

    playerTabs.forEach((otherTab) => {
      otherTab.classList.remove("active");
    });


    // Show the selected container
    const box = playerTabBoxes[tab.id];

    if (box) {
      box.style.display = "block";
    }


    // Bring selected tab to the front
    tab.classList.add("active");

  });

});


  // Player lock
  playerLock.addEventListener("click", () => {
    playerLock.classList.toggle("locked");
  });


  // PLAYER TOGGLE CLICK-TO-SWAP
  const playerToggles = document.querySelectorAll(".player-toggle");

  let selectedPlayer = null;


  playerToggles.forEach((toggle) => {

    toggle.addEventListener("click", () => {


      // ==========================================
      // LOCKED
      // ==========================================

      if (playerLock.classList.contains("locked")) {

        toggle.classList.toggle("active");

        return;
      }


      // ==========================================
      // UNLOCKED
      // ==========================================

      if (selectedPlayer === null) {

        toggle.classList.add("active");

        selectedPlayer = toggle;

        return;
      }


      // Clicking the same player cancels selection
      if (selectedPlayer === toggle) {

        toggle.classList.remove("active");

        selectedPlayer = null;

        return;
      }


      // ==========================================
      // SWAP THE PLAYER NAMES
      // ==========================================

      const tempText = selectedPlayer.textContent;

      selectedPlayer.textContent =
        toggle.textContent;

      toggle.textContent =
        tempText;


      // Deselect both players
      selectedPlayer.classList.remove("active");
      toggle.classList.remove("active");


      // Clear selection
      selectedPlayer = null;

    });

  });

} else {

// Hide player toggles on Crosskeys and Trial
playerTogglesColumn.style.display = "none";

}

if (team === "crosskeys") {
  teamName.textContent = "CROSSKEYS";
  buttonTeamName.textContent = "CROSSKEYS";

} else if (team === "trial") {
  teamName.textContent = "TRIAL";
  buttonTeamName.textContent = "TRIAL";

} else if (team === "testing") {
  teamName.textContent = "TESTING";
  buttonTeamName.textContent = "TESTING";
}

const watermarkLogo = document.getElementById("watermark-logo");

if (team === "crosskeys") {

  watermarkLogo.src =
    "https://crosskeysnetballclub.co.uk/wp-content/uploads/2023/02/cropped-cropped-cropped-Crosskeys-logo-01-1-1.png";

} else if (team === "trial") {

  watermarkLogo.src = "images/trial-logo.png";

}

const buttons = document.querySelectorAll(".tag-button");

const clearLastButton = document.getElementById("clear-last");

// CLOCK
const matchClock = document.querySelector("#match-clock");
const startButton = document.querySelector("#start-match");

let seconds = 0;
let timer = null;
let running = false;

function updateClock() {

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  matchClock.textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(remainingSeconds).padStart(2, "0");

  seconds++;

}

startButton.addEventListener("click", () => {

  if (!running) {

    timer = setInterval(updateClock, 1000);
    running = true;

  } else {

    clearInterval(timer);
    running = false;

  }

});

const restartButton = document.querySelector("#clock-restart");

restartButton.addEventListener("click", () => {

  seconds = 0;
  matchClock.textContent = "00:00";

});

// SCORE UPDATE
let teamScore = 0;
let oppositionScore = 0;

let history = [];

const teamScoreText = document.getElementById("team-score");
const oppositionScoreText = document.getElementById("opposition-score");
const eventFeed = document.getElementById("event-feed");
const oppositionButton = document.getElementById("opposition-score-btn");

function scrollGameFeedToBottom() {
  eventFeed.scrollTop = eventFeed.scrollHeight;
}

function updateTeamScore() {
  teamScoreText.textContent = teamScore;
}

function updateOppositionScore() {
  oppositionScoreText.textContent = oppositionScore;
}


// ======================================================
// SHOT SUCCESS
// ======================================================

const shotScoredButton = document.querySelector("#level1-attack-shot-success");
const shotMissedButton = document.querySelector("#level1-attack-shot-missed");
const shotPercentageText = document.querySelector("#level1-shot-percentage");
const shotProgressFill = document.querySelector("#level1-progress-fill");

let gsShotSuccess = 0;
let gsShotMissed = 0;

function updateShotPercentage() {

  const scored = Number(shotScoredButton.querySelector(".counter").textContent);
  const missed = Number(shotMissedButton.querySelector(".counter").textContent);

  const total = scored + missed;

  if (total === 0) {

    shotPercentageText.textContent = "0%";
    shotProgressFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((scored / total) * 100);

  shotPercentageText.textContent = percentage + "%";
  shotProgressFill.style.width = percentage + "%";

}

function updateGSShotPercentage() {

  const total = gsShotSuccess + gsShotMissed;

  const gsText = document.querySelector("#gs-shot-percentage");
  const gsFill = document.querySelector("#gs-shot-fill");

  if (total === 0) {

    gsText.textContent = "0%";
    gsFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((gsShotSuccess / total) * 100);

  gsText.textContent = percentage + "%";
  gsFill.style.width = percentage + "%";

}


// ======================================================
// ATTACK REBOUND
// ======================================================

const reboundWon = document.querySelector("#level1-attack-rebound-won");
const reboundLost = document.querySelector("#level1-attack-rebound-lost");
const reboundText = document.querySelector("#level1-attack-rebound-percentage");
const reboundFill = document.querySelector("#level1-attack-rebound-fill");

let gsReboundWon = 0;
let gsReboundLost = 0;

function updateAttackReboundPercentage() {

  const won = Number(reboundWon.querySelector(".counter").textContent);
  const lost = Number(reboundLost.querySelector(".counter").textContent);

  const total = won + lost;

  if (total === 0) {

    reboundText.textContent = "0%";
    reboundFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((won / total) * 100);

  reboundText.textContent = percentage + "%";
  reboundFill.style.width = percentage + "%";

}

function updateGSAttackReboundPercentage() {

  const total = gsReboundWon + gsReboundLost;

  const gsText = document.querySelector("#gs-attack-rebound-percentage");
  const gsFill = document.querySelector("#gs-attack-rebound-fill");

  if (total === 0) {

    gsText.textContent = "0%";
    gsFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((gsReboundWon / total) * 100);

  gsText.textContent = percentage + "%";
  gsFill.style.width = percentage + "%";

}


// ======================================================
// FEED SUCCESS
// ======================================================

const feedSuccess = document.querySelector("#level1-feed-success");
const feedMissed = document.querySelector("#level1-feed-missed");
const feedText = document.querySelector("#level1-feed-success-percentage");
const feedFill = document.querySelector("#level1-feed-success-fill");

let gsFeedSuccess = 0;
let gsFeedMissed = 0;

function updateFeedSuccessPercentage() {

  const won = Number(feedSuccess.querySelector(".counter").textContent);
  const lost = Number(feedMissed.querySelector(".counter").textContent);

  const total = won + lost;

  if (total === 0) {

    feedText.textContent = "0%";
    feedFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((won / total) * 100);

  feedText.textContent = percentage + "%";
  feedFill.style.width = percentage + "%";

}

function updateGSFeedSuccessPercentage() {

  const total = gsFeedSuccess + gsFeedMissed;

  const gsText = document.querySelector("#gs-feed-success-percentage");
  const gsFill = document.querySelector("#gs-feed-success-fill");

  if (total === 0) {

    gsText.textContent = "0%";
    gsFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((gsFeedSuccess / total) * 100);

  gsText.textContent = percentage + "%";
  gsFill.style.width = percentage + "%";

}


// ======================================================
// CENTRE SUCCESS
// ======================================================

const centreSuccess = document.querySelector("#level1-centre-success");
const centreMissed = document.querySelector("#level1-centre-missed");
const centreText = document.querySelector("#level1-centre-success-percentage");
const centreFill = document.querySelector("#level1-centre-success-fill");

let gsCentreSuccess = 0;
let gsCentreMissed = 0;

function updateCentreSuccessPercentage() {

  const won = Number(centreSuccess.querySelector(".counter").textContent);
  const lost = Number(centreMissed.querySelector(".counter").textContent);

  const total = won + lost;

  if (total === 0) {

    centreText.textContent = "0%";
    centreFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((won / total) * 100);

  centreText.textContent = percentage + "%";
  centreFill.style.width = percentage + "%";

}

function updateGSCentreSuccessPercentage() {

  const total = gsCentreSuccess + gsCentreMissed;

  const gsText = document.querySelector("#gs-centre-success-percentage");
  const gsFill = document.querySelector("#gs-centre-success-fill");

  if (total === 0) {

    gsText.textContent = "0%";
    gsFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((gsCentreSuccess / total) * 100);

  gsText.textContent = percentage + "%";
  gsFill.style.width = percentage + "%";

}


// ======================================================
// DEFENSIVE REBOUNDS
// ======================================================

const lvl1dreboundwon = document.querySelector("#level1-defence-rebound-won");
const lvl1dreboundlost = document.querySelector("#level1-defence-rebound-lost");
const lvl1dreboundText = document.querySelector("#level1-defence-rebound-percentage");
const lvl1dreboundFill = document.querySelector("#level1-defence-rebound-fill");

let gsDReboundWon = 0;
let gsDReboundLost = 0;

function updateDefenceReboundPercentage() {

  const won = Number(lvl1dreboundwon.querySelector(".counter").textContent);
  const lost = Number(lvl1dreboundlost.querySelector(".counter").textContent);

  const total = won + lost;

  if (total === 0) {

    lvl1dreboundText.textContent = "0%";
    lvl1dreboundFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((won / total) * 100);

  lvl1dreboundText.textContent = percentage + "%";
  lvl1dreboundFill.style.width = percentage + "%";

}

function updateGSDReboundPercentage() {

  const total = gsDReboundWon + gsDReboundLost;

  const gsText = document.querySelector("#gs-defence-rebound-percentage");
  const gsFill = document.querySelector("#gs-defence-rebound-fill");

  if (total === 0) {

    gsText.textContent = "0%";
    gsFill.style.width = "0%";

    return;
  }

  const percentage = Math.round((gsDReboundWon / total) * 100);

  gsText.textContent = percentage + "%";
  gsFill.style.width = percentage + "%";

}


// ======================================================
// TURNOVER
// ======================================================

const turnoverButton = document.querySelector("#level1-attack-turnover");
const turnoverText = document.querySelector("#level1-turnover-count");
const turnoverFill = document.querySelector("#level1-turnover-fill");

let turnoverCount = 0;

const TURNOVER_MAX = 10;

let gsTurnoverCount = 0;

function updateTurnover() {

  turnoverText.textContent = turnoverCount;

  turnoverFill.style.width =
    (turnoverCount / TURNOVER_MAX) * 100 + "%";

}

function updateGSTurnover() {

  const gsText = document.querySelector("#gs-turnover-count");
  const gsFill = document.querySelector("#gs-turnover-fill");

  gsText.textContent = gsTurnoverCount;

  gsFill.style.width =
    (gsTurnoverCount / TURNOVER_MAX) * 100 + "%";

}


// ======================================================
// ATTACK UNFORCED ERROR
// ======================================================

const unforcedErrorButton = document.querySelector("#level1-unforced-error");
const unforcedErrorText = document.querySelector("#level1-unforced-error-count");
const unforcedErrorFill = document.querySelector("#level1-unforced-error-fill");

let unforcedErrorCount = 0;

const UNFORCED_ERROR_MAX = 10;

let gsUnforcedErrorCount = 0;

function updateUnforcedError() {

  unforcedErrorText.textContent = unforcedErrorCount;

  unforcedErrorFill.style.width =
    (unforcedErrorCount / UNFORCED_ERROR_MAX) * 100 + "%";

}

function updateGSUnforcedError() {

  const gsText = document.querySelector("#gs-unforced-error-count");
  const gsFill = document.querySelector("#gs-unforced-error-fill");

  gsText.textContent = gsUnforcedErrorCount;

  gsFill.style.width =
    (gsUnforcedErrorCount / UNFORCED_ERROR_MAX) * 100 + "%";

}


// ======================================================
// DEFENCE UNFORCED ERROR
// ======================================================

const dunforcedErrorButton = document.querySelector("#level1-defence-unforced-error");
const dunforcedErrorText = document.querySelector("#level1-defence-unforced-error-count");
const dunforcedErrorFill = document.querySelector("#level1-defence-unforced-error-fill");

let dunforcedErrorCount = 0;

const DUNFORCED_ERROR_MAX = 10;

function updateDunforcedError() {

  dunforcedErrorText.textContent = dunforcedErrorCount;

  dunforcedErrorFill.style.width =
    (dunforcedErrorCount / DUNFORCED_ERROR_MAX) * 100 + "%";

}


// ======================================================
// UNDO LAST ACTION
// ======================================================

function undoLastAction() {

  const lastAction = history.pop();

  if (!lastAction) return;

  // Remove most recent game feed event
  eventFeed.firstElementChild?.remove();


  switch(lastAction.button) {


    // --------------------------------------------
    // SHOT SCORED
    // --------------------------------------------

    case "level1-attack-shot-success":

      teamScore--;
      updateTeamScore();

      shotScoredButton.querySelector(".counter").textContent =
        Number(shotScoredButton.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsShotSuccess--;
      }

      break;


    // --------------------------------------------
    // SHOT MISSED
    // --------------------------------------------

    case "level1-attack-shot-missed":

      shotMissedButton.querySelector(".counter").textContent =
        Number(shotMissedButton.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsShotMissed--;
      }

      break;


    // --------------------------------------------
    // ATTACK REBOUND WON
    // --------------------------------------------

    case "level1-attack-rebound-won":

      reboundWon.querySelector(".counter").textContent =
        Number(reboundWon.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsReboundWon--;
      }

      break;


    // --------------------------------------------
    // ATTACK REBOUND LOST
    // --------------------------------------------

    case "level1-attack-rebound-lost":

      reboundLost.querySelector(".counter").textContent =
        Number(reboundLost.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsReboundLost--;
      }

      break;


    // --------------------------------------------
    // FEED SUCCESS
    // --------------------------------------------

    case "level1-feed-success":

      feedSuccess.querySelector(".counter").textContent =
        Number(feedSuccess.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsFeedSuccess--;
      }

      break;


    // --------------------------------------------
    // FEED FAIL
    // --------------------------------------------

    case "level1-feed-missed":

      feedMissed.querySelector(".counter").textContent =
        Number(feedMissed.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsFeedMissed--;
      }

      break;


    // --------------------------------------------
    // CENTRE SUCCESS
    // --------------------------------------------

    case "level1-centre-success":

      centreSuccess.querySelector(".counter").textContent =
        Number(centreSuccess.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsCentreSuccess--;
      }

      break;


    // --------------------------------------------
    // CENTRE FAIL
    // --------------------------------------------

    case "level1-centre-missed":

      centreMissed.querySelector(".counter").textContent =
        Number(centreMissed.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsCentreMissed--;
      }

      break;


    // --------------------------------------------
    // TURNOVER
    // --------------------------------------------

    case "level1-attack-turnover":

      turnoverCount--;

      updateTurnover();

      turnoverButton.querySelector(".counter").textContent =
        Number(turnoverButton.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsTurnoverCount--;
      }

      break;


    // --------------------------------------------
    // UNFORCED ERROR
    // --------------------------------------------

    case "level1-unforced-error":

      unforcedErrorCount--;

      updateUnforcedError();

      unforcedErrorButton.querySelector(".counter").textContent =
        Number(unforcedErrorButton.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsUnforcedErrorCount--;
      }

      break;


    // --------------------------------------------
    // DEFENSIVE REBOUND WON
    // --------------------------------------------

    case "level1-defence-rebound-won":

      lvl1dreboundwon.querySelector(".counter").textContent =
        Number(lvl1dreboundwon.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsDReboundWon--;
      }

      break;


    // --------------------------------------------
    // DEFENSIVE REBOUND LOST
    // --------------------------------------------

    case "level1-defence-rebound-lost":

      lvl1dreboundlost.querySelector(".counter").textContent =
        Number(lvl1dreboundlost.querySelector(".counter").textContent) - 1;

      if (lastAction.gs) {
        gsDReboundLost--;
      }

      break;


    // --------------------------------------------
    // DEFENCE UNFORCED ERROR
    // --------------------------------------------

    case "level1-defence-unforced-error":

      dunforcedErrorCount--;

      updateDunforcedError();

      dunforcedErrorButton.querySelector(".counter").textContent =
        Number(dunforcedErrorButton.querySelector(".counter").textContent) - 1;

      break;


    // --------------------------------------------
    // OPPOSITION SCORE
    // --------------------------------------------

    case "opposition-score-btn":

      oppositionScore--;

      updateOppositionScore();

      oppositionButton.querySelector(".counter").textContent =
        Number(oppositionButton.querySelector(".counter").textContent) - 1;

      break;

  }


  // Refresh all statistics

  updateShotPercentage();

  updateAttackReboundPercentage();
  updateGSAttackReboundPercentage();

  updateGSShotPercentage();

  updateFeedSuccessPercentage();
  updateGSFeedSuccessPercentage();

  updateCentreSuccessPercentage();
  updateGSCentreSuccessPercentage();

  updateDefenceReboundPercentage();
  updateGSDReboundPercentage();

  updateTurnover();
  updateGSTurnover();

  updateUnforcedError();
  updateGSUnforcedError();

}


// ======================================================
// MAIN HANDLERS
// ======================================================

buttons.forEach((button) => {

  const counter = button.querySelector(".counter");

  if (!counter) return;

  button.addEventListener("click", () => {


    // --------------------------------------------
    // RECORD ACTION
    // --------------------------------------------

    const isGS = gsToggle.classList.contains("active");

    counter.textContent =
      Number(counter.textContent) + 1;

    history.push({
      button: button.id,
      time: matchClock.textContent,
      gs: isGS
    });


    // --------------------------------------------
    // REFRESH NORMAL MATCH REPORT
    // --------------------------------------------

    updateShotPercentage();
    updateAttackReboundPercentage();
    updateGSAttackReboundPercentage();

    updateFeedSuccessPercentage();
    updateGSFeedSuccessPercentage();

    updateCentreSuccessPercentage();
    updateGSCentreSuccessPercentage();

    updateDefenceReboundPercentage();


    // ==================================================
    // TURNOVER
    // ==================================================

    if (button.id === "level1-attack-turnover") {

      if (turnoverCount < TURNOVER_MAX) {
        turnoverCount++;
        updateTurnover();
      }

      if (isGS) {
        gsTurnoverCount++;
        updateGSTurnover();
      }

    }


    // ==================================================
    // UNFORCED ERROR
    // ==================================================

    if (button.id === "level1-unforced-error") {

      if (unforcedErrorCount < UNFORCED_ERROR_MAX) {
        unforcedErrorCount++;
        updateUnforcedError();
      }

      if (isGS) {
        gsUnforcedErrorCount++;
        updateGSUnforcedError();
      }

    }


    // ==================================================
    // DEFENCE UNFORCED ERROR
    // ==================================================

    if (button.id === "level1-defence-unforced-error") {

      if (dunforcedErrorCount < DUNFORCED_ERROR_MAX) {
        dunforcedErrorCount++;
        updateDunforcedError();
      }

    }


    // ==================================================
    // GAME FEED - SHOT SCORED
    // ==================================================

    if (button.id === "level1-attack-shot-success") {

      teamScore++;
      updateTeamScore();

      if (isGS) {
        gsShotSuccess++;
        updateGSShotPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="shot-scored-event">${matchClock.textContent} - ${playerPrefix}SHOT SCORED</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - SHOT MISSED
    // ==================================================

    if (button.id === "level1-attack-shot-missed") {

      if (isGS) {
        gsShotMissed++;
        updateGSShotPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="shot-missed-event">${matchClock.textContent} - ${playerPrefix}SHOT MISSED</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - ATTACK REBOUND WON
    // ==================================================

    if (button.id === "level1-attack-rebound-won") {

      if (isGS) {
        gsReboundWon++;
        updateGSAttackReboundPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="attack-rebound-won-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND WON</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - ATTACK REBOUND LOST
    // ==================================================

    if (button.id === "level1-attack-rebound-lost") {

      if (isGS) {
        gsReboundLost++;
        updateGSAttackReboundPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="attack-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND LOST</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - FEED SUCCESS
    // ==================================================

    if (button.id === "level1-feed-success") {

      if (isGS) {
        gsFeedSuccess++;
        updateGSFeedSuccessPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="feed-success-event">${matchClock.textContent} - ${playerPrefix}FEED SUCCESS</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - FEED FAIL
    // ==================================================

    if (button.id === "level1-feed-missed") {

      if (isGS) {
        gsFeedMissed++;
        updateGSFeedSuccessPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="feed-missed-event">${matchClock.textContent} - ${playerPrefix}FEED FAIL</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - CENTRE SUCCESS
    // ==================================================

    if (button.id === "level1-centre-success") {

      if (isGS) {
        gsCentreSuccess++;
        updateGSCentreSuccessPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="centre-success-event">${matchClock.textContent} - ${playerPrefix}CENTRE SUCCESS</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - CENTRE FAIL
    // ==================================================

    if (button.id === "level1-centre-missed") {

      if (isGS) {
        gsCentreMissed++;
        updateGSCentreSuccessPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="centre-fail-event">${matchClock.textContent} - ${playerPrefix}CENTRE FAIL</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - TURNOVER
    // ==================================================

    if (button.id === "level1-attack-turnover") {

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="turnover-event">${matchClock.textContent} - ${playerPrefix}TURNOVER</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - UNFORCED ERROR
    // ==================================================

    if (button.id === "level1-unforced-error") {

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="unforced-error-event">${matchClock.textContent} - ${playerPrefix}UNFORCED ERROR</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - DEFENCE REBOUND WON
    // ==================================================

    if (button.id === "level1-defence-rebound-won") {

      if (isGS) {
        gsDReboundWon++;
        updateGSDReboundPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="defence-rebound-won-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND WON</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - DEFENCE REBOUND LOST
    // ==================================================

    if (button.id === "level1-defence-rebound-lost") {

      if (isGS) {
        gsDReboundLost++;
        updateGSDReboundPercentage();
      }

      const playerPrefix = isGS ? "GS " : "";

      eventFeed.innerHTML =
        `<div class="defence-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND LOST</div>` +
        eventFeed.innerHTML;

      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - OPPOSITION SCORE
    // ==================================================

    if (button.id === "opposition-score-btn") {

      oppositionScore++;

      updateOppositionScore();

      eventFeed.innerHTML =
        `<div class="oppo-score-event">${matchClock.textContent} - OPPO SCORE</div>` +
        eventFeed.innerHTML;

    }

  });

});


clearLastButton.addEventListener("click", undoLastAction);

});