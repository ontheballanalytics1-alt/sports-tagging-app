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
const matchReportBox = document.querySelector(".match-report-box");
const gsBox = document.querySelector(".gs-box");

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
  matchReportTab.style.display = "flex";
  gsTab.style.display = "flex";
  matchReportBox.style.display = "block";
  gsBox.style.display = "none";
  matchReportTab.classList.add("active");
  gsTab.classList.remove("active");

  matchReportTab.addEventListener("click", () => {
  matchReportBox.style.display = "block";
  gsBox.style.display = "none";

  matchReportTab.classList.add("active");
  gsTab.classList.remove("active");
});

gsTab.addEventListener("click", () => {
  matchReportBox.style.display = "none";
  gsBox.style.display = "block";

  gsTab.classList.add("active");
  matchReportTab.classList.remove("active");
});

  // GS toggle
  gsToggle.addEventListener("click", () => {
    gsToggle.classList.toggle("active");
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

    // Don't allow swapping when locked
    if (playerLock.classList.contains("locked")) {
      return;
    }

    // First player clicked
    if (selectedPlayer === null) {

      selectedPlayer = toggle;
      toggle.classList.add("active");

      return;
    }

    // Clicking the same player cancels selection
    if (selectedPlayer === toggle) {

      toggle.classList.remove("active");
      selectedPlayer = null;

      return;
    }

    // Swap the player names
    const tempText = selectedPlayer.textContent;
    selectedPlayer.textContent = toggle.textContent;
    toggle.textContent = tempText;

    // Turn both toggles off
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

// SHOT SUCCESS
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


// ATTACK REBOUND
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
    const total = Number(reboundWon.querySelector(".counter").textContent) +
                  Number(reboundLost.querySelector(".counter").textContent);

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

// FEED SUCCESS
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


// CENTRE SUCCESS
const centreSuccess = document.querySelector("#level1-centre-success");
const centreMissed = document.querySelector("#level1-centre-missed");
const centreText = document.querySelector("#level1-centre-success-percentage");
const centreFill = document.querySelector("#level1-centre-success-fill");

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

// DEFENSIVE REBOUNDS
const lvl1dreboundwon = document.querySelector("#level1-defence-rebound-won");
const lvl1dreboundlost = document.querySelector("#level1-defence-rebound-lost");
const lvl1dreboundText = document.querySelector("#level1-defence-rebound-percentage");
const lvl1dreboundFill = document.querySelector("#level1-defence-rebound-fill");

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


// TURNOVER (0–10 cap)
const turnoverButton = document.querySelector("#level1-attack-turnover");
const turnoverText = document.querySelector("#level1-turnover-count");
const turnoverFill = document.querySelector("#level1-turnover-fill");

let turnoverCount = 0;
const TURNOVER_MAX = 10;

function updateTurnover() {
  turnoverText.textContent = turnoverCount;
  turnoverFill.style.width = (turnoverCount / TURNOVER_MAX) * 100 + "%";
}


// ATTACK UNFORCED ERROR (FIXED)
const unforcedErrorButton = document.querySelector("#level1-unforced-error");
const unforcedErrorText = document.querySelector("#level1-unforced-error-count");
const unforcedErrorFill = document.querySelector("#level1-unforced-error-fill");

let unforcedErrorCount = 0;
const UNFORCED_ERROR_MAX = 10;

function updateUnforcedError() {
  unforcedErrorText.textContent = unforcedErrorCount;
  unforcedErrorFill.style.width = (unforcedErrorCount / UNFORCED_ERROR_MAX) * 100 + "%";
}

function undoLastAction() {

    const lastAction = history.pop();

    if (!lastAction) return;


    // REMOVE GAME FEED
    eventFeed.firstElementChild?.remove();


    switch(lastAction.button) {


        case "level1-attack-shot-success":

    teamScore--;
    updateTeamScore();

    shotScoredButton.querySelector(".counter").textContent =
    Number(shotScoredButton.querySelector(".counter").textContent) - 1;

    if (lastAction.gs) {
        gsShotSuccess--;
    }

    break;


        case "level1-attack-shot-missed":

    shotMissedButton.querySelector(".counter").textContent =
    Number(shotMissedButton.querySelector(".counter").textContent) - 1;

    if (lastAction.gs) {
        gsShotMissed--;
    }

    break;


        case "level1-attack-rebound-won":

    reboundWon.querySelector(".counter").textContent =
    Number(reboundWon.querySelector(".counter").textContent) - 1;

    if (lastAction.gs) {
        gsReboundWon--;
    }

    break;


        case "level1-attack-rebound-lost":

            reboundLost.querySelector(".counter").textContent =
            Number(reboundLost.querySelector(".counter").textContent) - 1;

            if (lastAction.gs) {
            gsReboundLost--;
}

            break;


        case "level1-feed-success":
    feedSuccess.querySelector(".counter").textContent =
    Number(feedSuccess.querySelector(".counter").textContent) - 1;

    if (lastAction.gs) {
        gsFeedSuccess--;
    }

    break;

case "level1-feed-missed":
    feedMissed.querySelector(".counter").textContent =
    Number(feedMissed.querySelector(".counter").textContent) - 1;

    if (lastAction.gs) {
        gsFeedMissed--;
    }

    break;


        case "level1-centre-success":

            centreSuccess.querySelector(".counter").textContent =
            Number(centreSuccess.querySelector(".counter").textContent) - 1;

            break;


        case "level1-centre-missed":

            centreMissed.querySelector(".counter").textContent =
            Number(centreMissed.querySelector(".counter").textContent) - 1;

            break;

        case "level1-attack-turnover":

            turnoverCount--;
            updateTurnover();

            turnoverButton.querySelector(".counter").textContent =
            Number(turnoverButton.querySelector(".counter").textContent) - 1;

            break;

        case "level1-unforced-error":

            unforcedErrorCount--;
            updateUnforcedError();

            unforcedErrorButton.querySelector(".counter").textContent =
            Number(unforcedErrorButton.querySelector(".counter").textContent) - 1;

            break;

        case "level1-defence-rebound-won":

            lvl1dreboundwon.querySelector(".counter").textContent =
            Number(lvl1dreboundwon.querySelector(".counter").textContent) - 1;

            break;

        case "level1-defence-rebound-lost":

            lvl1dreboundlost.querySelector(".counter").textContent =
            Number(lvl1dreboundlost.querySelector(".counter").textContent) - 1;

            break;

        case "level1-defence-unforced-error":

           dunforcedErrorCount--;
           updateDunforcedError();

           dunforcedErrorButton.querySelector(".counter").textContent =
           Number(dunforcedErrorButton.querySelector(".counter").textContent) - 1;

            break;


        case "opposition-score-btn":

           oppositionScore--;
           updateOppositionScore();

           oppositionButton.querySelector(".counter").textContent =
           Number(oppositionButton.querySelector(".counter").textContent) - 1;

            break;
          
    }


    // refresh percentages
updateShotPercentage();
updateAttackReboundPercentage();
updateGSAttackReboundPercentage();
updateGSShotPercentage();
updateGSFeedSuccessPercentage();
updateFeedSuccessPercentage();
updateCentreSuccessPercentage();
updateDefenceReboundPercentage();

}

// DEFENCE UNFORCED ERROR (FIXED)
const dunforcedErrorButton = document.querySelector("#level1-defence-unforced-error");
const dunforcedErrorText = document.querySelector("#level1-defence-unforced-error-count");
const dunforcedErrorFill = document.querySelector("#level1-defence-unforced-error-fill");

let dunforcedErrorCount = 0;
const DUNFORCED_ERROR_MAX = 10;

function updateDunforcedError() {
  dunforcedErrorText.textContent = dunforcedErrorCount;
  dunforcedErrorFill.style.width = (dunforcedErrorCount / DUNFORCED_ERROR_MAX) * 100 + "%";
}


// MAIN HANDLERS
buttons.forEach((button) => {

  const counter = button.querySelector(".counter");
  if (!counter) return;

  button.addEventListener("click", () => {
    counter.textContent = Number(counter.textContent) + 1;

   history.push({
    button: button.id,
    time: matchClock.textContent,
    gs: gsToggle.classList.contains("active")
});

    updateShotPercentage();
    updateAttackReboundPercentage();
    updateGSAttackReboundPercentage();
    updateFeedSuccessPercentage();
    updateCentreSuccessPercentage();
    
    updateDefenceReboundPercentage();

    // TURNOVER
    if (button.id === "level1-attack-turnover") {
      if (turnoverCount < TURNOVER_MAX) {
        turnoverCount++;
        updateTurnover();
      }
    }

    // UNFORCED ERROR (FIXED)
    if (button.id === "level1-unforced-error") {
      if (unforcedErrorCount < UNFORCED_ERROR_MAX) {
        unforcedErrorCount++;
        updateUnforcedError();
      }
    }

    // DEFENCE UNFORCED ERROR
    if (button.id === "level1-defence-unforced-error") {
      if (dunforcedErrorCount < DUNFORCED_ERROR_MAX) {
        dunforcedErrorCount++;
        updateDunforcedError();
      }
    }
    
    //GAMEFEED UPDATE shot scored
if (button.id === "level1-attack-shot-success") {

    const isGS = gsToggle.classList.contains("active");

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

    // Turn GS toggle off after the action
    gsToggle.classList.remove("active");
}


//GAMEFEED UPDATE shot missed
if (button.id === "level1-attack-shot-missed") {

    const isGS = gsToggle.classList.contains("active");

    if (isGS) {
        gsShotMissed++;
        updateGSShotPercentage();
    }

    const playerPrefix = isGS ? "GS " : "";

    eventFeed.innerHTML =
        `<div class="shot-missed-event">${matchClock.textContent} - ${playerPrefix}SHOT MISSED</div>` +
        eventFeed.innerHTML;

    // Turn GS toggle off after the action
    gsToggle.classList.remove("active");
}
      
    // GAMEFEED UPDATE attacking rebound won
if (button.id === "level1-attack-rebound-won") {

  const playerPrefix = gsToggle.classList.contains("active") ? "GS " : "";
  if (gsToggle.classList.contains("active")) {
  gsReboundWon++;
  updateGSAttackReboundPercentage();
}

  eventFeed.innerHTML =
    `<div class="attack-rebound-won-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND WON</div>` +
    eventFeed.innerHTML;

  // Turn GS toggle off after the action
  gsToggle.classList.remove("active");
  
}
    
    //GAMEFEED UPDATE attacking rebound lost
     if (button.id === "level1-attack-rebound-lost") {

      const playerPrefix = gsToggle.classList.contains("active") ? "GS " : "";

      if (gsToggle.classList.contains("active")) {
    gsReboundLost++;
    updateGSAttackReboundPercentage();
  }

  eventFeed.innerHTML = `<div class="attack-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND LOST</div>`+
  eventFeed.innerHTML;

  // Turn GS toggle off after the action
  gsToggle.classList.remove("active");
       
    }
    
    //GAMEFEED UPDATE feed success
     if (button.id === "level1-feed-success") {

  const isGS = gsToggle.classList.contains("active");

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
    
    //GAMEFEED UPDATE feed missed
     if (button.id === "level1-feed-missed") {

  const isGS = gsToggle.classList.contains("active");

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
    
    //GAMEFEED UPDATE centre success
     if (button.id === "level1-centre-success") {
  eventFeed.innerHTML = `<div class="centre-success-event">${matchClock.textContent} - CENTRE SUCCESS</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE centre fail
     if (button.id === "level1-centre-missed") {
  eventFeed.innerHTML = `<div class="centre-fail-event">${matchClock.textContent} - CENTRE FAIL</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE turnover
     if (button.id === "level1-attack-turnover") {
  eventFeed.innerHTML = `<div class="turnover-event">${matchClock.textContent} - TURNOVER</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE unforced error
     if (button.id === "level1-unforced-error") {
  eventFeed.innerHTML = `<div class="unforced-error-event">${matchClock.textContent} - UNFORCED ERROR</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE defence rebound won
     if (button.id === "level1-defence-rebound-won") {
  eventFeed.innerHTML = 
  `<div class="defence-rebound-won-event">${matchClock.textContent} - DEFENCE REBOUND WON</div>` +
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE defence rebound lost
     if (button.id === "level1-defence-rebound-lost") {
      eventFeed.innerHTML =
     `<div class="defence-rebound-lost-event">${matchClock.textContent} - DEFENCE REBOUND LOST</div>` +
     eventFeed.innerHTML;
       
    }
    
    // GAMEFEED UPDATE oppo score
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