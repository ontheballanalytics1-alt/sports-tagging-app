document.addEventListener("DOMContentLoaded", () => {

  // ======================================================
  // LOGIN SECURITY
  // ======================================================

  const SESSION_TIMEOUT = 30 * 60 * 1000;

  let idleTimer;

  function logoutUser() {

    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("lastActivity");

    window.location.replace("index.html");

  }


  function checkLoginSession() {

    const loggedIn =
      sessionStorage.getItem("loggedIn");

    const lastActivity =
      Number(
        sessionStorage.getItem("lastActivity")
      );


    if (
      loggedIn !== "true" ||
      !lastActivity
    ) {

      logoutUser();

      return false;

    }


    if (
      Date.now() - lastActivity >=
      SESSION_TIMEOUT
    ) {

      logoutUser();

      return false;

    }


    return true;

  }


  function resetIdleTimer() {

    sessionStorage.setItem(
      "lastActivity",
      Date.now()
    );

    clearTimeout(idleTimer);

    idleTimer =
      setTimeout(
        logoutUser,
        SESSION_TIMEOUT
      );

  }


  if (!checkLoginSession()) {
    return;
  }


  resetIdleTimer();


  [
    "click",
    "touchstart",
    "pointerdown",
    "keydown"
  ].forEach((eventName) => {

    document.addEventListener(
      eventName,
      resetIdleTimer
    );

  });


  window.addEventListener(
    "pageshow",
    () => {

      checkLoginSession();

    }
  );


  // ======================================================
  // TEAM
  // ======================================================

  const params =
    new URLSearchParams(
      window.location.search
    );

  const team =
    params.get("team");


  const teamName =
    document.getElementById(
      "team-name"
    );

  const buttonTeamName =
    document.getElementById(
      "button-team-name"
    );

  const playerTogglesColumn =
    document.getElementById(
      "player-toggles-column"
    );


  if (team === "crosskeys") {

    teamName.textContent =
      "CROSSKEYS";

    buttonTeamName.textContent =
      "CROSSKEYS";

  } else if (team === "trial") {

    teamName.textContent =
      "TRIAL";

    buttonTeamName.textContent =
      "TRIAL";

  } else if (team === "testing") {

    teamName.textContent =
      "TESTING";

    buttonTeamName.textContent =
      "TESTING";

  }


  // ======================================================
  // WATERMARK
  // ======================================================

  const watermarkLogo =
    document.getElementById(
      "watermark-logo"
    );


  if (team === "crosskeys") {

    watermarkLogo.src =
      "https://crosskeysnetballclub.co.uk/wp-content/uploads/2023/02/cropped-cropped-cropped-Crosskeys-logo-01-1-1.png";

  } else if (team === "trial") {

    watermarkLogo.src =
      "images/trial-logo.png";

  }


  // ======================================================
  // TABS / BOXES
  // ======================================================

  const matchReportTab =
    document.getElementById(
      "match-report-tab"
    );

  const gsTab =
    document.getElementById(
      "gs-tab"
    );

  const gaTab =
    document.getElementById(
      "ga-tab"
    );

  const waTab =
    document.getElementById(
      "wa-tab"
    );

  const cTab =
    document.getElementById(
      "c-tab"
    );

  const wdTab =
    document.getElementById(
      "wd-tab"
    );

  const gdTab =
    document.getElementById(
      "gd-tab"
    );

  const gkTab =
    document.getElementById(
      "gk-tab"
    );

  const s1Tab =
    document.getElementById(
      "S1-tab"
    );

  const s2Tab =
    document.getElementById(
      "S2-tab"
    );

  const s3Tab =
    document.getElementById(
      "S3-tab"
    );

  const s4Tab =
    document.getElementById(
      "S4-tab"
    );

  const s5Tab =
    document.getElementById(
      "S5-tab"
    );


  const matchReportBox =
    document.querySelector(
      ".match-report-box"
    );

  const gsBox =
    document.querySelector(
      ".gs-box"
    );

  const gaBox =
    document.querySelector(
      ".ga-box"
    );

  const waBox =
    document.querySelector(
      ".wa-box"
    );

  const cBox =
    document.querySelector(
      ".c-box"
    );

  const wdBox =
    document.querySelector(
      ".wd-box"
    );

  const gdBox =
    document.querySelector(
      ".gd-box"
    );

  const gkBox =
    document.querySelector(
      ".gk-box"
    );

  const s1Box =
    document.querySelector(
      ".s1-box"
    );

  const s2Box =
    document.querySelector(
      ".s2-box"
    );

  const s3Box =
    document.querySelector(
      ".s3-box"
    );

  const s4Box =
    document.querySelector(
      ".s4-box"
    );

  const s5Box =
    document.querySelector(
      ".s5-box"
    );


  const allTabs = [
    matchReportTab,
    gsTab,
    gaTab,
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


  const allBoxes = [
    matchReportBox,
    gsBox,
    gaBox,
    waBox,
    cBox,
    wdBox,
    gdBox,
    gkBox,
    s1Box,
    s2Box,
    s3Box,
    s4Box,
    s5Box
  ];


  const tabBoxMap = {

    "match-report-tab":
      matchReportBox,

    "gs-tab":
      gsBox,

    "ga-tab":
      gaBox,

    "wa-tab":
      waBox,

    "c-tab":
      cBox,

    "wd-tab":
      wdBox,

    "gd-tab":
      gdBox,

    "gk-tab":
      gkBox,

    "S1-tab":
      s1Box,

    "S2-tab":
      s2Box,

    "S3-tab":
      s3Box,

    "S4-tab":
      s4Box,

    "S5-tab":
      s5Box

  };


  function showTab(tab) {

    allBoxes.forEach((box) => {

      if (box) {

        box.style.display =
          "none";

      }

    });


    allTabs.forEach((otherTab) => {

      if (otherTab) {

        otherTab.classList.remove(
          "active"
        );

      }

    });


    const box =
      tabBoxMap[tab.id];


    if (box) {

      box.style.display =
        "block";

    }


    tab.classList.add(
      "active"
    );

  }


  allTabs.forEach((tab) => {

    if (!tab) return;


    tab.addEventListener(
      "click",
      () => {

        showTab(tab);

      }
    );

  });


    // ======================================================
  // TESTING MODE
  // ======================================================

  if (team === "testing") {
        
    document.body.classList.add("testing-mode");

    allTabs.forEach((tab) => {

      if (tab) {

        tab.style.display =
          "flex";

      }

    });


    if (playerTogglesColumn) {

      playerTogglesColumn.style.display =
        "flex";

    }


        // Hide START/STOP TIMER in testing mode
    const startMatchButton =
      document.querySelector("#start-match");

    if (startMatchButton) {

      startMatchButton.style.display =
        "none";

    }


    // Hide RESTART TIMER in testing mode
    const restartTimerButton =
      document.querySelector("#clock-restart");

    if (restartTimerButton) {

      restartTimerButton.style.display =
        "none";

    }


    showTab(
      matchReportTab
    );

  } else {

    if (playerTogglesColumn) {

      playerTogglesColumn.style.display =
        "none";

    }

  }


    // ======================================================
  // PLAYER TITLES / TABS / TOGGLES
  // ======================================================

  const playerTitleLinks = [
    { nameId: "gs-name", tabId: "gs-tab", toggleId: "gs-toggle", defaultName: "GS" },
    { nameId: "ga-name", tabId: "ga-tab", toggleId: "ga-toggle", defaultName: "GA" },
    { nameId: "wa-name", tabId: "wa-tab", toggleId: "wa-toggle", defaultName: "WA" },
    { nameId: "c-name", tabId: "c-tab", toggleId: "c-toggle", defaultName: "C" },
    { nameId: "wd-name", tabId: "wd-tab", toggleId: "wd-toggle", defaultName: "WD" },
    { nameId: "gd-name", tabId: "gd-tab", toggleId: "gd-toggle", defaultName: "GD" },
    { nameId: "gk-name", tabId: "gk-tab", toggleId: "gk-toggle", defaultName: "GK" },
    { nameId: "s1-name", tabId: "S1-tab", toggleId: "S1-toggle", defaultName: "S1" },
    { nameId: "s2-name", tabId: "S2-tab", toggleId: "S2-toggle", defaultName: "S2" },
    { nameId: "s3-name", tabId: "S3-tab", toggleId: "S3-toggle", defaultName: "S3" },
    { nameId: "s4-name", tabId: "S4-tab", toggleId: "S4-toggle", defaultName: "S4" },
    { nameId: "s5-name", tabId: "S5-tab", toggleId: "S5-toggle", defaultName: "S5" }
  ];

  playerTitleLinks.forEach((player) => {

    const playerName =
      document.getElementById(player.nameId);

    const playerTab =
      document.getElementById(player.tabId);

    const playerToggle =
      document.getElementById(player.toggleId);

    if (!playerName) return;

    // Prevent Enter creating a new line
    playerName.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          event.preventDefault();

          playerName.blur();

        }

      }
    );

    // Update the matching tab and toggle whenever the title changes
    playerName.addEventListener(
      "input",
      () => {

        const newName =
          playerName.textContent.trim() ||
          player.defaultName;

        if (playerTab) {

          playerTab.textContent =
            newName;

        }

        if (playerToggle) {

          playerToggle.textContent =
            newName;

        }

      }
    );

  });


  const playerToggles =
    document.querySelectorAll(
      ".player-toggle"
    );


  playerToggles.forEach((toggle) => {

    toggle.addEventListener(
      "click",
      () => {

        if (
          toggle.classList.contains(
            "active"
          )
        ) {

          toggle.classList.remove(
            "active"
          );

          return;

        }


        playerToggles.forEach(
          (otherToggle) => {

            otherToggle.classList.remove(
              "active"
            );

          }
        );


        toggle.classList.add(
          "active"
        );

      }
    );

  });


  // ======================================================
  // BUTTONS / GAME FEED
  // ======================================================

  const buttons =
  document.querySelectorAll(
    ".tag-button:not(#clear-last)"
  );

  const clearLastButton =
    document.getElementById(
      "clear-last"
    );

  const matchClock =
    document.querySelector(
      "#match-clock"
    );

  const startButton =
    document.querySelector(
      "#start-match"
    );

  const restartButton =
    document.querySelector(
      "#clock-restart"
    );

  const eventFeed =
    document.getElementById(
      "event-feed"
    );


  // ======================================================
  // CLOCK
  // ======================================================

  let seconds = 0;
  let timer = null;
  let running = false;


  function updateClock() {

    const minutes =
      Math.floor(
        seconds / 60
      );

    const remainingSeconds =
      seconds % 60;


    matchClock.textContent =
      String(minutes).padStart(
        2,
        "0"
      ) +
      ":" +
      String(
        remainingSeconds
      ).padStart(
        2,
        "0"
      );


    seconds++;

  }


  startButton.addEventListener(
    "click",
    () => {

      if (!running) {

        timer =
          setInterval(
            updateClock,
            1000
          );

        running = true;

      } else {

        clearInterval(
          timer
        );

        running = false;

      }

    }
  );


  restartButton.addEventListener(
    "click",
    () => {

      seconds = 0;

      matchClock.textContent =
        "00:00";

    }
  );


  // ======================================================
  // SCORE
  // ======================================================

  let teamScore = 0;
  let oppositionScore = 0;

  let history = [];


  const teamScoreText =
  document.getElementById(
    "team-score"
  );

const oppositionScoreText =
  document.getElementById(
    "opposition-score"
  );

const oppositionButton =
  document.getElementById(
    "opposition-score-btn"
  );

const matchReportTitle =
  document.getElementById(
    "match-report-title"
  );


function updateMatchReportTitle() {

  matchReportTitle.textContent =
    `${teamName.textContent} ${teamScore} v ${oppositionScore} OPPOSITION`;

}


  function updateTeamScore() {

  teamScoreText.textContent =
    teamScore;

  updateMatchReportTitle();

}


function updateOppositionScore() {

  oppositionScoreText.textContent =
    oppositionScore;

  updateMatchReportTitle();

}

updateMatchReportTitle();


  // ======================================================
  // MAIN MATCH REPORT SHOT
  // ======================================================

  const shotScoredButton =
    document.querySelector(
      "#level1-attack-shot-success"
    );

  const shotMissedButton =
    document.querySelector(
      "#level1-attack-shot-missed"
    );

  const shotPercentageText =
    document.querySelector(
      "#level1-shot-percentage"
    );

  const shotProgressFill =
    document.querySelector(
      "#level1-progress-fill"
    );


  function updateShotPercentage() {

  const scored =
    Number(
      shotScoredButton
        .querySelector(".counter")
        .textContent
    );

  const missed =
    Number(
      shotMissedButton
        .querySelector(".counter")
        .textContent
    );


  const total =
    scored + missed;


  shotPercentageText.textContent =
    total === 0
      ? "0/0"
      : scored + "/" + total;


  const percentage =
    total === 0
      ? 0
      : Math.round(
          (scored / total) * 100
        );


  shotProgressFill.style.width =
    percentage + "%";

}


  // ======================================================
  // PLAYER SHOT DATA
  // ======================================================

  let gsShotSuccess = 0;
  let gsShotMissed = 0;

  let gaShotSuccess = 0;
  let gaShotMissed = 0;

  let waShotSuccess = 0;
  let waShotMissed = 0;

  let cShotSuccess = 0;
  let cShotMissed = 0;

  let wdShotSuccess = 0;
  let wdShotMissed = 0;

  let gdShotSuccess = 0;
  let gdShotMissed = 0;

  let gkShotSuccess = 0;
  let gkShotMissed = 0;

  let s1ShotSuccess = 0;
  let s1ShotMissed = 0;

  let s2ShotSuccess = 0;
  let s2ShotMissed = 0;

  let s3ShotSuccess = 0;
  let s3ShotMissed = 0;

  let s4ShotSuccess = 0;
  let s4ShotMissed = 0;

  let s5ShotSuccess = 0;
  let s5ShotMissed = 0;


  function updatePlayerShotPercentage(
    success,
    missed,
    percentageSelector,
    fillSelector
  ) {

    const text =
      document.querySelector(
        percentageSelector
      );

    const fill =
      document.querySelector(
        fillSelector
      );

    if (!text || !fill) {
      return;
    }

    const total =
      success + missed;

    if (total === 0) {
      text.textContent = "0%";
      fill.style.width = "0%";
      return;
    }

    const percentage =
      Math.round(
        (success / total) * 100
      );

    text.textContent =
      percentage + "%";

    fill.style.width =
      percentage + "%";

  }


function updateGSShotPercentage() {

  const gsText =
    document.querySelector(
      "#gs-shot-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-shot-fill"
    );

  if (!gsText || !gsFill) {
    return;
  }

  const total =
    gsShotSuccess + gsShotMissed;

  gsText.textContent =
    gsShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gsShotSuccess / total) * 100
        );

  gsFill.style.width =
    percentage + "%";

}

function updateGAShotPercentage() {

  const gaText =
    document.querySelector(
      "#ga-shot-percentage"
    );

  const gaFill =
    document.querySelector(
      "#ga-shot-fill"
    );

  if (!gaText || !gaFill) {
    return;
  }

  const total =
    gaShotSuccess + gaShotMissed;

  gaText.textContent =
    gaShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gaShotSuccess / total) * 100
        );

  gaFill.style.width =
    percentage + "%";

}

