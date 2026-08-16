document.addEventListener("DOMContentLoaded", () => {

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
let crosskeysScore = 0;
let oppositionScore = 0;

let history = [];

const crosskeysScoreText = document.getElementById("crosskeys-score");
const oppositionScoreText = document.getElementById("opposition-score");
const eventFeed = document.getElementById("event-feed");
const oppositionButton = document.getElementById("opposition-score-btn");

function scrollGameFeedToBottom() {
  eventFeed.scrollTop = eventFeed.scrollHeight;
    
}
  
function updateCrosskeysScore() {
  crosskeysScoreText.textContent = crosskeysScore;
}

function updateOppositionScore() {
  oppositionScoreText.textContent = oppositionScore;
}

// SHOT SUCCESS
const shotScoredButton = document.querySelector("#level1-attack-shot-success");
const shotMissedButton = document.querySelector("#level1-attack-shot-missed");
const shotPercentageText = document.querySelector("#level1-shot-percentage");
const shotProgressFill = document.querySelector("#level1-progress-fill");

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


// ATTACK REBOUND
const reboundWon = document.querySelector("#level1-attack-rebound-won");
const reboundLost = document.querySelector("#level1-attack-rebound-lost");
const reboundText = document.querySelector("#level1-attack-rebound-percentage");
const reboundFill = document.querySelector("#level1-attack-rebound-fill");

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


// FEED SUCCESS
const feedSuccess = document.querySelector("#level1-feed-success");
const feedMissed = document.querySelector("#level1-feed-missed");
const feedText = document.querySelector("#level1-feed-success-percentage");
const feedFill = document.querySelector("#level1-feed-success-fill");

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

            crosskeysScore--;
            updateCrosskeysScore();

            shotScoredButton.querySelector(".counter").textContent =
            Number(shotScoredButton.querySelector(".counter").textContent) - 1;

            break;


        case "level1-attack-shot-missed":

            shotMissedButton.querySelector(".counter").textContent =
            Number(shotMissedButton.querySelector(".counter").textContent) - 1;

            break;


        case "level1-attack-rebound-won":

            reboundWon.querySelector(".counter").textContent =
            Number(reboundWon.querySelector(".counter").textContent) - 1;

            break;


        case "level1-attack-rebound-lost":

            reboundLost.querySelector(".counter").textContent =
            Number(reboundLost.querySelector(".counter").textContent) - 1;

            break;


        case "level1-feed-success":

            feedSuccess.querySelector(".counter").textContent =
            Number(feedSuccess.querySelector(".counter").textContent) - 1;

            break;


        case "level1-feed-missed":

            feedMissed.querySelector(".counter").textContent =
            Number(feedMissed.querySelector(".counter").textContent) - 1;

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
    time: matchClock.textContent
});

    updateShotPercentage();
    updateAttackReboundPercentage();
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
    crosskeysScore++;
   
    updateCrosskeysScore();
      
      eventFeed.innerHTML = `<div class="shot-scored-event">${matchClock.textContent} - SHOT SCORED</div>` +
  eventFeed.innerHTML;
      
    } 
    
    //GAMEFEED UPDATE shot missed
    if (button.id === "level1-attack-shot-missed") {
  eventFeed.innerHTML = `<div class="shot-missed-event">${matchClock.textContent} - SHOT MISSED</div>`+
  eventFeed.innerHTML;
      
    }
      
    //GAMEFEEWD UPDATE attacking rebound won
      if (button.id === "level1-attack-rebound-won") {
  eventFeed.innerHTML = `<div class="attack-rebound-won-event">${matchClock.textContent} - ATTACK REBOUND WON</div>`+
  eventFeed.innerHTML;
      
    }
    
    //GAMEFEED UPDATE attacking rebound lost
     if (button.id === "level1-attack-rebound-lost") {
  eventFeed.innerHTML = `<div class="attack-rebound-lost-event">${matchClock.textContent} - ATTACKREBOUND LOST</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE feed success
     if (button.id === "level1-feed-success") {
  eventFeed.innerHTML = `<div class="feed-success-event">${matchClock.textContent} - FEED SUCCESS</div>`+
  eventFeed.innerHTML;
       
    }
    
    //GAMEFEED UPDATE feed missed
     if (button.id === "level1-feed-missed") {
  eventFeed.innerHTML = `<div class="feed-missed-event">${matchClock.textContent} - FEED FAIL</div>`+
  eventFeed.innerHTML;
       
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
     `<div class="defence-rebound-lost-event">${matchClock.textContent} - DEFENCEREBOUND LOST</div>` +
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