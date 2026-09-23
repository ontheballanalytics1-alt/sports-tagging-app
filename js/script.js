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
  // PLAYER TOGGLES
  // ======================================================

  const gsToggle =
    document.getElementById(
      "gs-toggle"
    );

  const playerLock =
    document.getElementById(
      "player-lock-toggle"
    );

  const gsName =
    document.getElementById(
      "gs-name"
    );


  if (gsName && gsToggle) {

    gsName.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          event.preventDefault();

          gsName.blur();

        }

      }
    );


    gsName.addEventListener(
      "input",
      () => {

        gsToggle.textContent =
          gsName.textContent.trim() ||
          "GS";

      }
    );

  }


  const playerToggles =
    document.querySelectorAll(
      ".player-toggle"
    );


  let selectedPlayer = null;


  playerToggles.forEach((toggle) => {

    toggle.addEventListener(
      "click",
      () => {

        // ----------------------------------------------
        // LOCKED
        // ----------------------------------------------

        if (
          playerLock &&
          playerLock.classList.contains(
            "locked"
          )
        ) {

          const togglesArray =
            Array.from(
              playerToggles
            );

          const toggleIndex =
            togglesArray.indexOf(
              toggle
            );


          if (
            toggleIndex >= 7 &&
            !toggle.classList.contains(
              "active"
            )
          ) {

            return;

          }


          if (
            toggle.classList.contains(
              "active"
            )
          ) {

            toggle.classList.remove(
              "active"
            );

          } else {

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


          return;

        }


        // ----------------------------------------------
        // UNLOCKED
        // ----------------------------------------------

        if (
          selectedPlayer === null
        ) {

          const togglesArray =
            Array.from(
              playerToggles
            );

          const toggleIndex =
            togglesArray.indexOf(
              toggle
            );


          if (
            toggleIndex >= 7 &&
            !toggle.classList.contains(
              "active"
            )
          ) {

            return;

          }


          toggle.classList.add(
            "active"
          );


          selectedPlayer =
            toggle;


          return;

        }


        // ----------------------------------------------
        // SAME PLAYER
        // ----------------------------------------------

        if (
          selectedPlayer === toggle
        ) {

          toggle.classList.remove(
            "active"
          );

          selectedPlayer = null;

          return;

        }


        // SWAP PLAYER NAMES

const tempText =
  selectedPlayer.textContent;

selectedPlayer.textContent =
  toggle.textContent;

toggle.textContent =
  tempText;

const tempId =
  selectedPlayer.id;

selectedPlayer.id =
  toggle.id;

toggle.id =
  tempId;


        const togglesArray =
          Array.from(
            playerToggles
          );


        const selectedIndex =
          togglesArray.indexOf(
            selectedPlayer
          );

        const toggleIndex =
          togglesArray.indexOf(
            toggle
          );


        selectedPlayer.classList.toggle(
          "off-court",
          selectedIndex >= 7
        );

        toggle.classList.toggle(
          "off-court",
          toggleIndex >= 7
        );


        selectedPlayer.classList.remove(
          "active"
        );

        toggle.classList.remove(
          "active"
        );


        selectedPlayer = null;

      }
    );

  });


  // ======================================================
  // PLAYER LOCK
  // ======================================================

  if (playerLock) {

    playerLock.addEventListener(
      "click",
      () => {

        playerLock.classList.toggle(
          "locked"
        );

      }
    );

  }


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


  function updateTeamScore() {

    teamScoreText.textContent =
      teamScore;

  }


  function updateOppositionScore() {

    oppositionScoreText.textContent =
      oppositionScore;

  }


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


    if (total === 0) {

      shotPercentageText.textContent =
        "0%";

      shotProgressFill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (scored / total) * 100
      );


    shotPercentageText.textContent =
      percentage + "%";

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

      text.textContent =
        "0%";

      fill.style.width =
        "0%";

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


  function updateAllPlayerShotPercentages() {

    updatePlayerShotPercentage(
      gsShotSuccess,
      gsShotMissed,
      "#gs-shot-percentage",
      "#gs-shot-fill"
    );

    updatePlayerShotPercentage(
      gaShotSuccess,
      gaShotMissed,
      "#ga-shot-percentage",
      "#ga-shot-fill"
    );

    updatePlayerShotPercentage(
      waShotSuccess,
      waShotMissed,
      "#wa-shot-percentage",
      "#wa-shot-fill"
    );

    updatePlayerShotPercentage(
      cShotSuccess,
      cShotMissed,
      "#c-shot-percentage",
      "#c-shot-fill"
    );

    updatePlayerShotPercentage(
      wdShotSuccess,
      wdShotMissed,
      "#wd-shot-percentage",
      "#wd-shot-fill"
    );

    updatePlayerShotPercentage(
      gdShotSuccess,
      gdShotMissed,
      "#gd-shot-percentage",
      "#gd-shot-fill"
    );

    updatePlayerShotPercentage(
      gkShotSuccess,
      gkShotMissed,
      "#gk-shot-percentage",
      "#gk-shot-fill"
    );

    updatePlayerShotPercentage(
      s1ShotSuccess,
      s1ShotMissed,
      "#s1-shot-percentage",
      "#s1-shot-fill"
    );

    updatePlayerShotPercentage(
      s2ShotSuccess,
      s2ShotMissed,
      "#s2-shot-percentage",
      "#s2-shot-fill"
    );

    updatePlayerShotPercentage(
      s3ShotSuccess,
      s3ShotMissed,
      "#s3-shot-percentage",
      "#s3-shot-fill"
    );

    updatePlayerShotPercentage(
      s4ShotSuccess,
      s4ShotMissed,
      "#s4-shot-percentage",
      "#s4-shot-fill"
    );

    updatePlayerShotPercentage(
      s5ShotSuccess,
      s5ShotMissed,
      "#s5-shot-percentage",
      "#s5-shot-fill"
    );

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


    if (total === 0) {

      reboundText.textContent =
        "0%";

      reboundFill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (won / total) * 100
      );


    reboundText.textContent =
      percentage + "%";

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

    updatePlayerReboundPercentage(
      gsReboundWon,
      gsReboundLost,
      "#gs-attack-rebound-percentage",
      "#gs-attack-rebound-fill"
    );

  }


  function updateGAAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      gaReboundWon,
      gaReboundLost,
      "#ga-attack-rebound-percentage",
      "#ga-attack-rebound-fill"
    );

  }


  function updateWAAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      waReboundWon,
      waReboundLost,
      "#wa-attack-rebound-percentage",
      "#wa-attack-rebound-fill"
    );

  }


  function updateCAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      cReboundWon,
      cReboundLost,
      "#c-attack-rebound-percentage",
      "#c-attack-rebound-fill"
    );

  }

    function updateWDAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      wdReboundWon,
      wdReboundLost,
      "#wd-attack-rebound-percentage",
      "#wd-attack-rebound-fill"
    );

  }

  function updateGDAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      gdReboundWon,
      gdReboundLost,
      "#gd-attack-rebound-percentage",
      "#gd-attack-rebound-fill"
    );

  }

  function updateGKAttackReboundPercentage() {

    updatePlayerReboundPercentage(
      gkReboundWon,
      gkReboundLost,
      "#gk-attack-rebound-percentage",
      "#gk-attack-rebound-fill"
    );

  }

  function updateS1AttackReboundPercentage() {

    updatePlayerReboundPercentage(
      s1ReboundWon,
      s1ReboundLost,
      "#s1-attack-rebound-percentage",
      "#s1-attack-rebound-fill"
    );

  }

  function updateS2AttackReboundPercentage() {

    updatePlayerReboundPercentage(
      s2ReboundWon,
      s2ReboundLost,
      "#s2-attack-rebound-percentage",
      "#s2-attack-rebound-fill"
    );

  }

  function updateS3AttackReboundPercentage() {

    updatePlayerReboundPercentage(
      s3ReboundWon,
      s3ReboundLost,
      "#s3-attack-rebound-percentage",
      "#s3-attack-rebound-fill"
    );

  }

  function updateS4AttackReboundPercentage() {

    updatePlayerReboundPercentage(
      s4ReboundWon,
      s4ReboundLost,
      "#s4-attack-rebound-percentage",
      "#s4-attack-rebound-fill"
    );

  }

  function updateS5AttackReboundPercentage() {

    updatePlayerReboundPercentage(
      s5ReboundWon,
      s5ReboundLost,
      "#s5-attack-rebound-percentage",
      "#s5-attack-rebound-fill"
    );

  }

  function updatePlayerReboundCounter(
  player,
  result
) {

  if (player === "GS") {

    if (result === "won") {
      gsReboundWon++;
    } else {
      gsReboundLost++;
    }

  }

  if (player === "GA") {

    if (result === "won") {
      gaReboundWon++;
    } else {
      gaReboundLost++;
    }

  }

  if (player === "WA") {

    if (result === "won") {
      waReboundWon++;
    } else {
      waReboundLost++;
    }

  }

  if (player === "C") {

    if (result === "won") {
      cReboundWon++;
    } else {
      cReboundLost++;
    }

  }

  if (player === "WD") {

    if (result === "won") {
      wdReboundWon++;
    } else {
      wdReboundLost++;
    }

  }

  if (player === "GD") {

    if (result === "won") {
      gdReboundWon++;
    } else {
      gdReboundLost++;
    }

  }

  if (player === "GK") {

    if (result === "won") {
      gkReboundWon++;
    } else {
      gkReboundLost++;
    }

  }

  if (player === "S1") {

    if (result === "won") {
      s1ReboundWon++;
    } else {
      s1ReboundLost++;
    }

  }

  if (player === "S2") {

    if (result === "won") {
      s2ReboundWon++;
    } else {
      s2ReboundLost++;
    }

  }

  if (player === "S3") {

    if (result === "won") {
      s3ReboundWon++;
    } else {
      s3ReboundLost++;
    }

  }

  if (player === "S4") {

    if (result === "won") {
      s4ReboundWon++;
    } else {
      s4ReboundLost++;
    }

  }

  if (player === "S5") {

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


    if (total === 0) {

      feedText.textContent =
        "0%";

      feedFill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (won / total) * 100
      );


    feedText.textContent =
      percentage + "%";

    feedFill.style.width =
      percentage + "%";

  }


  // ------------------------------------------------------
  // GENERIC PLAYER FEED %
  // ------------------------------------------------------

  function updatePlayerFeedPercentage(
    success,
    fail,
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
      success + fail;


    if (total === 0) {

      text.textContent =
        "0%";

      fill.style.width =
        "0%";

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


  // ------------------------------------------------------
  // GS FEED %
  // ------------------------------------------------------

  function updateGSFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      gsFeedSuccess,
      gsFeedMissed,
      "#gs-feed-success-percentage",
      "#gs-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // GA FEED %
  // ------------------------------------------------------

  function updateGAFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      gaFeedSuccess,
      gaFeedMissed,
      "#ga-feed-success-percentage",
      "#ga-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // WA FEED %
  // ------------------------------------------------------

  function updateWAFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      waFeedSuccess,
      waFeedMissed,
      "#wa-feed-success-percentage",
      "#wa-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // C FEED %
  // ------------------------------------------------------

  function updateCFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      cFeedSuccess,
      cFeedMissed,
      "#c-feed-success-percentage",
      "#c-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // WD FEED %
  // ------------------------------------------------------

  function updateWDFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      wdFeedSuccess,
      wdFeedMissed,
      "#wd-feed-success-percentage",
      "#wd-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // GD FEED %
  // ------------------------------------------------------

  function updateGDFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      gdFeedSuccess,
      gdFeedMissed,
      "#gd-feed-success-percentage",
      "#gd-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // GK FEED %
  // ------------------------------------------------------

  function updateGKFeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      gkFeedSuccess,
      gkFeedMissed,
      "#gk-feed-success-percentage",
      "#gk-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // S1 FEED %
  // ------------------------------------------------------

  function updateS1FeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      s1FeedSuccess,
      s1FeedMissed,
      "#s1-feed-success-percentage",
      "#s1-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // S2 FEED %
  // ------------------------------------------------------

  function updateS2FeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      s2FeedSuccess,
      s2FeedMissed,
      "#s2-feed-success-percentage",
      "#s2-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // S3 FEED %
  // ------------------------------------------------------

  function updateS3FeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      s3FeedSuccess,
      s3FeedMissed,
      "#s3-feed-success-percentage",
      "#s3-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // S4 FEED %
  // ------------------------------------------------------

  function updateS4FeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      s4FeedSuccess,
      s4FeedMissed,
      "#s4-feed-success-percentage",
      "#s4-feed-success-fill"
    );

  }


  // ------------------------------------------------------
  // S5 FEED %
  // ------------------------------------------------------

  function updateS5FeedSuccessPercentage() {

    updatePlayerFeedPercentage(
      s5FeedSuccess,
      s5FeedMissed,
      "#s5-feed-success-percentage",
      "#s5-feed-success-fill"
    );

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


    if (total === 0) {

      centreText.textContent =
        "0%";

      centreFill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (won / total) * 100
      );


    centreText.textContent =
      percentage + "%";

    centreFill.style.width =
      percentage + "%";

  }


  function updateGSCentreSuccessPercentage() {

    updatePlayerFeedPercentage(
      gsCentreSuccess,
      gsCentreMissed,
      "#gs-centre-success-percentage",
      "#gs-centre-success-fill"
    );

  }


  // ------------------------------------------------------
  // GA CENTRE %
  // ------------------------------------------------------

  function updateGACentreSuccessPercentage() {

    updatePlayerFeedPercentage(
      gaCentreSuccess,
      gaCentreMissed,
      "#ga-centre-success-percentage",
      "#ga-centre-success-fill"
    );

  }


  // ------------------------------------------------------
  // WA CENTRE %
  // ------------------------------------------------------

  function updateWACentreSuccessPercentage() {

    updatePlayerFeedPercentage(
      waCentreSuccess,
      waCentreMissed,
      "#wa-centre-success-percentage",
      "#wa-centre-success-fill"
    );

  }

  // ------------------------------------------------------
// C CENTRE %
// ------------------------------------------------------

function updateCCentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    cCentreSuccess,
    cCentreMissed,
    "#c-centre-success-percentage",
    "#c-centre-success-fill"
  );

}

function updateWDCentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    wdCentreSuccess,
    wdCentreMissed,
    "#wd-centre-success-percentage",
    "#wd-centre-success-fill"
  );

}

function updateGDCentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    gdCentreSuccess,
    gdCentreMissed,
    "#gd-centre-success-percentage",
    "#gd-centre-success-fill"
  );

}

function updateGKCentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    gkCentreSuccess,
    gkCentreMissed,
    "#gk-centre-success-percentage",
    "#gk-centre-success-fill"
  );

}

function updateS1CentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    s1CentreSuccess,
    s1CentreMissed,
    "#s1-centre-success-percentage",
    "#s1-centre-success-fill"
  );

}

function updateS2CentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    s2CentreSuccess,
    s2CentreMissed,
    "#s2-centre-success-percentage",
    "#s2-centre-success-fill"
  );

}

function updateS3CentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    s3CentreSuccess,
    s3CentreMissed,
    "#s3-centre-success-percentage",
    "#s3-centre-success-fill"
  );

}

function updateS4CentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    s4CentreSuccess,
    s4CentreMissed,
    "#s4-centre-success-percentage",
    "#s4-centre-success-fill"
  );

}

function updateS5CentreSuccessPercentage() {

  updatePlayerFeedPercentage(
    s5CentreSuccess,
    s5CentreMissed,
    "#s5-centre-success-percentage",
    "#s5-centre-success-fill"
  );

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
  let gdDReboundWon = 0;
  let gdDReboundLost = 0;


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


    if (total === 0) {

      lvl1dreboundText.textContent =
        "0%";

      lvl1dreboundFill.style.width =
        "0%";

      return;

    }


    const percentage =
      Math.round(
        (won / total) * 100
      );


    lvl1dreboundText.textContent =
      percentage + "%";

    lvl1dreboundFill.style.width =
      percentage + "%";

  }


  function updateGSDReboundPercentage() {

    updatePlayerFeedPercentage(
      gsDReboundWon,
      gsDReboundLost,
      "#gs-defence-rebound-percentage",
      "#gs-defence-rebound-fill"
    );

  }

  function updateGDDReboundPercentage() {
  updatePlayerReboundPercentage(
    gdDReboundWon,
    gdDReboundLost,
    "#gd-defence-rebound-percentage",
    "#gd-defence-rebound-fill"
  );
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

    if (gsToggle) {

      gsToggle.classList.remove(
        "active"
      );

    }


    const activePlayer =
      document.querySelector(
        ".player-toggle.active"
      );


    if (activePlayer) {

      activePlayer.classList.remove(
        "active"
      );

    }


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


  if (lastAction.player === "GS")
    gsReboundWon =
      Math.max(
        0,
        gsReboundWon - 1
      );

  if (lastAction.player === "GA")
    gaReboundWon =
      Math.max(
        0,
        gaReboundWon - 1
      );

  if (lastAction.player === "WA")
    waReboundWon =
      Math.max(
        0,
        waReboundWon - 1
      );

  if (lastAction.player === "C")
    cReboundWon =
      Math.max(
        0,
        cReboundWon - 1
      );

  if (lastAction.player === "WD")
    wdReboundWon =
      Math.max(
        0,
        wdReboundWon - 1
      );

  if (lastAction.player === "GD")
    gdReboundWon =
      Math.max(
        0,
        gdReboundWon - 1
      );

  if (lastAction.player === "GK")
    gkReboundWon =
      Math.max(
        0,
        gkReboundWon - 1
      );

  if (lastAction.player === "S1")
    s1ReboundWon =
      Math.max(
        0,
        s1ReboundWon - 1
      );

  if (lastAction.player === "S2")
    s2ReboundWon =
      Math.max(
        0,
        s2ReboundWon - 1
      );

  if (lastAction.player === "S3")
    s3ReboundWon =
      Math.max(
        0,
        s3ReboundWon - 1
      );

  if (lastAction.player === "S4")
    s4ReboundWon =
      Math.max(
        0,
        s4ReboundWon - 1
      );

  if (lastAction.player === "S5")
    s5ReboundWon =
      Math.max(
        0,
        s5ReboundWon - 1
      );

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


        if (lastAction.player === "GS")
          gsReboundLost =
            Math.max(
              0,
              gsReboundLost - 1
            );

        if (lastAction.player === "GA")
          gaReboundLost =
            Math.max(
              0,
              gaReboundLost - 1
            );

        if (lastAction.player === "WA")
          waReboundLost =
            Math.max(
              0,
              waReboundLost - 1
            );

        if (lastAction.player === "C")
          cReboundLost =
            Math.max(
              0,
              cReboundLost - 1
            );

        if (lastAction.player === "WD")
          wdReboundLost =
            Math.max(
              0,
              wdReboundLost - 1
            );

        if (lastAction.player === "GD")
          gdReboundLost =
            Math.max(
              0,
              gdReboundLost - 1
            );

        if (lastAction.player === "GK")
          gkReboundLost =
            Math.max(
              0,
              gkReboundLost - 1
            );

        if (lastAction.player === "S1")
          s1ReboundLost =
            Math.max(
              0,
              s1ReboundLost - 1
            );

        if (lastAction.player === "S2")
          s2ReboundLost =
            Math.max(
              0,
              s2ReboundLost - 1
            );

        if (lastAction.player === "S3")
          s3ReboundLost =
            Math.max(
              0,
              s3ReboundLost - 1
            );

        if (lastAction.player === "S4")
          s4ReboundLost =
            Math.max(
              0,
              s4ReboundLost - 1
            );

        if (lastAction.player === "S5")
          s5ReboundLost =
            Math.max(
              0,
              s5ReboundLost - 1
            );

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


        if (lastAction.GS) {

          gsDReboundWon =
            Math.max(
              0,
              gsDReboundWon - 1
            );

        }

        if (lastAction.GD) {

          gdDReboundWon =
            Math.max(
              0,
              gdDReboundWon - 1
            );

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


        if (lastAction.GS) {

          gsDReboundLost =
            Math.max(
              0,
              gsDReboundLost - 1
            );

        }

        if (lastAction.GD) {

          gdDReboundLost =
            Math.max(
              0,
              gdDReboundLost - 1
            );

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
    updateGDDReboundPercentage();

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


  // ======================================================
// MAIN BUTTON HANDLERS
// ======================================================

buttons.forEach((button) => {

  const counter =
    button.querySelector(
      ".counter"
    );


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
    toggleIndex !== 3
  ) {
    return;
  }

}


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
    toggleIndex !== 1
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
  toggleIndex !== 5 &&
  toggleIndex !== 6
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
          toggleIndex !== 1
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
    toggleIndex !== 3
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


        // ==================================================
        // HISTORY
        // ==================================================

        history.push({
          button: button.id,
          time: matchClock.textContent,
          player: player,
          ...flags
        });


        // ==================================================
        // BUTTON COUNTER
        // ==================================================

        counter.textContent =
          Number(
            counter.textContent
          ) + 1;


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
  toggleIndex === 1
) {

    teamScore++;

    updateTeamScore();

    if (
  activeToggle &&
  activeToggle.textContent.trim() === "GS"
)
  gsShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "GA"
)
  gaShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "WA"
)
  waShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "C"
)
  cShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "WD"
)
  wdShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "GD"
)
  gdShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "GK"
)
  gkShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "S1"
)
  s1ShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "S2"
)
  s2ShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "S3"
)
  s3ShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "S4"
)
  s4ShotSuccess++;