function updateWAShotPercentage() {

  const waText =
    document.querySelector(
      "#wa-shot-percentage"
    );

  const waFill =
    document.querySelector(
      "#wa-shot-fill"
    );

  if (!waText || !waFill) {
    return;
  }

  const total =
    waShotSuccess + waShotMissed;

  waText.textContent =
    waShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (waShotSuccess / total) * 100
        );

  waFill.style.width =
    percentage + "%";

}


function updateCShotPercentage() {

  const cText =
    document.querySelector(
      "#c-shot-percentage"
    );

  const cFill =
    document.querySelector(
      "#c-shot-fill"
    );

  if (!cText || !cFill) {
    return;
  }

  const total =
    cShotSuccess + cShotMissed;

  cText.textContent =
    cShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (cShotSuccess / total) * 100
        );

  cFill.style.width =
    percentage + "%";

}


function updateWDShotPercentage() {

  const wdText =
    document.querySelector(
      "#wd-shot-percentage"
    );

  const wdFill =
    document.querySelector(
      "#wd-shot-fill"
    );

  if (!wdText || !wdFill) {
    return;
  }

  const total =
    wdShotSuccess + wdShotMissed;

  wdText.textContent =
    wdShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (wdShotSuccess / total) * 100
        );

  wdFill.style.width =
    percentage + "%";

}


function updateGDShotPercentage() {

  const gdText =
    document.querySelector(
      "#gd-shot-percentage"
    );

  const gdFill =
    document.querySelector(
      "#gd-shot-fill"
    );

  if (!gdText || !gdFill) {
    return;
  }

  const total =
    gdShotSuccess + gdShotMissed;

  gdText.textContent =
    gdShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gdShotSuccess / total) * 100
        );

  gdFill.style.width =
    percentage + "%";

}


function updateGKShotPercentage() {

  const gkText =
    document.querySelector(
      "#gk-shot-percentage"
    );

  const gkFill =
    document.querySelector(
      "#gk-shot-fill"
    );

  if (!gkText || !gkFill) {
    return;
  }

  const total =
    gkShotSuccess + gkShotMissed;

  gkText.textContent =
    gkShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gkShotSuccess / total) * 100
        );

  gkFill.style.width =
    percentage + "%";

}


function updateS1ShotPercentage() {

  const s1Text =
    document.querySelector(
      "#s1-shot-percentage"
    );

  const s1Fill =
    document.querySelector(
      "#s1-shot-fill"
    );

  if (!s1Text || !s1Fill) {
    return;
  }

  const total =
    s1ShotSuccess + s1ShotMissed;

  s1Text.textContent =
    s1ShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s1ShotSuccess / total) * 100
        );

  s1Fill.style.width =
    percentage + "%";

}


function updateS2ShotPercentage() {

  const s2Text =
    document.querySelector(
      "#s2-shot-percentage"
    );

  const s2Fill =
    document.querySelector(
      "#s2-shot-fill"
    );

  if (!s2Text || !s2Fill) {
    return;
  }

  const total =
    s2ShotSuccess + s2ShotMissed;

  s2Text.textContent =
    s2ShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s2ShotSuccess / total) * 100
        );

  s2Fill.style.width =
    percentage + "%";

}


function updateS3ShotPercentage() {

  const s3Text =
    document.querySelector(
      "#s3-shot-percentage"
    );

  const s3Fill =
    document.querySelector(
      "#s3-shot-fill"
    );

  if (!s3Text || !s3Fill) {
    return;
  }

  const total =
    s3ShotSuccess + s3ShotMissed;

  s3Text.textContent =
    s3ShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s3ShotSuccess / total) * 100
        );

  s3Fill.style.width =
    percentage + "%";

}


function updateS4ShotPercentage() {

  const s4Text =
    document.querySelector(
      "#s4-shot-percentage"
    );

  const s4Fill =
    document.querySelector(
      "#s4-shot-fill"
    );

  if (!s4Text || !s4Fill) {
    return;
  }

  const total =
    s4ShotSuccess + s4ShotMissed;

  s4Text.textContent =
    s4ShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s4ShotSuccess / total) * 100
        );

  s4Fill.style.width =
    percentage + "%";

}


function updateS5ShotPercentage() {

  const s5Text =
    document.querySelector(
      "#s5-shot-percentage"
    );

  const s5Fill =
    document.querySelector(
      "#s5-shot-fill"
    );

  if (!s5Text || !s5Fill) {
    return;
  }

  const total =
    s5ShotSuccess + s5ShotMissed;

  s5Text.textContent =
    s5ShotSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s5ShotSuccess / total) * 100
        );

  s5Fill.style.width =
    percentage + "%";

}


  function updateAllPlayerShotPercentages() {

    updateGSShotPercentage();
    updateGAShotPercentage();
    updateWAShotPercentage();
    updateCShotPercentage();
    updateWDShotPercentage();
    updateGDShotPercentage();
    updateGKShotPercentage();
    updateS1ShotPercentage();
    updateS2ShotPercentage();
    updateS3ShotPercentage();
    updateS4ShotPercentage();
    updateS5ShotPercentage();

  }


  // ======================================================
  // ATTACK REBOUND
  // ======================================================

  const reboundWon =
    document.querySelector(
      "#level1-attack-rebound-won"
    );

  const reboundLost =
    document.querySelector(
      "#level1-attack-rebound-lost"
    );

  const reboundText =
    document.querySelector(
      "#level1-attack-rebound-percentage"
    );

  const reboundFill =
    document.querySelector(
      "#level1-attack-rebound-fill"
    );


  let gsReboundWon = 0;
  let gsReboundLost = 0;

  let gaReboundWon = 0;
  let gaReboundLost = 0;

  let waReboundWon = 0;
  let waReboundLost = 0;

  let cReboundWon = 0;
  let cReboundLost = 0;

  let wdReboundWon = 0;
  let wdReboundLost = 0;

  let gdReboundWon = 0;
  let gdReboundLost = 0;

  let gkReboundWon = 0;
  let gkReboundLost = 0;

  let s1ReboundWon = 0;
  let s1ReboundLost = 0;

  let s2ReboundWon = 0;
  let s2ReboundLost = 0;

  let s3ReboundWon = 0;
  let s3ReboundLost = 0;

  let s4ReboundWon = 0;
  let s4ReboundLost = 0;

  let s5ReboundWon = 0;
  let s5ReboundLost = 0;


  function updateAttackReboundPercentage() {

  const won =
    Number(
      reboundWon
        .querySelector(".counter")
        .textContent
    );

  const lost =
    Number(
      reboundLost
        .querySelector(".counter")
        .textContent
    );


  const total =
    won + lost;


  reboundText.textContent =
  total === 0
    ? "0/0"
    : won + "/" + total;


const percentage =
  total === 0
    ? 0
    : Math.round(
        (won / total) * 100
      );


  reboundFill.style.width =
    percentage + "%";

}


  function updatePlayerReboundPercentage(
    won,
    lost,
    textSelector,
    fillSelector
  ) {

    const text =
      document.querySelector(
        textSelector
      );

    const fill =
      document.querySelector(
        fillSelector
      );


    if (!text || !fill) {
      return;
    }


    const total =
      won + lost;


    if (total === 0) {

      text.textContent =
        "0%";

      fill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (won / total) * 100
      );


    text.textContent =
      percentage + "%";

    fill.style.width =
      percentage + "%";

  }


    function updateGSAttackReboundPercentage() {

  const gsText =
    document.querySelector(
      "#gs-attack-rebound-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-attack-rebound-fill"
    );

  if (!gsText || !gsFill) {
    return;
  }

  gsText.textContent =
    gsReboundWon;

  gsFill.style.width =
    (
      gsReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateGAAttackReboundPercentage() {

  const gaText =
    document.querySelector(
      "#ga-attack-rebound-percentage"
    );

  const gaFill =
    document.querySelector(
      "#ga-attack-rebound-fill"
    );

  if (!gaText || !gaFill) {
    return;
  }

  gaText.textContent =
    gaReboundWon;

  gaFill.style.width =
    (
      gaReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateWAAttackReboundPercentage() {

  const waText =
    document.querySelector(
      "#wa-attack-rebound-percentage"
    );

  const waFill =
    document.querySelector(
      "#wa-attack-rebound-fill"
    );

  if (!waText || !waFill) {
    return;
  }

  waText.textContent =
    waReboundWon;

  waFill.style.width =
    (
      waReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateCAttackReboundPercentage() {

  const cText =
    document.querySelector(
      "#c-attack-rebound-percentage"
    );

  const cFill =
    document.querySelector(
      "#c-attack-rebound-fill"
    );

  if (!cText || !cFill) {
    return;
  }

  cText.textContent =
    cReboundWon;

  cFill.style.width =
    (
      cReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateWDAttackReboundPercentage() {

  const wdText =
    document.querySelector(
      "#wd-attack-rebound-percentage"
    );

  const wdFill =
    document.querySelector(
      "#wd-attack-rebound-fill"
    );

  if (!wdText || !wdFill) {
    return;
  }

  wdText.textContent =
    wdReboundWon;

  wdFill.style.width =
    (
      wdReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateGDAttackReboundPercentage() {

  const gdText =
    document.querySelector(
      "#gd-attack-rebound-percentage"
    );

  const gdFill =
    document.querySelector(
      "#gd-attack-rebound-fill"
    );

  if (!gdText || !gdFill) {
    return;
  }

  gdText.textContent =
    gdReboundWon;

  gdFill.style.width =
    (
      gdReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateGKAttackReboundPercentage() {

  const gkText =
    document.querySelector(
      "#gk-attack-rebound-percentage"
    );

  const gkFill =
    document.querySelector(
      "#gk-attack-rebound-fill"
    );

  if (!gkText || !gkFill) {
    return;
  }

  gkText.textContent =
    gkReboundWon;

  gkFill.style.width =
    (
      gkReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateS1AttackReboundPercentage() {

  const s1Text =
    document.querySelector(
      "#s1-attack-rebound-percentage"
    );

  const s1Fill =
    document.querySelector(
      "#s1-attack-rebound-fill"
    );

  if (!s1Text || !s1Fill) {
    return;
  }

  s1Text.textContent =
    s1ReboundWon;

  s1Fill.style.width =
    (
      s1ReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateS2AttackReboundPercentage() {

  const s2Text =
    document.querySelector(
      "#s2-attack-rebound-percentage"
    );

  const s2Fill =
    document.querySelector(
      "#s2-attack-rebound-fill"
    );

  if (!s2Text || !s2Fill) {
    return;
  }

  s2Text.textContent =
    s2ReboundWon;

  s2Fill.style.width =
    (
      s2ReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateS3AttackReboundPercentage() {

  const s3Text =
    document.querySelector(
      "#s3-attack-rebound-percentage"
    );

  const s3Fill =
    document.querySelector(
      "#s3-attack-rebound-fill"
    );

  if (!s3Text || !s3Fill) {
    return;
  }

  s3Text.textContent =
    s3ReboundWon;

  s3Fill.style.width =
    (
      s3ReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateS4AttackReboundPercentage() {

  const s4Text =
    document.querySelector(
      "#s4-attack-rebound-percentage"
    );

  const s4Fill =
    document.querySelector(
      "#s4-attack-rebound-fill"
    );

  if (!s4Text || !s4Fill) {
    return;
  }

  s4Text.textContent =
    s4ReboundWon;

  s4Fill.style.width =
    (
      s4ReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}


function updateS5AttackReboundPercentage() {

  const s5Text =
    document.querySelector(
      "#s5-attack-rebound-percentage"
    );

  const s5Fill =
    document.querySelector(
      "#s5-attack-rebound-fill"
    );

  if (!s5Text || !s5Fill) {
    return;
  }

  s5Text.textContent =
    s5ReboundWon;

  s5Fill.style.width =
    (
      s5ReboundWon /
      TURNOVER_MAX
    ) * 100 + "%";

}

  function updatePlayerReboundCounter(
  playerToggleId,
  result
) {

  if (playerToggleId === "gs-toggle") {
    if (result === "won") {
      gsReboundWon++;
    } else {
      gsReboundLost++;
    }
  }

  if (playerToggleId === "ga-toggle") {
    if (result === "won") {
      gaReboundWon++;
    } else {
      gaReboundLost++;
    }
  }

  if (playerToggleId === "wa-toggle") {
    if (result === "won") {
      waReboundWon++;
    } else {
      waReboundLost++;
    }
  }

  if (playerToggleId === "c-toggle") {
    if (result === "won") {
      cReboundWon++;
    } else {
      cReboundLost++;
    }
  }

  if (playerToggleId === "wd-toggle") {
    if (result === "won") {
      wdReboundWon++;
    } else {
      wdReboundLost++;
    }
  }

  if (playerToggleId === "gd-toggle") {
    if (result === "won") {
      gdReboundWon++;
    } else {
      gdReboundLost++;
    }
  }

  if (playerToggleId === "gk-toggle") {
    if (result === "won") {
      gkReboundWon++;
    } else {
      gkReboundLost++;
    }
  }

  if (playerToggleId === "S1-toggle") {
    if (result === "won") {
      s1ReboundWon++;
    } else {
      s1ReboundLost++;
    }
  }

  if (playerToggleId === "S2-toggle") {
    if (result === "won") {
      s2ReboundWon++;
    } else {
      s2ReboundLost++;
    }
  }

  if (playerToggleId === "S3-toggle") {
    if (result === "won") {
      s3ReboundWon++;
    } else {
      s3ReboundLost++;
    }
  }

  if (playerToggleId === "S4-toggle") {
    if (result === "won") {
      s4ReboundWon++;
    } else {
      s4ReboundLost++;
    }
  }

  if (playerToggleId === "S5-toggle") {
    if (result === "won") {
      s5ReboundWon++;
    } else {
      s5ReboundLost++;
    }
  }

}


  // ======================================================
  // FEED SUCCESS
  // ======================================================

  const feedSuccess =
    document.querySelector(
      "#level1-feed-success"
    );

  const feedMissed =
    document.querySelector(
      "#level1-feed-missed"
    );

  const feedText =
    document.querySelector(
      "#level1-feed-success-percentage"
    );

  const feedFill =
    document.querySelector(
      "#level1-feed-success-fill"
    );


  // ======================================================
  // PLAYER FEED DATA
  // ======================================================

  let gsFeedSuccess = 0;
  let gsFeedMissed = 0;

  let gaFeedSuccess = 0;
  let gaFeedMissed = 0;

  let waFeedSuccess = 0;
  let waFeedMissed = 0;

  let cFeedSuccess = 0;
  let cFeedMissed = 0;

  let wdFeedSuccess = 0;
  let wdFeedMissed = 0;

  let gdFeedSuccess = 0;
  let gdFeedMissed = 0;

  let gkFeedSuccess = 0;
  let gkFeedMissed = 0;

  let s1FeedSuccess = 0;
  let s1FeedMissed = 0;

  let s2FeedSuccess = 0;
  let s2FeedMissed = 0;

  let s3FeedSuccess = 0;
  let s3FeedMissed = 0;

  let s4FeedSuccess = 0;
  let s4FeedMissed = 0;

  let s5FeedSuccess = 0;
  let s5FeedMissed = 0;


  // ------------------------------------------------------
  // MATCH REPORT FEED %
  // ------------------------------------------------------

  function updateFeedSuccessPercentage() {

  const won =
    Number(
      feedSuccess
        .querySelector(".counter")
        .textContent
    );

  const lost =
    Number(
      feedMissed
        .querySelector(".counter")
        .textContent
    );


  const total =
    won + lost;


  feedText.textContent =
    total === 0
      ? "0/0"
      : won + "/" + total;


  const percentage =
    total === 0
      ? 0
      : Math.round(
          (won / total) * 100
        );


  feedFill.style.width =
    percentage + "%";

}


  // ------------------------------------------------------
  // GENERIC PLAYER FEED %
  // ------------------------------------------------------

  function updateGSFeedSuccessPercentage() {

  const gsText =
    document.querySelector(
      "#gs-feed-success-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-feed-success-fill"
    );

  if (!gsText || !gsFill) {
    return;
  }

  const total =
    gsFeedSuccess + gsFeedMissed;

  gsText.textContent =
    gsFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gsFeedSuccess / total) * 100
        );

  gsFill.style.width =
    percentage + "%";

}


function updateGAFeedSuccessPercentage() {

  const gaText =
    document.querySelector(
      "#ga-feed-success-percentage"
    );

  const gaFill =
    document.querySelector(
      "#ga-feed-success-fill"
    );

  if (!gaText || !gaFill) {
    return;
  }

  const total =
    gaFeedSuccess + gaFeedMissed;

  gaText.textContent =
    gaFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gaFeedSuccess / total) * 100
        );

  gaFill.style.width =
    percentage + "%";

}


function updateWAFeedSuccessPercentage() {

  const waText =
    document.querySelector(
      "#wa-feed-success-percentage"
    );

  const waFill =
    document.querySelector(
      "#wa-feed-success-fill"
    );

  if (!waText || !waFill) {
    return;
  }

  const total =
    waFeedSuccess + waFeedMissed;

  waText.textContent =
    waFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (waFeedSuccess / total) * 100
        );

  waFill.style.width =
    percentage + "%";

}


function updateCFeedSuccessPercentage() {

  const cText =
    document.querySelector(
      "#c-feed-success-percentage"
    );

  const cFill =
    document.querySelector(
      "#c-feed-success-fill"
    );

  if (!cText || !cFill) {
    return;
  }

  const total =
    cFeedSuccess + cFeedMissed;

  cText.textContent =
    cFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (cFeedSuccess / total) * 100
        );

  cFill.style.width =
    percentage + "%";

}


function updateWDFeedSuccessPercentage() {

  const wdText =
    document.querySelector(
      "#wd-feed-success-percentage"
    );

  const wdFill =
    document.querySelector(
      "#wd-feed-success-fill"
    );

  if (!wdText || !wdFill) {
    return;
  }

  const total =
    wdFeedSuccess + wdFeedMissed;

  wdText.textContent =
    wdFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (wdFeedSuccess / total) * 100
        );

  wdFill.style.width =
    percentage + "%";

}


function updateGDFeedSuccessPercentage() {

  const gdText =
    document.querySelector(
      "#gd-feed-success-percentage"
    );

  const gdFill =
    document.querySelector(
      "#gd-feed-success-fill"
    );

  if (!gdText || !gdFill) {
    return;
  }

  const total =
    gdFeedSuccess + gdFeedMissed;

  gdText.textContent =
    gdFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gdFeedSuccess / total) * 100
        );

  gdFill.style.width =
    percentage + "%";

}


function updateGKFeedSuccessPercentage() {

  const gkText =
    document.querySelector(
      "#gk-feed-success-percentage"
    );

  const gkFill =
    document.querySelector(
      "#gk-feed-success-fill"
    );

  if (!gkText || !gkFill) {
    return;
  }

  const total =
    gkFeedSuccess + gkFeedMissed;

  gkText.textContent =
    gkFeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gkFeedSuccess / total) * 100
        );

  gkFill.style.width =
    percentage + "%";

}


function updateS1FeedSuccessPercentage() {

  const s1Text =
    document.querySelector(
      "#s1-feed-success-percentage"
    );

  const s1Fill =
    document.querySelector(
      "#s1-feed-success-fill"
    );

  if (!s1Text || !s1Fill) {
    return;
  }

  const total =
    s1FeedSuccess + s1FeedMissed;

  s1Text.textContent =
    s1FeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s1FeedSuccess / total) * 100
        );

  s1Fill.style.width =
    percentage + "%";

}


function updateS2FeedSuccessPercentage() {

  const s2Text =
    document.querySelector(
      "#s2-feed-success-percentage"
    );

  const s2Fill =
    document.querySelector(
      "#s2-feed-success-fill"
    );

  if (!s2Text || !s2Fill) {
    return;
  }

  const total =
    s2FeedSuccess + s2FeedMissed;

  s2Text.textContent =
    s2FeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s2FeedSuccess / total) * 100
        );

  s2Fill.style.width =
    percentage + "%";

}


function updateS3FeedSuccessPercentage() {

  const s3Text =
    document.querySelector(
      "#s3-feed-success-percentage"
    );

  const s3Fill =
    document.querySelector(
      "#s3-feed-success-fill"
    );

  if (!s3Text || !s3Fill) {
    return;
  }

  const total =
    s3FeedSuccess + s3FeedMissed;

  s3Text.textContent =
    s3FeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s3FeedSuccess / total) * 100
        );

  s3Fill.style.width =
    percentage + "%";

}


function updateS4FeedSuccessPercentage() {

  const s4Text =
    document.querySelector(
      "#s4-feed-success-percentage"
    );

  const s4Fill =
    document.querySelector(
      "#s4-feed-success-fill"
    );

  if (!s4Text || !s4Fill) {
    return;
  }

  const total =
    s4FeedSuccess + s4FeedMissed;

  s4Text.textContent =
    s4FeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s4FeedSuccess / total) * 100
        );

  s4Fill.style.width =
    percentage + "%";

}


function updateS5FeedSuccessPercentage() {

  const s5Text =
    document.querySelector(
      "#s5-feed-success-percentage"
    );

  const s5Fill =
    document.querySelector(
      "#s5-feed-success-fill"
    );

  if (!s5Text || !s5Fill) {
    return;
  }

  const total =
    s5FeedSuccess + s5FeedMissed;

  s5Text.textContent =
    s5FeedSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s5FeedSuccess / total) * 100
        );

  s5Fill.style.width =
    percentage + "%";

}


  // ======================================================
  // CENTRE SUCCESS
  // ======================================================

  const centreSuccess =
    document.querySelector(
      "#level1-centre-success"
    );

  const centreMissed =
    document.querySelector(
      "#level1-centre-missed"
    );

  const centreText =
    document.querySelector(
      "#level1-centre-success-percentage"
    );

  const centreFill =
    document.querySelector(
      "#level1-centre-success-fill"
    );


  let gsCentreSuccess = 0;

let gsCentreMissed = 0;

let gaCentreSuccess = 0;

let gaCentreMissed = 0;

let waCentreSuccess = 0;

let waCentreMissed = 0;

let cCentreSuccess = 0;

let cCentreMissed = 0;

let wdCentreSuccess = 0;

let wdCentreMissed = 0;

let gdCentreSuccess = 0;

let gdCentreMissed = 0;

let gkCentreSuccess = 0;

let gkCentreMissed = 0;

let s1CentreSuccess = 0;

let s1CentreMissed = 0;

let s2CentreSuccess = 0;

let s2CentreMissed = 0;

let s3CentreSuccess = 0;

let s3CentreMissed = 0;

let s4CentreSuccess = 0;

let s4CentreMissed = 0;

let s5CentreSuccess = 0;

let s5CentreMissed = 0;


  function updateCentreSuccessPercentage() {

  const won =
    Number(
      centreSuccess
        .querySelector(".counter")
        .textContent
    );

  const lost =
    Number(
      centreMissed
        .querySelector(".counter")
        .textContent
    );


  const total =
    won + lost;


  centreText.textContent =
    total === 0
      ? "0/0"
      : won + "/" + total;


  const percentage =
    total === 0
      ? 0
      : Math.round(
          (won / total) * 100
        );


  centreFill.style.width =
    percentage + "%";

}


  // ------------------------------------------------------
// PLAYER CENTRE SUCCESS
// ------------------------------------------------------

function updateGSCentreSuccessPercentage() {

  const gsText =
    document.querySelector(
      "#gs-centre-success-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-centre-success-fill"
    );

  if (!gsText || !gsFill) {
    return;
  }

  const total =
    gsCentreSuccess + gsCentreMissed;

  gsText.textContent =
    gsCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gsCentreSuccess / total) * 100
        );

  gsFill.style.width =
    percentage + "%";

}


function updateGACentreSuccessPercentage() {

  const gaText =
    document.querySelector(
      "#ga-centre-success-percentage"
    );

  const gaFill =
    document.querySelector(
      "#ga-centre-success-fill"
    );

  if (!gaText || !gaFill) {
    return;
  }

  const total =
    gaCentreSuccess + gaCentreMissed;

  gaText.textContent =
    gaCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gaCentreSuccess / total) * 100
        );

  gaFill.style.width =
    percentage + "%";

}


function updateWACentreSuccessPercentage() {

  const waText =
    document.querySelector(
      "#wa-centre-success-percentage"
    );

  const waFill =
    document.querySelector(
      "#wa-centre-success-fill"
    );

  if (!waText || !waFill) {
    return;
  }

  const total =
    waCentreSuccess + waCentreMissed;

  waText.textContent =
    waCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (waCentreSuccess / total) * 100
        );

  waFill.style.width =
    percentage + "%";

}


function updateCCentreSuccessPercentage() {

  const cText =
    document.querySelector(
      "#c-centre-success-percentage"
    );

  const cFill =
    document.querySelector(
      "#c-centre-success-fill"
    );

  if (!cText || !cFill) {
    return;
  }

  const total =
    cCentreSuccess + cCentreMissed;

  cText.textContent =
    cCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (cCentreSuccess / total) * 100
        );

  cFill.style.width =
    percentage + "%";

}


function updateWDCentreSuccessPercentage() {

  const wdText =
    document.querySelector(
      "#wd-centre-success-percentage"
    );

  const wdFill =
    document.querySelector(
      "#wd-centre-success-fill"
    );

  if (!wdText || !wdFill) {
    return;
  }

  const total =
    wdCentreSuccess + wdCentreMissed;

  wdText.textContent =
    wdCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (wdCentreSuccess / total) * 100
        );

  wdFill.style.width =
    percentage + "%";

}


function updateGDCentreSuccessPercentage() {

  const gdText =
    document.querySelector(
      "#gd-centre-success-percentage"
    );

  const gdFill =
    document.querySelector(
      "#gd-centre-success-fill"
    );

  if (!gdText || !gdFill) {
    return;
  }

  const total =
    gdCentreSuccess + gdCentreMissed;

  gdText.textContent =
    gdCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gdCentreSuccess / total) * 100
        );

  gdFill.style.width =
    percentage + "%";

}


function updateGKCentreSuccessPercentage() {

  const gkText =
    document.querySelector(
      "#gk-centre-success-percentage"
    );

  const gkFill =
    document.querySelector(
      "#gk-centre-success-fill"
    );

  if (!gkText || !gkFill) {
    return;
  }

  const total =
    gkCentreSuccess + gkCentreMissed;

  gkText.textContent =
    gkCentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gkCentreSuccess / total) * 100
        );

  gkFill.style.width =
    percentage + "%";

}


function updateS1CentreSuccessPercentage() {

  const s1Text =
    document.querySelector(
      "#s1-centre-success-percentage"
    );

  const s1Fill =
    document.querySelector(
      "#s1-centre-success-fill"
    );

  if (!s1Text || !s1Fill) {
    return;
  }

  const total =
    s1CentreSuccess + s1CentreMissed;

  s1Text.textContent =
    s1CentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s1CentreSuccess / total) * 100
        );

  s1Fill.style.width =
    percentage + "%";

}


function updateS2CentreSuccessPercentage() {

  const s2Text =
    document.querySelector(
      "#s2-centre-success-percentage"
    );

  const s2Fill =
    document.querySelector(
      "#s2-centre-success-fill"
    );

  if (!s2Text || !s2Fill) {
    return;
  }

  const total =
    s2CentreSuccess + s2CentreMissed;

  s2Text.textContent =
    s2CentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s2CentreSuccess / total) * 100
        );

  s2Fill.style.width =
    percentage + "%";

}


function updateS3CentreSuccessPercentage() {

  const s3Text =
    document.querySelector(
      "#s3-centre-success-percentage"
    );

  const s3Fill =
    document.querySelector(
      "#s3-centre-success-fill"
    );

  if (!s3Text || !s3Fill) {
    return;
  }

  const total =
    s3CentreSuccess + s3CentreMissed;

  s3Text.textContent =
    s3CentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s3CentreSuccess / total) * 100
        );

  s3Fill.style.width =
    percentage + "%";

}


function updateS4CentreSuccessPercentage() {

  const s4Text =
    document.querySelector(
      "#s4-centre-success-percentage"
    );

  const s4Fill =
    document.querySelector(
      "#s4-centre-success-fill"
    );

  if (!s4Text || !s4Fill) {
    return;
  }

  const total =
    s4CentreSuccess + s4CentreMissed;

  s4Text.textContent =
    s4CentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s4CentreSuccess / total) * 100
        );

  s4Fill.style.width =
    percentage + "%";

}


function updateS5CentreSuccessPercentage() {

  const s5Text =
    document.querySelector(
      "#s5-centre-success-percentage"
    );

  const s5Fill =
    document.querySelector(
      "#s5-centre-success-fill"
    );

  if (!s5Text || !s5Fill) {
    return;
  }

  const total =
    s5CentreSuccess + s5CentreMissed;

  s5Text.textContent =
    s5CentreSuccess + "/" + total;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s5CentreSuccess / total) * 100
        );

  s5Fill.style.width =
    percentage + "%";

}


  // ======================================================
// DEFENSIVE REBOUNDS
// ======================================================

const lvl1dreboundwon =
  document.querySelector(
    "#level1-defence-rebound-won"
  );

const lvl1dreboundlost =
  document.querySelector(
    "#level1-defence-rebound-lost"
  );

const lvl1dreboundText =
  document.querySelector(
    "#level1-defence-rebound-percentage"
  );

const lvl1dreboundFill =
  document.querySelector(
    "#level1-defence-rebound-fill"
  );


let gsDReboundWon = 0;
let gsDReboundLost = 0;

let gaDReboundWon = 0;
let gaDReboundLost = 0;

let waDReboundWon = 0;
let waDReboundLost = 0;

let cDReboundWon = 0;
let cDReboundLost = 0;

let wdDReboundWon = 0;
let wdDReboundLost = 0;

let gdDReboundWon = 0;
let gdDReboundLost = 0;

let gkDReboundWon = 0;
let gkDReboundLost = 0;

let s1DReboundWon = 0;
let s1DReboundLost = 0;

let s2DReboundWon = 0;
let s2DReboundLost = 0;

let s3DReboundWon = 0;
let s3DReboundLost = 0;

let s4DReboundWon = 0;
let s4DReboundLost = 0;

let s5DReboundWon = 0;
let s5DReboundLost = 0;


function updateDefenceReboundPercentage() {

  const won =
    Number(
      lvl1dreboundwon
        .querySelector(".counter")
        .textContent
    );

  const lost =
    Number(
      lvl1dreboundlost
        .querySelector(".counter")
        .textContent
    );


  const total =
    won + lost;


  lvl1dreboundText.textContent =
    total === 0
      ? "0/0"
      : won + "/" + total;


  const percentage =
    total === 0
      ? 0
      : Math.round(
          (won / total) * 100
        );


  lvl1dreboundFill.style.width =
    percentage + "%";

}