if (
  activeToggle &&
  activeToggle.textContent.trim() === "S5"
)
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


  if (
    activeToggle &&
    activeToggle.textContent.trim() === "GS"
  )
    gsShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "GA"
  )
    gaShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "WA"
  )
    waShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "C"
  )
    cShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "WD"
  )
    wdShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "GD"
  )
    gdShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "GK"
  )
    gkShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "S1"
  )
    s1ShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "S2"
  )
    s2ShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "S3"
  )
    s3ShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "S4"
  )
    s4ShotMissed++;

  if (
    activeToggle &&
    activeToggle.textContent.trim() === "S5"
  )
    s5ShotMissed++;


  updateShotPercentage();

  updateAllPlayerShotPercentages();


  const shotPlayerPrefix =
    activeToggle
      ? activeToggle.textContent.trim() + " "
      : "";


  eventFeed.innerHTML =
    `<div class="shot-missed-event">${matchClock.textContent} - ${shotPlayerPrefix}SHOT MISSED</div>` +
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

  updatePlayerReboundCounter(
    getActivePlayer(),
    "won"
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
    `<div class="attack-rebound-won-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND WON</div>` +
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
  getActivePlayer(),
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
    `<div class="attack-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}ATTACK REBOUND LOST</div>` +
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
    toggleIndex !== 3
  ) {
    return;
  }


  if (activeToggle) {

    const toggleIdentity =
      activeToggle.textContent.trim();


    if (toggleIdentity === "GS") {

      gsCentreSuccess++;

      updateGSCentreSuccessPercentage();

    }


    if (toggleIdentity === "GA") {

      gaCentreSuccess++;

      updateGACentreSuccessPercentage();

    }


    if (toggleIdentity === "WA") {

      waCentreSuccess++;

      updateWACentreSuccessPercentage();

    }


    if (toggleIdentity === "C") {

  cCentreSuccess++;

  updateCCentreSuccessPercentage();

}


if (toggleIdentity === "WD") {

  wdCentreSuccess++;

  updateWDCentreSuccessPercentage();

}


if (toggleIdentity === "GD") {

  gdCentreSuccess++;

  updateGDCentreSuccessPercentage();

}


if (toggleIdentity === "GK") {

  gkCentreSuccess++;

  updateGKCentreSuccessPercentage();

}


if (toggleIdentity === "S1") {

  s1CentreSuccess++;

  updateS1CentreSuccessPercentage();

}


if (toggleIdentity === "S2") {

  s2CentreSuccess++;

  updateS2CentreSuccessPercentage();

}


if (toggleIdentity === "S3") {

  s3CentreSuccess++;

  updateS3CentreSuccessPercentage();

}


if (toggleIdentity === "S4") {

  s4CentreSuccess++;

  updateS4CentreSuccessPercentage();

}


if (toggleIdentity === "S5") {

  s5CentreSuccess++;

  updateS5CentreSuccessPercentage();

}

  }


  updateCentreSuccessPercentage();