// ======================================================
// GS DEFENSIVE REBOUNDS
// ======================================================

function updateGSDReboundPercentage() {

  const gsText =
    document.querySelector(
      "#gs-defence-rebound-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-defence-rebound-fill"
    );

  if (!gsText || !gsFill) return;

  const total =
    gsDReboundWon + gsDReboundLost;

  gsText.textContent =
    gsDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gsDReboundWon / total) * 100
        );

  gsFill.style.width =
    percentage + "%";

}


// ======================================================
// GA DEFENSIVE REBOUNDS
// ======================================================

function updateGADReboundPercentage() {

  const gaText =
    document.querySelector(
      "#ga-defence-rebound-percentage"
    );

  const gaFill =
    document.querySelector(
      "#ga-defence-rebound-fill"
    );

  if (!gaText || !gaFill) return;

  const total =
    gaDReboundWon + gaDReboundLost;

  gaText.textContent =
    gaDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gaDReboundWon / total) * 100
        );

  gaFill.style.width =
    percentage + "%";

}


// ======================================================
// WA DEFENSIVE REBOUNDS
// ======================================================

function updateWADReboundPercentage() {

  const waText =
    document.querySelector(
      "#wa-defence-rebound-percentage"
    );

  const waFill =
    document.querySelector(
      "#wa-defence-rebound-fill"
    );

  if (!waText || !waFill) return;

  const total =
    waDReboundWon + waDReboundLost;

  waText.textContent =
    waDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (waDReboundWon / total) * 100
        );

  waFill.style.width =
    percentage + "%";

}


// ======================================================
// C DEFENSIVE REBOUNDS
// ======================================================

function updateCDReboundPercentage() {

  const cText =
    document.querySelector(
      "#c-defence-rebound-percentage"
    );

  const cFill =
    document.querySelector(
      "#c-defence-rebound-fill"
    );

  if (!cText || !cFill) return;

  const total =
    cDReboundWon + cDReboundLost;

  cText.textContent =
    cDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (cDReboundWon / total) * 100
        );

  cFill.style.width =
    percentage + "%";

}


// ======================================================
// WD DEFENSIVE REBOUNDS
// ======================================================

function updateWDDReboundPercentage() {

  const wdText =
    document.querySelector(
      "#wd-defence-rebound-percentage"
    );

  const wdFill =
    document.querySelector(
      "#wd-defence-rebound-fill"
    );

  if (!wdText || !wdFill) return;

  const total =
    wdDReboundWon + wdDReboundLost;

  wdText.textContent =
    wdDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (wdDReboundWon / total) * 100
        );

  wdFill.style.width =
    percentage + "%";

}


// ======================================================
// GD DEFENSIVE REBOUNDS
// ======================================================

function updateGDDReboundPercentage() {

  const gdText =
    document.querySelector(
      "#gd-defence-rebound-percentage"
    );

  const gdFill =
    document.querySelector(
      "#gd-defence-rebound-fill"
    );

  if (!gdText || !gdFill) return;

  const total =
    gdDReboundWon + gdDReboundLost;

  gdText.textContent =
    gdDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gdDReboundWon / total) * 100
        );

  gdFill.style.width =
    percentage + "%";

}


// ======================================================
// GK DEFENSIVE REBOUNDS
// ======================================================

function updateGKDReboundPercentage() {

  const gkText =
    document.querySelector(
      "#gk-defence-rebound-percentage"
    );

  const gkFill =
    document.querySelector(
      "#gk-defence-rebound-fill"
    );

  if (!gkText || !gkFill) return;

  const total =
    gkDReboundWon + gkDReboundLost;

  gkText.textContent =
    gkDReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (gkDReboundWon / total) * 100
        );

  gkFill.style.width =
    percentage + "%";

}


// ======================================================
// S1 DEFENSIVE REBOUNDS
// ======================================================

function updateS1DReboundPercentage() {

  const s1Text =
    document.querySelector(
      "#s1-defence-rebound-percentage"
    );

  const s1Fill =
    document.querySelector(
      "#s1-defence-rebound-fill"
    );

  if (!s1Text || !s1Fill) return;

  const total =
    s1DReboundWon + s1DReboundLost;

  s1Text.textContent =
    s1DReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s1DReboundWon / total) * 100
        );

  s1Fill.style.width =
    percentage + "%";

}


// ======================================================
// S2 DEFENSIVE REBOUNDS
// ======================================================

function updateS2DReboundPercentage() {

  const s2Text =
    document.querySelector(
      "#s2-defence-rebound-percentage"
    );

  const s2Fill =
    document.querySelector(
      "#s2-defence-rebound-fill"
    );

  if (!s2Text || !s2Fill) return;

  const total =
    s2DReboundWon + s2DReboundLost;

  s2Text.textContent =
    s2DReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s2DReboundWon / total) * 100
        );

  s2Fill.style.width =
    percentage + "%";

}


// ======================================================
// S3 DEFENSIVE REBOUNDS
// ======================================================

function updateS3DReboundPercentage() {

  const s3Text =
    document.querySelector(
      "#s3-defence-rebound-percentage"
    );

  const s3Fill =
    document.querySelector(
      "#s3-defence-rebound-fill"
    );

  if (!s3Text || !s3Fill) return;

  const total =
    s3DReboundWon + s3DReboundLost;

  s3Text.textContent =
    s3DReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s3DReboundWon / total) * 100
        );

  s3Fill.style.width =
    percentage + "%";

}


// ======================================================
// S4 DEFENSIVE REBOUNDS
// ======================================================

function updateS4DReboundPercentage() {

  const s4Text =
    document.querySelector(
      "#s4-defence-rebound-percentage"
    );

  const s4Fill =
    document.querySelector(
      "#s4-defence-rebound-fill"
    );

  if (!s4Text || !s4Fill) return;

  const total =
    s4DReboundWon + s4DReboundLost;

  s4Text.textContent =
    s4DReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s4DReboundWon / total) * 100
        );

  s4Fill.style.width =
    percentage + "%";

}


// ======================================================
// S5 DEFENSIVE REBOUNDS
// ======================================================

function updateS5DReboundPercentage() {

  const s5Text =
    document.querySelector(
      "#s5-defence-rebound-percentage"
    );

  const s5Fill =
    document.querySelector(
      "#s5-defence-rebound-fill"
    );

  if (!s5Text || !s5Fill) return;

  const total =
    s5DReboundWon + s5DReboundLost;

  s5Text.textContent =
    s5DReboundWon;

  const percentage =
    total === 0
      ? 0
      : Math.round(
          (s5DReboundWon / total) * 100
        );

  s5Fill.style.width =
    percentage + "%";

}


    // ======================================================
  // TURNOVER
  // ======================================================

  const turnoverButton =
    document.querySelector(
      "#level1-attack-turnover"
    );

  const turnoverText =
    document.querySelector(
      "#level1-turnover-count"
    );

  const turnoverFill =
    document.querySelector(
      "#level1-turnover-fill"
    );


  let turnoverCount = 0;

  const TURNOVER_MAX = 10;

  let gsTurnoverCount = 0;

  let gaTurnoverCount = 0;

  let waTurnoverCount = 0;

  let cTurnoverCount = 0;

  let wdTurnoverCount = 0;

  let gdTurnoverCount = 0;

  let gkTurnoverCount = 0;

  let s1TurnoverCount = 0;

  let s2TurnoverCount = 0;

  let s3TurnoverCount = 0;

  let s4TurnoverCount = 0;

  let s5TurnoverCount = 0;


  function updateTurnover() {

    turnoverText.textContent =
      turnoverCount;

    turnoverFill.style.width =
      (
        turnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }


  function updateGSTurnover() {

    const gsText =
      document.querySelector(
        "#gs-turnover-count"
      );

    const gsFill =
      document.querySelector(
        "#gs-turnover-fill"
      );


    if (!gsText || !gsFill) {
      return;
    }


    gsText.textContent =
      gsTurnoverCount;

    gsFill.style.width =
      (
        gsTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }


  function updateGATurnover() {

    const gaText =
      document.querySelector(
        "#ga-turnover-count"
      );

    const gaFill =
      document.querySelector(
        "#ga-turnover-fill"
      );


    if (!gaText || !gaFill) {
      return;
    }


    gaText.textContent =
      gaTurnoverCount;

    gaFill.style.width =
      (
        gaTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateWATurnover() {

    const waText =
      document.querySelector(
        "#wa-turnover-count"
      );

    const waFill =
      document.querySelector(
        "#wa-turnover-fill"
      );

    if (!waText || !waFill) {
      return;
    }

    waText.textContent =
      waTurnoverCount;

    waFill.style.width =
      (
        waTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateCTurnover() {

    const cText =
      document.querySelector(
        "#c-turnover-count"
      );

    const cFill =
      document.querySelector(
        "#c-turnover-fill"
      );

    if (!cText || !cFill) {
      return;
    }

    cText.textContent =
      cTurnoverCount;

    cFill.style.width =
      (
        cTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateWDTurnover() {

    const wdText =
      document.querySelector(
        "#wd-turnover-count"
      );

    const wdFill =
      document.querySelector(
        "#wd-turnover-fill"
      );

    if (!wdText || !wdFill) {
      return;
    }

    wdText.textContent =
      wdTurnoverCount;

    wdFill.style.width =
      (
        wdTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateGDTurnover() {

    const gdText =
      document.querySelector(
        "#gd-turnover-count"
      );

    const gdFill =
      document.querySelector(
        "#gd-turnover-fill"
      );

    if (!gdText || !gdFill) {
      return;
    }

    gdText.textContent =
      gdTurnoverCount;

    gdFill.style.width =
      (
        gdTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateGKTurnover() {

    const gkText =
      document.querySelector(
        "#gk-turnover-count"
      );

    const gkFill =
      document.querySelector(
        "#gk-turnover-fill"
      );

    if (!gkText || !gkFill) {
      return;
    }

    gkText.textContent =
      gkTurnoverCount;

    gkFill.style.width =
      (
        gkTurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateS1Turnover() {

    const s1Text =
      document.querySelector(
        "#s1-turnover-count"
      );

    const s1Fill =
      document.querySelector(
        "#s1-turnover-fill"
      );

    if (!s1Text || !s1Fill) {
      return;
    }

    s1Text.textContent =
      s1TurnoverCount;

    s1Fill.style.width =
      (
        s1TurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateS2Turnover() {

    const s2Text =
      document.querySelector(
        "#s2-turnover-count"
      );

    const s2Fill =
      document.querySelector(
        "#s2-turnover-fill"
      );

    if (!s2Text || !s2Fill) {
      return;
    }

    s2Text.textContent =
      s2TurnoverCount;

    s2Fill.style.width =
      (
        s2TurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateS3Turnover() {

    const s3Text =
      document.querySelector(
        "#s3-turnover-count"
      );

    const s3Fill =
      document.querySelector(
        "#s3-turnover-fill"
      );

    if (!s3Text || !s3Fill) {
      return;
    }

    s3Text.textContent =
      s3TurnoverCount;

    s3Fill.style.width =
      (
        s3TurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateS4Turnover() {

    const s4Text =
      document.querySelector(
        "#s4-turnover-count"
      );

    const s4Fill =
      document.querySelector(
        "#s4-turnover-fill"
      );

    if (!s4Text || !s4Fill) {
      return;
    }

    s4Text.textContent =
      s4TurnoverCount;

    s4Fill.style.width =
      (
        s4TurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }

  function updateS5Turnover() {

    const s5Text =
      document.querySelector(
        "#s5-turnover-count"
      );

    const s5Fill =
      document.querySelector(
        "#s5-turnover-fill"
      );

    if (!s5Text || !s5Fill) {
      return;
    }

    s5Text.textContent =
      s5TurnoverCount;

    s5Fill.style.width =
      (
        s5TurnoverCount /
        TURNOVER_MAX
      ) * 100 + "%";

  }


  // ======================================================
  // UNFORCED ERROR
  // ======================================================

  const unforcedErrorButton =
    document.querySelector(
      "#level1-unforced-error"
    );

  const unforcedErrorText =
    document.querySelector(
      "#level1-unforced-error-count"
    );

  const unforcedErrorFill =
    document.querySelector(
      "#level1-unforced-error-fill"
    );


  let unforcedErrorCount = 0;

  const UNFORCED_ERROR_MAX = 10;

  let gsUnforcedErrorCount = 0;

  let gaUnforcedErrorCount = 0;

  let waUnforcedErrorCount = 0;

  let cUnforcedErrorCount = 0;

  let wdUnforcedErrorCount = 0;

  let gdUnforcedErrorCount = 0;

  let gkUnforcedErrorCount = 0;

  let s1UnforcedErrorCount = 0;

  let s2UnforcedErrorCount = 0;

  let s3UnforcedErrorCount = 0;

  let s4UnforcedErrorCount = 0;

  let s5UnforcedErrorCount = 0;

  function updateUnforcedError() {

    unforcedErrorText.textContent =
      unforcedErrorCount;

    unforcedErrorFill.style.width =
      (
        unforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }


  function updateGSUnforcedError() {

    const gsText =
      document.querySelector(
        "#gs-unforced-error-count"
      );

    const gsFill =
      document.querySelector(
        "#gs-unforced-error-fill"
      );


    if (!gsText || !gsFill) {
      return;
    }


    gsText.textContent =
      gsUnforcedErrorCount;

    gsFill.style.width =
      (
        gsUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateGAUnforcedError() {

    const gaText =
      document.querySelector(
        "#ga-unforced-error-count"
      );

    const gaFill =
      document.querySelector(
        "#ga-unforced-error-fill"
      );

    if (!gaText || !gaFill) {
      return;
    }

    gaText.textContent =
      gaUnforcedErrorCount;

    gaFill.style.width =
      (
        gaUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateWAUnforcedError() {

    const waText =
      document.querySelector(
        "#wa-unforced-error-count"
      );

    const waFill =
      document.querySelector(
        "#wa-unforced-error-fill"
      );

    if (!waText || !waFill) {
      return;
    }

    waText.textContent =
      waUnforcedErrorCount;

    waFill.style.width =
      (
        waUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateCUnforcedError() {

    const cText =
      document.querySelector(
        "#c-unforced-error-count"
      );

    const cFill =
      document.querySelector(
        "#c-unforced-error-fill"
      );

    if (!cText || !cFill) {
      return;
    }

    cText.textContent =
      cUnforcedErrorCount;

    cFill.style.width =
      (
        cUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateWDUnforcedError() {

    const wdText =
      document.querySelector(
        "#wd-unforced-error-count"
      );

    const wdFill =
      document.querySelector(
        "#wd-unforced-error-fill"
      );

    if (!wdText || !wdFill) {
      return;
    }

    wdText.textContent =
      wdUnforcedErrorCount;

    wdFill.style.width =
      (
        wdUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateGDUnforcedError() {

    const gdText =
      document.querySelector(
        "#gd-unforced-error-count"
      );

    const gdFill =
      document.querySelector(
        "#gd-unforced-error-fill"
      );

    if (!gdText || !gdFill) {
      return;
    }

    gdText.textContent =
      gdUnforcedErrorCount;

    gdFill.style.width =
      (
        gdUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateGKUnforcedError() {

    const gkText =
      document.querySelector(
        "#gk-unforced-error-count"
      );

    const gkFill =
      document.querySelector(
        "#gk-unforced-error-fill"
      );

    if (!gkText || !gkFill) {
      return;
    }

    gkText.textContent =
      gkUnforcedErrorCount;

    gkFill.style.width =
      (
        gkUnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateS1UnforcedError() {

    const s1Text =
      document.querySelector(
        "#s1-unforced-error-count"
      );

    const s1Fill =
      document.querySelector(
        "#s1-unforced-error-fill"
      );

    if (!s1Text || !s1Fill) {
      return;
    }

    s1Text.textContent =
      s1UnforcedErrorCount;

    s1Fill.style.width =
      (
        s1UnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateS2UnforcedError() {

    const s2Text =
      document.querySelector(
        "#s2-unforced-error-count"
      );

    const s2Fill =
      document.querySelector(
        "#s2-unforced-error-fill"
      );

    if (!s2Text || !s2Fill) {
      return;
    }

    s2Text.textContent =
      s2UnforcedErrorCount;

    s2Fill.style.width =
      (
        s2UnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateS3UnforcedError() {

    const s3Text =
      document.querySelector(
        "#s3-unforced-error-count"
      );

    const s3Fill =
      document.querySelector(
        "#s3-unforced-error-fill"
      );

    if (!s3Text || !s3Fill) {
      return;
    }

    s3Text.textContent =
      s3UnforcedErrorCount;

    s3Fill.style.width =
      (
        s3UnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateS4UnforcedError() {

    const s4Text =
      document.querySelector(
        "#s4-unforced-error-count"
      );

    const s4Fill =
      document.querySelector(
        "#s4-unforced-error-fill"
      );

    if (!s4Text || !s4Fill) {
      return;
    }

    s4Text.textContent =
      s4UnforcedErrorCount;

    s4Fill.style.width =
      (
        s4UnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }

  function updateS5UnforcedError() { 

    const s5Text =
      document.querySelector(
        "#s5-unforced-error-count"
      );

    const s5Fill =
      document.querySelector(
        "#s5-unforced-error-fill"
      );

    if (!s5Text || !s5Fill) {
      return;
    }

    s5Text.textContent =
      s5UnforcedErrorCount;

    s5Fill.style.width =
      (
        s5UnforcedErrorCount /
        UNFORCED_ERROR_MAX
      ) * 100 + "%";

  }


  // ======================================================
  // DEFENCE UNFORCED ERROR
  // ======================================================

  const dunforcedErrorButton =
    document.querySelector(
      "#level1-defence-unforced-error"
    );

  const dunforcedErrorText =
    document.querySelector(
      "#level1-defence-unforced-error-count"
    );

  const dunforcedErrorFill =
    document.querySelector(
      "#level1-defence-unforced-error-fill"
    );


  let dunforcedErrorCount = 0;

  const DUNFORCED_ERROR_MAX = 10;


  function updateDunforcedError() {

    dunforcedErrorText.textContent =
      dunforcedErrorCount;

    dunforcedErrorFill.style.width =
      (
        dunforcedErrorCount /
        DUNFORCED_ERROR_MAX
      ) * 100 + "%";

  }


  // ======================================================
  // GET ACTIVE PLAYER
  // ======================================================

  const TOGGLE_NUMBERS = {
  "gs-toggle": 1,
  "ga-toggle": 2,
  "wa-toggle": 3,
  "c-toggle": 4,
  "wd-toggle": 5,
  "gd-toggle": 6,
  "gk-toggle": 7,
  "S1-toggle": 8,
  "S2-toggle": 9,
  "S3-toggle": 10,
  "S4-toggle": 11,
  "S5-toggle": 12
};


function getActiveToggleNumber() {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  if (!activeToggle) {
    return null;
  }


  return TOGGLE_NUMBERS[
    activeToggle.id
  ] || null;

}

const PLAYER_POSITIONS = [
  "GS",
  "GA",
  "WA",
  "C",
  "WD",
  "GD",
  "GK",
  "S1",
  "S2",
  "S3",
  "S4",
  "S5"
];


function getActivePlayerPosition() {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  if (!activeToggle) {
    return null;
  }


  const positionIndex =
    Array.from(
      playerToggles
    ).indexOf(
      activeToggle
    );


  if (positionIndex === -1) {
    return null;
  }


  return PLAYER_POSITIONS[positionIndex];

}

  function getActivePlayer() {

    const activePlayer =
      document.querySelector(
        ".player-toggle.active"
      );


    if (!activePlayer) {
      return "";
    }

    return activePlayer.textContent.trim();

  }


  function getActivePlayerFlags() {

    const activePlayer =
      getActivePlayer();

    const activePosition =
      getActivePlayerPosition();

    const activeToggleNumber =
      getActiveToggleNumber();

    console.log(
      "ACTIVE PLAYER:",
      activePlayer,
      "| POSITION:",
      activePosition
    );


    return {

      GS:
        activeToggleNumber === 1,

      GA:
        activeToggleNumber === 2,

      WA:
        activeToggleNumber === 3,

      C:
        activeToggleNumber === 4,

      WD:
        activeToggleNumber === 5,

      GD:
        activeToggleNumber === 6,

      GK:
        activeToggleNumber === 7,

      S1:
        activeToggleNumber === 8,

      S2:
        activeToggleNumber === 9,

      S3:
        activeToggleNumber === 10,

      S4:
        activeToggleNumber === 11,

      S5:
        activeToggleNumber === 12

    };

  }


  function getPlayerPrefix(flags) {

    if (flags.GS) return "GS ";
    if (flags.GA) return "GA ";
    if (flags.WA) return "WA ";
    if (flags.C) return "C ";
    if (flags.WD) return "WD ";
    if (flags.GD) return "GD ";
    if (flags.GK) return "GK ";
    if (flags.S1) return "S1 ";
    if (flags.S2) return "S2 ";
    if (flags.S3) return "S3 ";
    if (flags.S4) return "S4 ";
    if (flags.S5) return "S5 ";

    return "";

  }


  function clearPlayerSelection() {

  playerToggles.forEach((toggle) => {

    toggle.classList.remove("active");

  });

  selectedPlayer = null;

}


  // ======================================================
  // UNDO LAST ACTION
  // ======================================================

  function undoLastAction() {

    const lastAction =
      history.pop();


    if (!lastAction) {
      return;
    }


    // ----------------------------------------------------
    // REMOVE MOST RECENT FEED EVENT
    // ----------------------------------------------------

    eventFeed
      .firstElementChild
      ?.remove();


    switch (
      lastAction.button
    ) {

      // ==================================================
      // SHOT SCORED
      // ==================================================

      case "level1-attack-shot-success":

        teamScore =
          Math.max(
            0,
            teamScore - 1
          );

        updateTeamScore();


        shotScoredButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                shotScoredButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS)
          gsShotSuccess =
            Math.max(
              0,
              gsShotSuccess - 1
            );

        if (lastAction.GA)
          gaShotSuccess =
            Math.max(
              0,
              gaShotSuccess - 1
            );

        if (lastAction.WA)
          waShotSuccess =
            Math.max(
              0,
              waShotSuccess - 1
            );

        if (lastAction.C)
          cShotSuccess =
            Math.max(
              0,
              cShotSuccess - 1
            );

        if (lastAction.WD)
          wdShotSuccess =
            Math.max(
              0,
              wdShotSuccess - 1
            );

        if (lastAction.GD)
          gdShotSuccess =
            Math.max(
              0,
              gdShotSuccess - 1
            );

        if (lastAction.GK)
          gkShotSuccess =
            Math.max(
              0,
              gkShotSuccess - 1
            );

        if (lastAction.S1)
          s1ShotSuccess =
            Math.max(
              0,
              s1ShotSuccess - 1
            );

        if (lastAction.S2)
          s2ShotSuccess =
            Math.max(
              0,
              s2ShotSuccess - 1
            );

        if (lastAction.S3)
          s3ShotSuccess =
            Math.max(
              0,
              s3ShotSuccess - 1
            );

        if (lastAction.S4)
          s4ShotSuccess =
            Math.max(
              0,
              s4ShotSuccess - 1
            );

        if (lastAction.S5)
          s5ShotSuccess =
            Math.max(
              0,
              s5ShotSuccess - 1
            );

        break;


      // ==================================================
      // SHOT MISSED
      // ==================================================

      case "level1-attack-shot-missed":

        shotMissedButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                shotMissedButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS)
          gsShotMissed =
            Math.max(
              0,
              gsShotMissed - 1
            );

        if (lastAction.GA)
          gaShotMissed =
            Math.max(
              0,
              gaShotMissed - 1
            );

        if (lastAction.WA)
          waShotMissed =
            Math.max(
              0,
              waShotMissed - 1
            );

        if (lastAction.C)
          cShotMissed =
            Math.max(
              0,
              cShotMissed - 1
            );

        if (lastAction.WD)
          wdShotMissed =
            Math.max(
              0,
              wdShotMissed - 1
            );

        if (lastAction.GD)
          gdShotMissed =
            Math.max(
              0,
              gdShotMissed - 1
            );

        if (lastAction.GK)
          gkShotMissed =
            Math.max(
              0,
              gkShotMissed - 1
            );

        if (lastAction.S1)
          s1ShotMissed =
            Math.max(
              0,
              s1ShotMissed - 1
            );

        if (lastAction.S2)
          s2ShotMissed =
            Math.max(
              0,
              s2ShotMissed - 1
            );

        if (lastAction.S3)
          s3ShotMissed =
            Math.max(
              0,
              s3ShotMissed - 1
            );

        if (lastAction.S4)
          s4ShotMissed =
            Math.max(
              0,
              s4ShotMissed - 1
            );

        if (lastAction.S5)
          s5ShotMissed =
            Math.max(
              0,
              s5ShotMissed - 1
            );

        break;


      // ==================================================
// ATTACK REBOUND WON
// ==================================================

case "level1-attack-rebound-won":

  reboundWon
    .querySelector(".counter")
    .textContent =
      Math.max(
        0,
        Number(
          reboundWon
            .querySelector(".counter")
            .textContent
        ) - 1
      );


  if (lastAction.playerToggleId === "gs-toggle")
  gsReboundWon =
    Math.max(0, gsReboundWon - 1);

if (lastAction.playerToggleId === "ga-toggle")
  gaReboundWon =
    Math.max(0, gaReboundWon - 1);

if (lastAction.playerToggleId === "wa-toggle")
  waReboundWon =
    Math.max(0, waReboundWon - 1);

if (lastAction.playerToggleId === "c-toggle")
  cReboundWon =
    Math.max(0, cReboundWon - 1);

if (lastAction.playerToggleId === "wd-toggle")
  wdReboundWon =
    Math.max(0, wdReboundWon - 1);

if (lastAction.playerToggleId === "gd-toggle")
  gdReboundWon =
    Math.max(0, gdReboundWon - 1);

if (lastAction.playerToggleId === "gk-toggle")
  gkReboundWon =
    Math.max(0, gkReboundWon - 1);

if (lastAction.playerToggleId === "S1-toggle")
  s1ReboundWon =
    Math.max(0, s1ReboundWon - 1);

if (lastAction.playerToggleId === "S2-toggle")
  s2ReboundWon =
    Math.max(0, s2ReboundWon - 1);

if (lastAction.playerToggleId === "S3-toggle")
  s3ReboundWon =
    Math.max(0, s3ReboundWon - 1);

if (lastAction.playerToggleId === "S4-toggle")
  s4ReboundWon =
    Math.max(0, s4ReboundWon - 1);

if (lastAction.playerToggleId === "S5-toggle")
  s5ReboundWon =
    Math.max(0, s5ReboundWon - 1);

  break;


      // ==================================================
      // ATTACK REBOUND LOST
      // ==================================================

      case "level1-attack-rebound-lost":

        reboundLost
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                reboundLost
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.playerToggleId === "gs-toggle")
  gsReboundLost =
    Math.max(0, gsReboundLost - 1);

if (lastAction.playerToggleId === "ga-toggle")
  gaReboundLost =
    Math.max(0, gaReboundLost - 1);

if (lastAction.playerToggleId === "wa-toggle")
  waReboundLost =
    Math.max(0, waReboundLost - 1);

if (lastAction.playerToggleId === "c-toggle")
  cReboundLost =
    Math.max(0, cReboundLost - 1);

if (lastAction.playerToggleId === "wd-toggle")
  wdReboundLost =
    Math.max(0, wdReboundLost - 1);

if (lastAction.playerToggleId === "gd-toggle")
  gdReboundLost =
    Math.max(0, gdReboundLost - 1);

if (lastAction.playerToggleId === "gk-toggle")
  gkReboundLost =
    Math.max(0, gkReboundLost - 1);

if (lastAction.playerToggleId === "S1-toggle")
  s1ReboundLost =
    Math.max(0, s1ReboundLost - 1);

if (lastAction.playerToggleId === "S2-toggle")
  s2ReboundLost =
    Math.max(0, s2ReboundLost - 1);

if (lastAction.playerToggleId === "S3-toggle")
  s3ReboundLost =
    Math.max(0, s3ReboundLost - 1);

if (lastAction.playerToggleId === "S4-toggle")
  s4ReboundLost =
    Math.max(0, s4ReboundLost - 1);

if (lastAction.playerToggleId === "S5-toggle")
  s5ReboundLost =
    Math.max(0, s5ReboundLost - 1);

        break;


      // ==================================================
      // FEED SUCCESS
      // ==================================================

      case "level1-feed-success":

        feedSuccess
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                feedSuccess
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS) {
          gsFeedSuccess =
            Math.max(
              0,
              gsFeedSuccess - 1
            );
        }

        if (lastAction.GA) {
          gaFeedSuccess =
            Math.max(
              0,
              gaFeedSuccess - 1
            );
        }

        if (lastAction.WA) {
          waFeedSuccess =
            Math.max(
              0,
              waFeedSuccess - 1
            );
        }

        if (lastAction.C) {
          cFeedSuccess =
            Math.max(
              0,
              cFeedSuccess - 1
            );
        }

        if (lastAction.WD) {
          wdFeedSuccess =
            Math.max(
              0,
              wdFeedSuccess - 1
            );
        }

        if (lastAction.GD) {
          gdFeedSuccess =
            Math.max(
              0,
              gdFeedSuccess - 1
            );
        }

        if (lastAction.GK) {
          gkFeedSuccess =
            Math.max(
              0,
              gkFeedSuccess - 1
            );
        }

        if (lastAction.S1) {
          s1FeedSuccess =
            Math.max(
              0,
              s1FeedSuccess - 1
            );
        }

        if (lastAction.S2) {
          s2FeedSuccess =
            Math.max(
              0,
              s2FeedSuccess - 1
            );
        }

        if (lastAction.S3) {
          s3FeedSuccess =
            Math.max(
              0,
              s3FeedSuccess - 1
            );
        }

        if (lastAction.S4) {
          s4FeedSuccess =
            Math.max(
              0,
              s4FeedSuccess - 1
            );
        }

        if (lastAction.S5) {
          s5FeedSuccess =
            Math.max(
              0,
              s5FeedSuccess - 1
            );
        }

        break;


      // ==================================================
      // FEED FAIL
      // ==================================================

      case "level1-feed-missed":

        feedMissed
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                feedMissed
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS) {
          gsFeedMissed =
            Math.max(
              0,
              gsFeedMissed - 1
            );
        }

        if (lastAction.GA) {
          gaFeedMissed =
            Math.max(
              0,
              gaFeedMissed - 1
            );
        }

        if (lastAction.WA) {
          waFeedMissed =
            Math.max(
              0,
              waFeedMissed - 1
            );
        }

        if (lastAction.C) {
          cFeedMissed =
            Math.max(
              0,
              cFeedMissed - 1
            );
        }

        if (lastAction.WD) {
          wdFeedMissed =
            Math.max(
              0,
              wdFeedMissed - 1
            );
        }

        if (lastAction.GD) {
          gdFeedMissed =
            Math.max(
              0,
              gdFeedMissed - 1
            );
        }

        if (lastAction.GK) {
          gkFeedMissed =
            Math.max(
              0,
              gkFeedMissed - 1
            );
        }

        if (lastAction.S1) {
          s1FeedMissed =
            Math.max(
              0,
              s1FeedMissed - 1
            );
        }

        if (lastAction.S2) {
          s2FeedMissed =
            Math.max(
              0,
              s2FeedMissed - 1
            );
        }

        if (lastAction.S3) {
          s3FeedMissed =
            Math.max(
              0,
              s3FeedMissed - 1
            );
        }

        if (lastAction.S4) {
          s4FeedMissed =
            Math.max(
              0,
              s4FeedMissed - 1
            );
        }

        if (lastAction.S5) {
          s5FeedMissed =
            Math.max(
              0,
              s5FeedMissed - 1
            );
        }

        break;


      // ==================================================
// CENTRE SUCCESS
// ==================================================

case "level1-centre-success":

  centreSuccess
    .querySelector(".counter")
    .textContent =
      Math.max(
        0,
        Number(
          centreSuccess
            .querySelector(".counter")
            .textContent
        ) - 1
      );


  if (lastAction.GS) {

    gsCentreSuccess =
      Math.max(
        0,
        gsCentreSuccess - 1
      );

  }


  if (lastAction.GA) {

    gaCentreSuccess =
      Math.max(
        0,
        gaCentreSuccess - 1
      );

  }


  if (lastAction.WA) {

    waCentreSuccess =
      Math.max(
        0,
        waCentreSuccess - 1
      );

  }


  if (lastAction.C) {

    cCentreSuccess =
      Math.max(
        0,
        cCentreSuccess - 1
      );

  }


  if (lastAction.WD) {

    wdCentreSuccess =
      Math.max(
        0,
        wdCentreSuccess - 1
      );

  }


  if (lastAction.GD) {

    gdCentreSuccess =
      Math.max(
        0,
        gdCentreSuccess - 1
      );

  }


  if (lastAction.GK) {

    gkCentreSuccess =
      Math.max(
        0,
        gkCentreSuccess - 1
      );

  }


  if (lastAction.S1) {

    s1CentreSuccess =
      Math.max(
        0,
        s1CentreSuccess - 1
      );

  }


  if (lastAction.S2) {

    s2CentreSuccess =
      Math.max(
        0,
        s2CentreSuccess - 1
      );

  }


  if (lastAction.S3) {

    s3CentreSuccess =
      Math.max(
        0,
        s3CentreSuccess - 1
      );

  }


  if (lastAction.S4) {

    s4CentreSuccess =
      Math.max(
        0,
        s4CentreSuccess - 1
      );

  }


  if (lastAction.S5) {

    s5CentreSuccess =
      Math.max(
        0,
        s5CentreSuccess - 1
      );

  }

  break;


      // ==================================================
// CENTRE FAIL
// ==================================================

case "level1-centre-missed":

  centreMissed
    .querySelector(".counter")
    .textContent =
      Math.max(
        0,
        Number(
          centreMissed
            .querySelector(".counter")
            .textContent
        ) - 1
      );


  if (lastAction.GS) {

    gsCentreMissed =
      Math.max(
        0,
        gsCentreMissed - 1
      );

  }


  if (lastAction.GA) {

    gaCentreMissed =
      Math.max(
        0,
        gaCentreMissed - 1
      );

  }


  if (lastAction.WA) {

    waCentreMissed =
      Math.max(
        0,
        waCentreMissed - 1
      );

  }


  if (lastAction.C) {

    cCentreMissed =
      Math.max(
        0,
        cCentreMissed - 1
      );

  }


  if (lastAction.WD) {

    wdCentreMissed =
      Math.max(
        0,
        wdCentreMissed - 1
      );

  }


  if (lastAction.GD) {

    gdCentreMissed =
      Math.max(
        0,
        gdCentreMissed - 1
      );

  }


  if (lastAction.GK) {

    gkCentreMissed =
      Math.max(
        0,
        gkCentreMissed - 1
      );

  }


  if (lastAction.S1) {

    s1CentreMissed =
      Math.max(
        0,
        s1CentreMissed - 1
      );

  }


  if (lastAction.S2) {

    s2CentreMissed =
      Math.max(
        0,
        s2CentreMissed - 1
      );

  }


  if (lastAction.S3) {

    s3CentreMissed =
      Math.max(
        0,
        s3CentreMissed - 1
      );

  }


  if (lastAction.S4) {

    s4CentreMissed =
      Math.max(
        0,
        s4CentreMissed - 1
      );

  }


  if (lastAction.S5) {

    s5CentreMissed =
      Math.max(
        0,
        s5CentreMissed - 1
      );

  }

  break;


                  // ==================================================
      // TURNOVER
      // ==================================================

      case "level1-attack-turnover":

        turnoverCount =
          Math.max(
            0,
            turnoverCount - 1
          );


        updateTurnover();


        turnoverButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                turnoverButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS) {

          gsTurnoverCount =
            Math.max(
              0,
              gsTurnoverCount - 1
            );

        }


        if (lastAction.GA) {

          gaTurnoverCount =
            Math.max(
              0,
              gaTurnoverCount - 1
            );

        }


        if (lastAction.WA) {

          waTurnoverCount =
            Math.max(
              0,
              waTurnoverCount - 1
            );

        }

        if (lastAction.C) {

          cTurnoverCount =
            Math.max(
              0,
              cTurnoverCount - 1
            );

        }

        if (lastAction.WD) {

          wdTurnoverCount =
            Math.max(
              0,
              wdTurnoverCount - 1
            );

        }
        
        if (lastAction.GD) {

          gdTurnoverCount =
            Math.max(
              0,
              gdTurnoverCount - 1
            );

        }

        if (lastAction.GK) {

          gkTurnoverCount =
            Math.max(
              0,
              gkTurnoverCount - 1
            );

        }

        if (lastAction.S1) {

          s1TurnoverCount =
            Math.max(
              0,
              s1TurnoverCount - 1
            );

        }

        if (lastAction.S2) {

          s2TurnoverCount =
            Math.max(
              0,
              s2TurnoverCount - 1
            );

        }

        if (lastAction.S3) {

          s3TurnoverCount =
            Math.max(
              0,
              s3TurnoverCount - 1
            );

        }

        if (lastAction.S4) {

          s4TurnoverCount =
            Math.max(
              0,
              s4TurnoverCount - 1
            );

        }

        if (lastAction.S5) {

          s5TurnoverCount =
            Math.max(
              0,
              s5TurnoverCount - 1
            );

        }

        break;


      // ==================================================
      // UNFORCED ERROR
      // ==================================================

      case "level1-unforced-error":

        unforcedErrorCount =
          Math.max(
            0,
            unforcedErrorCount - 1
          );


        updateUnforcedError();


        unforcedErrorButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                unforcedErrorButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.GS) {

          gsUnforcedErrorCount =
            Math.max(
              0,
              gsUnforcedErrorCount - 1
            );

        }

        if (lastAction.GA) {

          gaUnforcedErrorCount =
            Math.max(
              0,
              gaUnforcedErrorCount - 1
            );

        }

        if (lastAction.WA) {

          waUnforcedErrorCount =
            Math.max(
              0,
              waUnforcedErrorCount - 1
            );

        }

        if (lastAction.C) {

          cUnforcedErrorCount =
            Math.max(
              0,
              cUnforcedErrorCount - 1
            );

        }

        if (lastAction.WD) {

          wdUnforcedErrorCount =
            Math.max(
              0,
              wdUnforcedErrorCount - 1
            );

        }

        if (lastAction.GD) {

          gdUnforcedErrorCount =
            Math.max(
              0,
              gdUnforcedErrorCount - 1
            );

        }

        if (lastAction.GK) {

          gkUnforcedErrorCount =
            Math.max(
              0,
              gkUnforcedErrorCount - 1
            );

        }

        if (lastAction.S1) {

          s1UnforcedErrorCount =
            Math.max(
              0,
              s1UnforcedErrorCount - 1
            );

        }

        if (lastAction.S2) {

          s2UnforcedErrorCount =
            Math.max(
              0,
              s2UnforcedErrorCount - 1
            );

        }

        if (lastAction.S3) {

          s3UnforcedErrorCount =
            Math.max(
              0,
              s3UnforcedErrorCount - 1
            );

        }

        if (lastAction.S4) {

          s4UnforcedErrorCount =
            Math.max(
              0,
              s4UnforcedErrorCount - 1
            );

        }

        if (lastAction.S5) {

          s5UnforcedErrorCount =
            Math.max(
              0,
              s5UnforcedErrorCount - 1
            );

        }

        break;


                  
      // ==================================================
      // DEFENSIVE REBOUND WON
      // ==================================================

      case "level1-defence-rebound-won":

        lvl1dreboundwon
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                lvl1dreboundwon
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.playerToggleId === "gs-toggle") {
          gsDReboundWon = Math.max(0, gsDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "ga-toggle") {
          gaDReboundWon = Math.max(0, gaDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "wa-toggle") {
          waDReboundWon = Math.max(0, waDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "c-toggle") {
          cDReboundWon = Math.max(0, cDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "wd-toggle") {
          wdDReboundWon = Math.max(0, wdDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "gd-toggle") {
          gdDReboundWon = Math.max(0, gdDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "gk-toggle") {
          gkDReboundWon = Math.max(0, gkDReboundWon - 1);
        }

        if (lastAction.playerToggleId === "S1-toggle") {
          s1DReboundWon = Math.max(0, s1DReboundWon - 1);
        }

        if (lastAction.playerToggleId === "S2-toggle") {
          s2DReboundWon = Math.max(0, s2DReboundWon - 1);
        }

        if (lastAction.playerToggleId === "S3-toggle") {
          s3DReboundWon = Math.max(0, s3DReboundWon - 1);
        }

        if (lastAction.playerToggleId === "S4-toggle") {
          s4DReboundWon = Math.max(0, s4DReboundWon - 1);
        }

        if (lastAction.playerToggleId === "S5-toggle") {
          s5DReboundWon = Math.max(0, s5DReboundWon - 1);
        }

        break;



      
      // ==================================================
      // DEFENSIVE REBOUND LOST
      // ==================================================

      case "level1-defence-rebound-lost":

        lvl1dreboundlost
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                lvl1dreboundlost
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );


        if (lastAction.playerToggleId === "gs-toggle") {
          gsDReboundLost =
            Math.max(0, gsDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "ga-toggle") {
          gaDReboundLost =
            Math.max(0, gaDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "wa-toggle") {
          waDReboundLost =
            Math.max(0, waDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "c-toggle") {
          cDReboundLost =
            Math.max(0, cDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "wd-toggle") {
          wdDReboundLost =
            Math.max(0, wdDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "gd-toggle") {
          gdDReboundLost =
            Math.max(0, gdDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "gk-toggle") {
          gkDReboundLost =
            Math.max(0, gkDReboundLost - 1);
        }

        if (lastAction.playerToggleId === "S1-toggle") {
          s1DReboundLost =
            Math.max(0, s1DReboundLost - 1);
        }

        if (lastAction.playerToggleId === "S2-toggle") {
          s2DReboundLost =
            Math.max(0, s2DReboundLost - 1);
        }

        if (lastAction.playerToggleId === "S3-toggle") {
          s3DReboundLost =
            Math.max(0, s3DReboundLost - 1);
        }

        if (lastAction.playerToggleId === "S4-toggle") {
          s4DReboundLost =
            Math.max(0, s4DReboundLost - 1);
        }

        if (lastAction.playerToggleId === "S5-toggle") {
          s5DReboundLost =
            Math.max(0, s5DReboundLost - 1);
        }

        break;



      // ==================================================
      // DEFENCE UNFORCED ERROR
      // ==================================================

      case "level1-defence-unforced-error":

        dunforcedErrorCount =
          Math.max(
            0,
            dunforcedErrorCount - 1
          );


        updateDunforcedError();


        dunforcedErrorButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                dunforcedErrorButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );

        break;


      // ==================================================
      // OPPOSITION SCORE
      // ==================================================

      case "opposition-score-btn":

        oppositionScore =
          Math.max(
            0,
            oppositionScore - 1
          );


        updateOppositionScore();


        oppositionButton
          .querySelector(".counter")
          .textContent =
            Math.max(
              0,
              Number(
                oppositionButton
                  .querySelector(".counter")
                  .textContent
              ) - 1
            );

        break;

    }


        // ======================================================
    // REFRESH EVERYTHING AFTER UNDO
    // ======================================================

    updateShotPercentage();

    updateAllPlayerShotPercentages();

    updateAttackReboundPercentage();

    updateGSAttackReboundPercentage();

    updateGAAttackReboundPercentage();

    updateWAAttackReboundPercentage();

    updateCAttackReboundPercentage();

    updateWDAttackReboundPercentage();

    updateGDAttackReboundPercentage();

    updateGKAttackReboundPercentage();

    updateS1AttackReboundPercentage();

    updateS2AttackReboundPercentage();

    updateS3AttackReboundPercentage();

    updateS4AttackReboundPercentage();

    updateS5AttackReboundPercentage();

    updateFeedSuccessPercentage();

    updateGSFeedSuccessPercentage();

    updateGAFeedSuccessPercentage();

    updateWAFeedSuccessPercentage();

    updateCFeedSuccessPercentage();

    updateWDFeedSuccessPercentage();

    updateGDFeedSuccessPercentage();

    updateGKFeedSuccessPercentage();

    updateS1FeedSuccessPercentage();

    updateS2FeedSuccessPercentage();

    updateS3FeedSuccessPercentage();

    updateS4FeedSuccessPercentage();

    updateS5FeedSuccessPercentage();

    updateCentreSuccessPercentage();

    updateGSCentreSuccessPercentage();

    updateGACentreSuccessPercentage();

    updateWACentreSuccessPercentage();

    updateCCentreSuccessPercentage();

    updateWDCentreSuccessPercentage();

    updateGDCentreSuccessPercentage();

    updateGKCentreSuccessPercentage();

    updateS1CentreSuccessPercentage();

    updateS2CentreSuccessPercentage();

    updateS3CentreSuccessPercentage();

    updateS4CentreSuccessPercentage();

    updateS5CentreSuccessPercentage();

    updateDefenceReboundPercentage();

    updateGSDReboundPercentage();

    updateGADReboundPercentage();

    updateWADReboundPercentage();

    updateCDReboundPercentage();

    updateWDDReboundPercentage();

    updateGDDReboundPercentage();

    updateGKDReboundPercentage();

    updateS1DReboundPercentage();

    updateS2DReboundPercentage();

    updateS3DReboundPercentage();

    updateS4DReboundPercentage();

    updateS5DReboundPercentage();

    updateTurnover();

    updateGSTurnover();

    updateGATurnover();

    updateWATurnover();

    updateCTurnover();

    updateWDTurnover();

    updateGDTurnover();

    updateGKTurnover();

    updateS1Turnover();

    updateS2Turnover();

    updateS3Turnover();

    updateS4Turnover();

    updateS5Turnover();

    updateUnforcedError();

    updateGSUnforcedError();

    updateGAUnforcedError();

    updateWAUnforcedError();

    updateCUnforcedError();

    updateWDUnforcedError();

    updateGDUnforcedError();

    updateGKUnforcedError();

    updateS1UnforcedError();

    updateS2UnforcedError();

    updateS3UnforcedError();

    updateS4UnforcedError();

    updateS5UnforcedError();

    updateDunforcedError();

  }

  buttons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      // CENTRE POSITION VALIDATION

      if (
        button.id === "level1-centre-success" ||
        button.id === "level1-centre-missed"
      ) {

        const activeToggle =
          document.querySelector(
            ".player-toggle.active"
          );

        const toggleIndex =
          activeToggle
            ? Array.from(
                playerToggles
              ).indexOf(
                activeToggle
              )
            : -1;

                if (
          activeToggle &&
          (
            toggleIndex < 0 ||
            toggleIndex > 11
          )
        ) {
          return;
        }

      }


// SHOT POSITION VALIDATION


      // SHOT POSITION VALIDATION
if (
  button.id === "level1-attack-shot-success" ||
  button.id === "level1-attack-shot-missed"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;


  if (
  activeToggle &&
  toggleIndex !== 0 &&
  toggleIndex !== 1 &&
  toggleIndex !== 2 &&
  toggleIndex !== 3 &&
  toggleIndex !== 4 &&
  toggleIndex !== 5 &&
  toggleIndex !== 6 &&
  toggleIndex !== 7 &&
  toggleIndex !== 8 &&
  toggleIndex !== 9 &&
  toggleIndex !== 10 &&
  toggleIndex !== 11
) {
  return;
}

}


                        // DEFENSIVE REBOUND POSITION VALIDATION

      if (
        button.id === "level1-defence-rebound-won" ||
        button.id === "level1-defence-rebound-lost"
      ) {

        const activeToggle =
          document.querySelector(
            ".player-toggle.active"
          );

        const toggleIndex =
          activeToggle
            ? Array.from(
                playerToggles
              ).indexOf(
                activeToggle
              )
            : -1;

        if (
          activeToggle &&
          (
            toggleIndex < 0 ||
            toggleIndex > 11
          )
        ) {
          return;
        }

      }

      // ATTACK REBOUND POSITION VALIDATION

if (
  button.id === "level1-attack-rebound-won" ||
  button.id === "level1-attack-rebound-lost"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );

  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;

  if (
    activeToggle &&
    toggleIndex !== 0 &&
    toggleIndex !== 1 &&
    toggleIndex !== 2 &&
    toggleIndex !== 3 &&
    toggleIndex !== 4 &&
    toggleIndex !== 5 &&
    toggleIndex !== 6 &&
    toggleIndex !== 7 &&
    toggleIndex !== 8 &&
    toggleIndex !== 9 &&
    toggleIndex !== 10 &&
    toggleIndex !== 11
  ) {
    return;
  }

}

      // FEED POSITION VALIDATION
if (
  button.id === "level1-feed-success" ||
  button.id === "level1-feed-missed"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;


  if (
    activeToggle &&
    toggleIndex !== 0 &&
    toggleIndex !== 1 &&
    toggleIndex !== 2 &&
    toggleIndex !== 3 &&
    toggleIndex !== 4 &&
    toggleIndex !== 5 &&
    toggleIndex !== 6 &&
    toggleIndex !== 7 &&
    toggleIndex !== 8 &&
    toggleIndex !== 9 &&
    toggleIndex !== 10 &&
    toggleIndex !== 11
  ) {
    return;
  }

}

      const flags =
  getActivePlayerFlags();

const player =
  getActivePlayer();

const playerPrefix =
  getPlayerPrefix(flags);

const playerToggleId =
  document.querySelector(".player-toggle.active")?.id || "";

// HISTORY
history.push({
  button: button.id,
  time: matchClock.textContent,
  player: player,
  playerToggleId: playerToggleId,
  ...flags
});


                // ==================================================
        // BUTTON COUNTER
        // ==================================================

        const counter =
  button.querySelector(
    ".counter"
  );

if (counter) {

  counter.textContent =
    Number(
      counter.textContent
    ) + 1;

}


// ==================================================
// OPPOSITION SCORE
// ==================================================

if (
  button.id === "opposition-score-btn"
) {

  oppositionScore++;

  updateOppositionScore();


  // ADD TO GAME FEED

  eventFeed.innerHTML =
    `<div class="oppo-score-event">${matchClock.textContent} - OPPOSITION SCORE</div>` +
    eventFeed.innerHTML;

}


       // ==================================================
// SHOT SCORED
// ==================================================

if (
  button.id ===
  "level1-attack-shot-success"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;


  if (
    !activeToggle ||
    toggleIndex === 0 ||
    toggleIndex === 1 ||
    toggleIndex === 2 ||
    toggleIndex === 3 ||
    toggleIndex === 4 ||
    toggleIndex === 5 ||
    toggleIndex === 6 ||
    toggleIndex === 7 ||
    toggleIndex === 8 ||
    toggleIndex === 9 ||
    toggleIndex === 10 ||
    toggleIndex === 11
  ) {

    teamScore++;

    updateTeamScore();


    if (activeToggle && activeToggle.id === "gs-toggle")
      gsShotSuccess++;

    if (activeToggle && activeToggle.id === "ga-toggle")
      gaShotSuccess++;

    if (activeToggle && activeToggle.id === "wa-toggle")
      waShotSuccess++;

    if (activeToggle && activeToggle.id === "c-toggle")
      cShotSuccess++;

    if (activeToggle && activeToggle.id === "wd-toggle")
      wdShotSuccess++;

    if (activeToggle && activeToggle.id === "gd-toggle")
      gdShotSuccess++;

    if (activeToggle && activeToggle.id === "gk-toggle")
      gkShotSuccess++;

    if (activeToggle && activeToggle.id === "S1-toggle")
      s1ShotSuccess++;

    if (activeToggle && activeToggle.id === "S2-toggle")
      s2ShotSuccess++;

    if (activeToggle && activeToggle.id === "S3-toggle")
      s3ShotSuccess++;

    if (activeToggle && activeToggle.id === "S4-toggle")
      s4ShotSuccess++;

    if (activeToggle && activeToggle.id === "S5-toggle")
      s5ShotSuccess++;


    updateShotPercentage();

    updateAllPlayerShotPercentages();


    const shotPlayerPrefix =
      activeToggle
        ? activeToggle.textContent.trim() + " "
        : "";

    eventFeed.innerHTML =
      `<div class="shot-scored-event">${matchClock.textContent} - ${shotPlayerPrefix}SHOT SCORED</div>` +
      eventFeed.innerHTML;


    clearPlayerSelection();

  }

}


        // ==================================================
// SHOT MISSED
// ==================================================

if (
  button.id ===
  "level1-attack-shot-missed"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


    if (activeToggle && activeToggle.id === "gs-toggle")
      gsShotMissed++;

    if (activeToggle && activeToggle.id === "ga-toggle")
      gaShotMissed++;

    if (activeToggle && activeToggle.id === "wa-toggle")
      waShotMissed++;

    if (activeToggle && activeToggle.id === "c-toggle")
      cShotMissed++;

    if (activeToggle && activeToggle.id === "wd-toggle")
      wdShotMissed++;

    if (activeToggle && activeToggle.id === "gd-toggle")
      gdShotMissed++;

    if (activeToggle && activeToggle.id === "gk-toggle")
      gkShotMissed++;

    if (activeToggle && activeToggle.id === "S1-toggle")
      s1ShotMissed++;

    if (activeToggle && activeToggle.id === "S2-toggle")
      s2ShotMissed++;

    if (activeToggle && activeToggle.id === "S3-toggle")
      s3ShotMissed++;

    if (activeToggle && activeToggle.id === "S4-toggle")
      s4ShotMissed++;

    if (activeToggle && activeToggle.id === "S5-toggle")
      s5ShotMissed++;


  updateShotPercentage();

  updateAllPlayerShotPercentages();


  const shotPlayerPrefix =
  activeToggle
    ? activeToggle.textContent.trim() + " "
    : "";

    eventFeed.innerHTML =
  `<div class="feed-missed-event">${matchClock.textContent} - ${shotPlayerPrefix}SHOT MISSED</div>` +
  eventFeed.innerHTML;

  clearPlayerSelection();

}


// ==================================================
// ATTACK REBOUND WON
// ==================================================

if (
  button.id ===
  "level1-attack-rebound-won"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;

  console.log(
  "REBOUND PLAYER:",
  player
);

  console.log("ACTIVE PLAYER:", getActivePlayer());
console.log("WA COUNTER BEFORE:", waReboundWon);

updatePlayerReboundCounter(
  activeToggle ? activeToggle.id : "",
  "won"
);

console.log("WA COUNTER AFTER:", waReboundWon);


  updateAttackReboundPercentage();

  updateGSAttackReboundPercentage();

  updateGAAttackReboundPercentage();

  updateWAAttackReboundPercentage();

  updateCAttackReboundPercentage();

  updateWDAttackReboundPercentage();

  updateGDAttackReboundPercentage();

  updateGKAttackReboundPercentage();

  updateS1AttackReboundPercentage();

  updateS2AttackReboundPercentage();

  updateS3AttackReboundPercentage();

  updateS4AttackReboundPercentage();

  updateS5AttackReboundPercentage();

  eventFeed.innerHTML =
  `<div class="attack-rebound-won-event">${matchClock.textContent} - ${activeToggle ? activeToggle.textContent.trim() + " " : ""}ATTACK REBOUND WON</div>` +
  eventFeed.innerHTML;


  clearPlayerSelection();

}

// ==================================================
// ATTACK REBOUND LOST
// ==================================================

if (
  button.id ===
  "level1-attack-rebound-lost"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;

  updatePlayerReboundCounter(
  activeToggle ? activeToggle.id : "",
  "lost"
);


  updateAttackReboundPercentage();

  updateGSAttackReboundPercentage();

  updateGAAttackReboundPercentage();

  updateWAAttackReboundPercentage();

  updateCAttackReboundPercentage();

  updateWDAttackReboundPercentage();

  updateGDAttackReboundPercentage();

  updateGKAttackReboundPercentage();

  updateS1AttackReboundPercentage();

  updateS2AttackReboundPercentage();

  updateS3AttackReboundPercentage();

  updateS4AttackReboundPercentage();

  updateS5AttackReboundPercentage();

  eventFeed.innerHTML =
  `<div class="attack-rebound-lost-event">${matchClock.textContent} - ${activeToggle ? activeToggle.textContent.trim() + " " : ""}ATTACK REBOUND LOST</div>` +
  eventFeed.innerHTML;


  clearPlayerSelection();

}


        // ==================================================
        // FEED SUCCESS
        // ==================================================

        if (button.id === "level1-feed-success") {
  if (flags.GS) {
    gsFeedSuccess++;
    updateGSFeedSuccessPercentage();
  }
  if (flags.GA) {
    gaFeedSuccess++;
    updateGAFeedSuccessPercentage();
  }
  if (flags.WA) {
    waFeedSuccess++;
    updateWAFeedSuccessPercentage();
  }
  if (flags.C) {
    cFeedSuccess++;
    updateCFeedSuccessPercentage();
  }
  if (flags.WD) {
    wdFeedSuccess++;
    updateWDFeedSuccessPercentage();
  }
  if (flags.GD) {
    gdFeedSuccess++;
    updateGDFeedSuccessPercentage();
  }
  if (flags.GK) {
    gkFeedSuccess++;
    updateGKFeedSuccessPercentage();
  }
  if (flags.S1) {
    s1FeedSuccess++;
    updateS1FeedSuccessPercentage();
  }
  if (flags.S2) {
    s2FeedSuccess++;
    updateS2FeedSuccessPercentage();
  }
  if (flags.S3) {
    s3FeedSuccess++;
    updateS3FeedSuccessPercentage();
  }
  if (flags.S4) {
    s4FeedSuccess++;
    updateS4FeedSuccessPercentage();
  }
  if (flags.S5) {
    s5FeedSuccess++;
    updateS5FeedSuccessPercentage();
  }

  updateFeedSuccessPercentage();

  eventFeed.innerHTML =
    `<div class="feed-success-event">${matchClock.textContent} - ${playerPrefix}FEED SUCCESS</div>` +
    eventFeed.innerHTML;
  clearPlayerSelection();
}


        // ==================================================
        // FEED FAIL
        // ==================================================

        if (button.id === "level1-feed-missed") {
          if (flags.GS) {
            gsFeedMissed++;
            updateGSFeedSuccessPercentage();
          }
          if (flags.GA) {
            gaFeedMissed++;
            updateGAFeedSuccessPercentage();
          }
          if (flags.WA) {
            waFeedMissed++;
            updateWAFeedSuccessPercentage();
          }
          if (flags.C) {
            cFeedMissed++;
            updateCFeedSuccessPercentage();
          }
          if (flags.WD) {
            wdFeedMissed++;
            updateWDFeedSuccessPercentage();
          }
          if (flags.GD) {
            gdFeedMissed++;
            updateGDFeedSuccessPercentage();
          }
          if (flags.GK) {
            gkFeedMissed++;
            updateGKFeedSuccessPercentage();
          }
          if (flags.S1) {
            s1FeedMissed++;
            updateS1FeedSuccessPercentage();
          }
          if (flags.S2) {
            s2FeedMissed++;
            updateS2FeedSuccessPercentage();
          }
          if (flags.S3) {
            s3FeedMissed++;
            updateS3FeedSuccessPercentage();
          }
          if (flags.S4) {
            s4FeedMissed++;
            updateS4FeedSuccessPercentage();
          }
          if (flags.S5) {
            s5FeedMissed++;
            updateS5FeedSuccessPercentage();
          }

          updateFeedSuccessPercentage();

          eventFeed.innerHTML =
            `<div class="feed-missed-event">${matchClock.textContent} - ${playerPrefix}FEED FAIL</div>` +
            eventFeed.innerHTML;
          clearPlayerSelection();
        }


                        // ==================================================
// CENTRE SUCCESS
// ==================================================

if (
  button.id ===
  "level1-centre-success"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;


  if (
    activeToggle &&
    (
      toggleIndex < 0 ||
      toggleIndex > 11
    )
  ) {
    return;
  }


  if (activeToggle) {

    const toggleIdentity =
      activeToggle.id;


    if (toggleIdentity === "gs-toggle") {

      gsCentreSuccess++;

      updateGSCentreSuccessPercentage();

    }


    if (toggleIdentity === "ga-toggle") {

      gaCentreSuccess++;

      updateGACentreSuccessPercentage();

    }


    if (toggleIdentity === "wa-toggle") {

      waCentreSuccess++;

      updateWACentreSuccessPercentage();

    }


    if (toggleIdentity === "c-toggle") {

      cCentreSuccess++;

      updateCCentreSuccessPercentage();

    }


    if (toggleIdentity === "wd-toggle") {

      wdCentreSuccess++;

      updateWDCentreSuccessPercentage();

    }


    if (toggleIdentity === "gd-toggle") {

      gdCentreSuccess++;

      updateGDCentreSuccessPercentage();

    }


    if (toggleIdentity === "gk-toggle") {

      gkCentreSuccess++;

      updateGKCentreSuccessPercentage();

    }


    if (toggleIdentity === "S1-toggle") {

      s1CentreSuccess++;

      updateS1CentreSuccessPercentage();

    }


    if (toggleIdentity === "S2-toggle") {

      s2CentreSuccess++;

      updateS2CentreSuccessPercentage();

    }


    if (toggleIdentity === "S3-toggle") {

      s3CentreSuccess++;

      updateS3CentreSuccessPercentage();

    }


    if (toggleIdentity === "S4-toggle") {

      s4CentreSuccess++;

      updateS4CentreSuccessPercentage();

    }


        if (toggleIdentity === "S5-toggle") {

      s5CentreSuccess++;

      updateS5CentreSuccessPercentage();

    }

  }


  // UPDATE MATCH REPORT
  updateCentreSuccessPercentage();


  // UPDATE GAMEFEED
  eventFeed.innerHTML =
    `<div class="centre-success-event">${matchClock.textContent} - ${playerPrefix}CENTRE SUCCESS</div>` +
    eventFeed.innerHTML;


  // CLEAR PLAYER SELECTION
  clearPlayerSelection();

}



                // ==================================================
// CENTRE FAIL
// ==================================================

if (
  button.id ===
  "level1-centre-missed"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );


  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;


  if (
    activeToggle &&
    (
      toggleIndex < 0 ||
      toggleIndex > 11
    )
  ) {
    return;
  }


  if (activeToggle) {

    const toggleIdentity =
      activeToggle.id;


    if (toggleIdentity === "gs-toggle") {

      gsCentreMissed++;

      updateGSCentreSuccessPercentage();

    }


    if (toggleIdentity === "ga-toggle") {

      gaCentreMissed++;

      updateGACentreSuccessPercentage();

    }


    if (toggleIdentity === "wa-toggle") {

      waCentreMissed++;

      updateWACentreSuccessPercentage();

    }


    if (toggleIdentity === "c-toggle") {

      cCentreMissed++;

      updateCCentreSuccessPercentage();

    }


    if (toggleIdentity === "wd-toggle") {

      wdCentreMissed++;

      updateWDCentreSuccessPercentage();

    }


    if (toggleIdentity === "gd-toggle") {

      gdCentreMissed++;

      updateGDCentreSuccessPercentage();

    }


    if (toggleIdentity === "gk-toggle") {

      gkCentreMissed++;

      updateGKCentreSuccessPercentage();

    }


    if (toggleIdentity === "S1-toggle") {

      s1CentreMissed++;

      updateS1CentreSuccessPercentage();

    }


    if (toggleIdentity === "S2-toggle") {

      s2CentreMissed++;

      updateS2CentreSuccessPercentage();

    }


    if (toggleIdentity === "S3-toggle") {

      s3CentreMissed++;

      updateS3CentreSuccessPercentage();

    }


    if (toggleIdentity === "S4-toggle") {

      s4CentreMissed++;

      updateS4CentreSuccessPercentage();

    }


    if (toggleIdentity === "S5-toggle") {

      s5CentreMissed++;

      updateS5CentreSuccessPercentage();

    }

  }


  updateCentreSuccessPercentage();


  eventFeed.innerHTML =
    `<div class="centre-fail-event">${matchClock.textContent} - ${playerPrefix}CENTRE FAIL</div>` +
    eventFeed.innerHTML;


  clearPlayerSelection();

}

// ==================================================
// TURNOVER
// ==================================================


if (
  button.id ===
  "level1-attack-turnover"
) {

  turnoverCount++;

updateTurnover();

  if (flags.GS) {

    gsTurnoverCount++;

    updateGSTurnover();

  }

  if (flags.GA) {

    gaTurnoverCount++;

    updateGATurnover();

  }

  if (flags.WA) {

    waTurnoverCount++;

    updateWATurnover();

  }

  if (flags.C) {

    cTurnoverCount++;

    updateCTurnover();

  }

  if (flags.WD) {

    wdTurnoverCount++;

    updateWDTurnover();

  }

  if (flags.GD) {

    gdTurnoverCount++;

    updateGDTurnover();

  }

  if (flags.GK) {

    gkTurnoverCount++;

    updateGKTurnover();

  }

  if (flags.S1) {

    s1TurnoverCount++;

    updateS1Turnover();

  }

  if (flags.S2) {

    s2TurnoverCount++;

    updateS2Turnover();

  }

  if (flags.S3) {

    s3TurnoverCount++;

    updateS3Turnover();

  }

  if (flags.S4) {

    s4TurnoverCount++;

    updateS4Turnover();

  }

  if (flags.S5) {

    s5TurnoverCount++;

    updateS5Turnover();

  }

  eventFeed.innerHTML =
    `<div class="turnover-event">${matchClock.textContent} - ${playerPrefix}TURNOVER</div>` +
    eventFeed.innerHTML;


  clearPlayerSelection();

}

        if (
    button.id ===
    "level1-unforced-error"
) {

    unforcedErrorCount++;

    updateUnforcedError();


    if (flags.GS) {

        gsUnforcedErrorCount++;

        updateGSUnforcedError();

    }


    if (flags.GA) {

        gaUnforcedErrorCount++;

        updateGAUnforcedError();

    }


    if (flags.WA) {

        waUnforcedErrorCount++;

        updateWAUnforcedError();

    }


    if (flags.C) {

        cUnforcedErrorCount++;

        updateCUnforcedError();

    }


    if (flags.WD) {

        wdUnforcedErrorCount++;

        updateWDUnforcedError();

    }


    if (flags.GD) {

        gdUnforcedErrorCount++;

        updateGDUnforcedError();

    }


    if (flags.GK) {

        gkUnforcedErrorCount++;

        updateGKUnforcedError();

    }


    if (flags.S1) {

        s1UnforcedErrorCount++;

        updateS1UnforcedError();

    }


    if (flags.S2) {

        s2UnforcedErrorCount++;

        updateS2UnforcedError();

    }


    if (flags.S3) {

        s3UnforcedErrorCount++;

        updateS3UnforcedError();

    }


    if (flags.S4) {

        s4UnforcedErrorCount++;

        updateS4UnforcedError();

    }


    if (flags.S5) {

        s5UnforcedErrorCount++;

        updateS5UnforcedError();

    }


    eventFeed.innerHTML =
        `<div class="unforced-error-event">${matchClock.textContent} - ${playerPrefix}UNFORCED ERROR</div>` +
        eventFeed.innerHTML;


    clearPlayerSelection();

}


                // ==================================================
// DEFENCE REBOUND WON
// ==================================================

if (
  button.id ===
  "level1-defence-rebound-won"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );

  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;

  if (
    activeToggle &&
    (
      toggleIndex < 0 ||
      toggleIndex > 11
    )
  ) {
    return;
  }

  if (activeToggle) {

    const toggleIdentity =
      activeToggle.id;

    if (toggleIdentity === "gs-toggle") {
      gsDReboundWon++;
      updateGSDReboundPercentage();
    }

    if (toggleIdentity === "ga-toggle") {
      gaDReboundWon++;
      updateGADReboundPercentage();
    }

    if (toggleIdentity === "wa-toggle") {
      waDReboundWon++;
      updateWADReboundPercentage();
    }

    if (toggleIdentity === "c-toggle") {
      cDReboundWon++;
      updateCDReboundPercentage();
    }

    if (toggleIdentity === "wd-toggle") {
      wdDReboundWon++;
      updateWDDReboundPercentage();
    }

    if (toggleIdentity === "gd-toggle") {
      gdDReboundWon++;
      updateGDDReboundPercentage();
    }

    if (toggleIdentity === "gk-toggle") {
      gkDReboundWon++;
      updateGKDReboundPercentage();
    }

    if (toggleIdentity === "S1-toggle") {
      s1DReboundWon++;
      updateS1DReboundPercentage();
    }

    if (toggleIdentity === "S2-toggle") {
      s2DReboundWon++;
      updateS2DReboundPercentage();
    }

    if (toggleIdentity === "S3-toggle") {
      s3DReboundWon++;
      updateS3DReboundPercentage();
    }

    if (toggleIdentity === "S4-toggle") {
      s4DReboundWon++;
      updateS4DReboundPercentage();
    }

    if (toggleIdentity === "S5-toggle") {
      s5DReboundWon++;
      updateS5DReboundPercentage();
    }

  }

  updateDefenceReboundPercentage();

  eventFeed.innerHTML =
    `<div class="defence-rebound-won-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND WON</div>` +
    eventFeed.innerHTML;

  clearPlayerSelection();

}


        
// ==================================================
// DEFENCE REBOUND LOST
// ==================================================

if (
  button.id ===
  "level1-defence-rebound-lost"
) {

  const activeToggle =
    document.querySelector(
      ".player-toggle.active"
    );

  const toggleIndex =
    activeToggle
      ? Array.from(
          playerToggles
        ).indexOf(
          activeToggle
        )
      : -1;

  if (
    activeToggle &&
    (
      toggleIndex < 0 ||
      toggleIndex > 11
    )
  ) {
    return;
  }

  if (activeToggle) {

    const toggleIdentity =
      activeToggle.id;

    if (toggleIdentity === "gs-toggle") {
      gsDReboundLost++;
      updateGSDReboundPercentage();
    }

    if (toggleIdentity === "ga-toggle") {
      gaDReboundLost++;
      updateGADReboundPercentage();
    }

    if (toggleIdentity === "wa-toggle") {
      waDReboundLost++;
      updateWADReboundPercentage();
    }

    if (toggleIdentity === "c-toggle") {
      cDReboundLost++;
      updateCDReboundPercentage();
    }

    if (toggleIdentity === "wd-toggle") {
      wdDReboundLost++;
      updateWDDReboundPercentage();
    }

    if (toggleIdentity === "gd-toggle") {
      gdDReboundLost++;
      updateGDDReboundPercentage();
    }

    if (toggleIdentity === "gk-toggle") {
      gkDReboundLost++;
      updateGKDReboundPercentage();
    }

    if (toggleIdentity === "S1-toggle") {
      s1DReboundLost++;
      updateS1DReboundPercentage();
    }

    if (toggleIdentity === "S2-toggle") {
      s2DReboundLost++;
      updateS2DReboundPercentage();
    }

    if (toggleIdentity === "S3-toggle") {
      s3DReboundLost++;
      updateS3DReboundPercentage();
    }

    if (toggleIdentity === "S4-toggle") {
      s4DReboundLost++;
      updateS4DReboundPercentage();
    }

    if (toggleIdentity === "S5-toggle") {
      s5DReboundLost++;
      updateS5DReboundPercentage();
    }

  }

  updateDefenceReboundPercentage();

  eventFeed.innerHTML =
    `<div class="defence-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND LOST</div>` +
    eventFeed.innerHTML;

  clearPlayerSelection();

}



    // ======================================================
  // CLEAR LAST
  // ======================================================

  }
  );

});


clearLastButton.addEventListener(
  "click",
  undoLastAction
);


// ======================================================
// PDF MATCH REPORT DOWNLOAD
// ======================================================

const downloadMatchReportButton =
  document.getElementById(
    "download-match-report"
  );


if (downloadMatchReportButton) {

  downloadMatchReportButton.addEventListener(
    "click",
    async () => {

      const originalButtonText =
        downloadMatchReportButton.textContent;

      let exportClone = null;


      try {

        downloadMatchReportButton.disabled = true;

        downloadMatchReportButton.textContent =
          "GENERATING PDF...";


        // Check PDF libraries

        if (
          typeof html2canvas === "undefined" ||
          !window.jspdf
        ) {

          throw new Error(
            "PDF libraries have not loaded."
          );

        }


        // Wait for fonts to finish loading

        await document.fonts.ready;


        // Find the main page container

        const liveContainer =
          document.querySelector(".container");


        if (!liveContainer) {

          throw new Error(
            "Could not find the main container."
          );

        }


        // Make a temporary copy of the page

        exportClone =
          liveContainer.cloneNode(true);

          exportClone.classList.add("pdf-export");


        // Keep the copy at the same width as the live page

        const originalWidth =
          liveContainer.getBoundingClientRect().width;


        exportClone.style.position =
          "absolute";

        exportClone.style.left =
          "-100000px";

        exportClone.style.top =
          "0";

        exportClone.style.width =
          originalWidth + "px";

        exportClone.style.maxWidth =
          "none";

        exportClone.style.margin =
          "0";

        exportClone.style.transform =
          "none";

        exportClone.style.zIndex =
          "-1";


        document.body.appendChild(
          exportClone
        );


        // Remove the download button from the PDF copy

        const copiedDownloadButton =
          exportClone.querySelector(
            "#download-match-report"
          );

        if (copiedDownloadButton) {

          copiedDownloadButton.remove();

        }


        // Find every report container

        const reportSelectors = [

          ".match-report-box",

          ".gs-box",

          ".ga-box",

          ".wa-box",

          ".c-box",

          ".wd-box",

          ".gd-box",

          ".gk-box",

          ".s1-box",

          ".s2-box",

          ".s3-box",

          ".s4-box",

          ".s5-box"

        ];


        const reportBoxes =
          reportSelectors
            .map((selector) =>
              exportClone.querySelector(selector)
            )
            .filter(Boolean);


        // Make every copied report visible

        reportBoxes.forEach((box) => {

          box.style.setProperty(
            "display",
            "block",
            "important"
          );

          box.style.setProperty(
            "visibility",
            "visible",
            "important"
          );

          box.style.setProperty(
            "opacity",
            "1",
            "important"
          );

        });


        // Allow the browser to render the copied containers

        await new Promise((resolve) => {

          requestAnimationFrame(() => {

            requestAnimationFrame(resolve);

          });

        });


        // Create the PDF

        const { jsPDF } =
          window.jspdf;

        let pdf = null;


        // Capture each container separately

        for (
          let i = 0;
          i < reportBoxes.length;
          i++
        ) {

          const canvas =
            await html2canvas(
              reportBoxes[i],
              {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
                logging: false
              }
            );


          // Keep the original proportions

          const pageWidth =
            (canvas.width / 2) * 0.75;

          const pageHeight =
            (canvas.height / 2) * 0.75;


          const orientation =
            pageWidth > pageHeight
              ? "landscape"
              : "portrait";


          if (!pdf) {

            pdf = new jsPDF({

              orientation: orientation,

              unit: "pt",

              format: [
                pageWidth,
                pageHeight
              ],

              compress: true

            });

          } else {

            pdf.addPage(
              [
                pageWidth,
                pageHeight
              ],
              orientation
            );

          }


          // Add the container image to the page

          const imageData =
            canvas.toDataURL("image/png");


          pdf.addImage(
            imageData,
            "PNG",
            0,
            0,
            pageWidth,
            pageHeight
          );

        }


        // Download the PDF

        const teamFileName =
          (teamName.textContent.trim() || "Match")
            .replace(/[^a-z0-9_-]/gi, "_");


        pdf.save(
          teamFileName + "_Match_Report.pdf"
        );


      } catch (error) {

        console.error(
          "PDF export error:",
          error
        );

        alert(
          "There was a problem creating the PDF. Please check the browser console."
        );

      } finally {

        // Remove the temporary copy

        if (exportClone) {

          exportClone.remove();

        }


        // Restore the download button

        downloadMatchReportButton.disabled =
          false;

        downloadMatchReportButton.textContent =
          originalButtonText;

      }

    }
  );

}


});