eventFeed.innerHTML =
  `<div class="centre-success-event">${matchClock.textContent} - ${playerPrefix}CENTRE SUCCESS</div>` +
  eventFeed.innerHTML;


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
    toggleIndex !== 3
  ) {
    return;
  }


  if (activeToggle) {

    const toggleIdentity =
      activeToggle.textContent.trim();


    if (toggleIdentity === "GS") {

      gsCentreMissed++;

      updateGSCentreSuccessPercentage();

    }


    if (toggleIdentity === "GA") {

      gaCentreMissed++;

      updateGACentreSuccessPercentage();

    }


    if (toggleIdentity === "WA") {

      waCentreMissed++;

      updateWACentreSuccessPercentage();

    }


    if (toggleIdentity === "C") {

  cCentreMissed++;

  updateCCentreSuccessPercentage();

}


if (toggleIdentity === "WD") {

  wdCentreMissed++;

  updateWDCentreSuccessPercentage();

}


if (toggleIdentity === "GD") {

  gdCentreMissed++;

  updateGDCentreSuccessPercentage();

}


if (toggleIdentity === "GK") {

  gkCentreMissed++;

  updateGKCentreSuccessPercentage();

}


if (toggleIdentity === "S1") {

  s1CentreMissed++;

  updateS1CentreSuccessPercentage();

}


if (toggleIdentity === "S2") {

  s2CentreMissed++;

  updateS2CentreSuccessPercentage();

}


if (toggleIdentity === "S3") {

  s3CentreMissed++;

  updateS3CentreSuccessPercentage();

}


if (toggleIdentity === "S4") {

  s4CentreMissed++;

  updateS4CentreSuccessPercentage();

}


if (toggleIdentity === "S5") {

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

          if (flags.GS) {

  gsDReboundWon++;
  updateGSDReboundPercentage();

}

if (flags.GD) {

  gdDReboundWon++;
  updateGDDReboundPercentage();

}


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

          if (flags.GS) {

  gsDReboundLost++;
  updateGSDReboundPercentage();

}

if (flags.GD) {

  gdDReboundLost++;
  updateGDDReboundPercentage();

}


          eventFeed.innerHTML =
            `<div class="defence-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND LOST</div>` +
            eventFeed.innerHTML;


          clearPlayerSelection();

        }


        // ==================================================
        // OPPOSITION SCORE
        // ==================================================

        if (
          button.id ===
          "opposition-score-btn"
        ) {

          oppositionScore++;

          updateOppositionScore();


          eventFeed.innerHTML =
            `<div class="oppo-score-event">${matchClock.textContent} - OPPO SCORE</div>` +
            eventFeed.innerHTML;

        }

      }

    );

  });


  // ======================================================
  // CLEAR LAST
  // ======================================================

  clearLastButton.addEventListener(
    "click",
    undoLastAction
  );

});