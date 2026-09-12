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

  if (Date.now() - lastActivity >= SESSION_TIMEOUT) {
    logoutUser();
    return false;
  }

  return true;
}

function resetIdleTimer() {

  sessionStorage.setItem("lastActivity", Date.now());

  clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    logoutUser();
  }, SESSION_TIMEOUT);
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
  document.addEventListener(eventName, resetIdleTimer);
});

window.addEventListener("pageshow", () => {

  if (!checkLoginSession()) {
    return;
  }

});


const params = new URLSearchParams(window.location.search);
const team = params.get("team");


const teamName =
  document.getElementById("team-name");

const buttonTeamName =
  document.getElementById("button-team-name");


const playerTogglesColumn =
  document.getElementById("player-toggles-column");


const matchReportTab =
  document.getElementById("match-report-tab");

const gsTab =
  document.getElementById("gs-tab");

const gaTab =
  document.getElementById("ga-tab");

const waTab =
  document.getElementById("wa-tab");

const cTab =
  document.getElementById("c-tab");

const wdTab =
  document.getElementById("wd-tab");

const gdTab =
  document.getElementById("gd-tab");

const gkTab =
  document.getElementById("gk-tab");

const s1Tab =
  document.getElementById("S1-tab");

const s2Tab =
  document.getElementById("S2-tab");

const s3Tab =
  document.getElementById("S3-tab");

const s4Tab =
  document.getElementById("S4-tab");

const s5Tab =
  document.getElementById("S5-tab");


const matchReportBox =
  document.querySelector(".match-report-box");

const gsBox =
  document.querySelector(".gs-box");

const gaBox =
  document.querySelector(".ga-box");

const waBox =
  document.querySelector(".wa-box");

const cBox =
  document.querySelector(".c-box");

const wdBox =
  document.querySelector(".wd-box");

const gdBox =
  document.querySelector(".gd-box");

const gkBox =
  document.querySelector(".gk-box");

const s1Box =
  document.querySelector(".s1-box");

const s2Box =
  document.querySelector(".s2-box");

const s3Box =
  document.querySelector(".s3-box");

const s4Box =
  document.querySelector(".s4-box");

const s5Box =
  document.querySelector(".s5-box");


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


const gsToggle =
  document.getElementById("gs-toggle");

const playerLock =
  document.getElementById("player-lock-toggle");

const gsName =
  document.getElementById("gs-name");


gsName.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    event.preventDefault();
    gsName.blur();

  }

});


gsName.addEventListener("input", () => {

  gsToggle.textContent =
    gsName.textContent.trim() || "GS";

});


if (team === "testing") {

  // SHOW ALL TABS

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


  // HIDE ALL PLAYER CONTAINERS FOR NOW

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


  // MATCH REPORT ACTIVE BY DEFAULT

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

    "wd-tab":
      document.querySelector(".wd-box"),

    "gd-tab":
      document.querySelector(".gd-box"),

    "gk-tab":
      document.querySelector(".gk-box"),

    "S1-tab":
      document.querySelector(".s1-box"),

    "S2-tab":
      document.querySelector(".s2-box"),

    "S3-tab":
      document.querySelector(".s3-box"),

    "S4-tab":
      document.querySelector(".s4-box"),

    "S5-tab":
      document.querySelector(".s5-box")

  };


  playerTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

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


      matchReportTab.classList.remove("active");
      gsTab.classList.remove("active");
      gaTab.classList.remove("active");


      playerTabs.forEach((otherTab) => {
        otherTab.classList.remove("active");
      });


      const box =
        playerTabBoxes[tab.id];


      if (box) {
        box.style.display = "block";
      }


      tab.classList.add("active");

    });

  });


  // PLAYER LOCK

  playerLock.addEventListener("click", () => {

    playerLock.classList.toggle("locked");

  });


  // PLAYER TOGGLE CLICK-TO-SWAP

  const playerToggles =
    document.querySelectorAll(".player-toggle");

  let selectedPlayer = null;


  playerToggles.forEach((toggle) => {

  toggle.addEventListener("click", () => {

    // ==========================================
    // LOCKED
    // ==========================================

    if (playerLock.classList.contains("locked")) {

      // POSITIONS 8-12 / OFF-COURT CANNOT BE ACTIVATED
      const playerTogglesArray =
        Array.from(playerToggles);

      const toggleIndex =
        playerTogglesArray.indexOf(toggle);

      if (
        toggleIndex >= 7 &&
        !toggle.classList.contains("active")
      ) {
        return;
      }

      if (toggle.classList.contains("active")) {

        toggle.classList.remove("active");

      } else {

        playerToggles.forEach((otherToggle) => {
          otherToggle.classList.remove("active");
        });

        toggle.classList.add("active");

      }

      return;
    }


    // ==========================================
    // UNLOCKED
    // ==========================================

    if (selectedPlayer === null) {

      // POSITIONS 8-12 / OFF-COURT CANNOT BE ACTIVATED
      const playerTogglesArray =
        Array.from(playerToggles);

      const toggleIndex =
        playerTogglesArray.indexOf(toggle);

      if (
        toggleIndex >= 7 &&
        !toggle.classList.contains("active")
      ) {
        return;
      }

      toggle.classList.add("active");

      selectedPlayer = toggle;

      return;
    }


    if (selectedPlayer === toggle) {

      toggle.classList.remove("active");

      selectedPlayer = null;

      return;
    }


    // ==========================================
    // SWAP PLAYER NAMES
    // ==========================================

    const tempText =
      selectedPlayer.textContent;

    selectedPlayer.textContent =
      toggle.textContent;

    toggle.textContent =
      tempText;


    // SET COLOUR BASED ON TOGGLE POSITION

    const playerTogglesArray =
      Array.from(playerToggles);

    const selectedIndex =
      playerTogglesArray.indexOf(selectedPlayer);

    const toggleIndex =
      playerTogglesArray.indexOf(toggle);


    selectedPlayer.classList.toggle(
      "off-court",
      selectedIndex >= 7
    );

    toggle.classList.toggle(
      "off-court",
      toggleIndex >= 7
    );


    selectedPlayer.classList.remove("active");
    toggle.classList.remove("active");

    selectedPlayer = null;

  });

});

} else {

  // HIDE PLAYER TOGGLES ON CROSSKEYS AND TRIAL

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


const watermarkLogo =
  document.getElementById("watermark-logo");


if (team === "crosskeys") {

  watermarkLogo.src =
    "https://crosskeysnetballclub.co.uk/wp-content/uploads/2023/02/cropped-cropped-cropped-Crosskeys-logo-01-1-1.png";

} else if (team === "trial") {

  watermarkLogo.src =
    "images/trial-logo.png";

}


const buttons =
  document.querySelectorAll(".tag-button");

const clearLastButton =
  document.getElementById("clear-last");


// ======================================================
// CLOCK
// ======================================================

const matchClock =
  document.querySelector("#match-clock");

const startButton =
  document.querySelector("#start-match");


let seconds = 0;
let timer = null;
let running = false;


function updateClock() {

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;


  matchClock.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0");


  seconds++;

}


startButton.addEventListener("click", () => {

  if (!running) {

    timer =
      setInterval(updateClock, 1000);

    running = true;

  } else {

    clearInterval(timer);

    running = false;

  }

});


const restartButton =
  document.querySelector("#clock-restart");


restartButton.addEventListener("click", () => {

  seconds = 0;

  matchClock.textContent =
    "00:00";

});


// ======================================================
// SCORE UPDATE
// ======================================================

let teamScore = 0;
let oppositionScore = 0;

let history = [];


const teamScoreText =
  document.getElementById("team-score");

const oppositionScoreText =
  document.getElementById("opposition-score");

const eventFeed =
  document.getElementById("event-feed");

const oppositionButton =
  document.getElementById("opposition-score-btn");


function scrollGameFeedToBottom() {

  eventFeed.scrollTop =
    eventFeed.scrollHeight;

}


function updateTeamScore() {

  teamScoreText.textContent =
    teamScore;

}


function updateOppositionScore() {

  oppositionScoreText.textContent =
    oppositionScore;

}


// ======================================================
// SHOT SUCCESS
// ======================================================

const shotScoredButton =
  document.querySelector("#level1-attack-shot-success");

const shotMissedButton =
  document.querySelector("#level1-attack-shot-missed");

const shotPercentageText =
  document.querySelector("#level1-shot-percentage");

const shotProgressFill =
  document.querySelector("#level1-progress-fill");


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
// PLAYER SHOT PERCENTAGE FUNCTIONS
// ======================================================

function updatePlayerShotPercentage(
  success,
  missed,
  percentageSelector,
  fillSelector
) {

  const total =
    success + missed;


  const text =
    document.querySelector(
      percentageSelector
    );

  const fill =
    document.querySelector(
      fillSelector
    );


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


function updateGSShotPercentage() {

  updatePlayerShotPercentage(
    gsShotSuccess,
    gsShotMissed,
    "#gs-shot-percentage",
    "#gs-shot-fill"
  );

}


function updateGAShotPercentage() {

  updatePlayerShotPercentage(
    gaShotSuccess,
    gaShotMissed,
    "#ga-shot-percentage",
    "#ga-shot-fill"
  );

}


function updateWAShotPercentage() {

  updatePlayerShotPercentage(
    waShotSuccess,
    waShotMissed,
    "#wa-shot-percentage",
    "#wa-shot-fill"
  );

}


function updateCShotPercentage() {

  updatePlayerShotPercentage(
    cShotSuccess,
    cShotMissed,
    "#c-shot-percentage",
    "#c-shot-fill"
  );

}


function updateWDShotPercentage() {

  updatePlayerShotPercentage(
    wdShotSuccess,
    wdShotMissed,
    "#wd-shot-percentage",
    "#wd-shot-fill"
  );

}


function updateGDShotPercentage() {

  updatePlayerShotPercentage(
    gdShotSuccess,
    gdShotMissed,
    "#gd-shot-percentage",
    "#gd-shot-fill"
  );

}


function updateGKShotPercentage() {

  updatePlayerShotPercentage(
    gkShotSuccess,
    gkShotMissed,
    "#gk-shot-percentage",
    "#gk-shot-fill"
  );

}


function updateS1ShotPercentage() {

  updatePlayerShotPercentage(
    s1ShotSuccess,
    s1ShotMissed,
    "#s1-shot-percentage",
    "#s1-shot-fill"
  );

}


function updateS2ShotPercentage() {

  updatePlayerShotPercentage(
    s2ShotSuccess,
    s2ShotMissed,
    "#s2-shot-percentage",
    "#s2-shot-fill"
  );

}


function updateS3ShotPercentage() {

  updatePlayerShotPercentage(
    s3ShotSuccess,
    s3ShotMissed,
    "#s3-shot-percentage",
    "#s3-shot-fill"
  );

}


function updateS4ShotPercentage() {

  updatePlayerShotPercentage(
    s4ShotSuccess,
    s4ShotMissed,
    "#s4-shot-percentage",
    "#s4-shot-fill"
  );

}


function updateS5ShotPercentage() {

  updatePlayerShotPercentage(
    s5ShotSuccess,
    s5ShotMissed,
    "#s5-shot-percentage",
    "#s5-shot-fill"
  );

}


// ======================================================
// UPDATE ALL PLAYER SHOT PERCENTAGES
// ======================================================

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
  document.querySelector("#level1-attack-rebound-won");

const reboundLost =
  document.querySelector("#level1-attack-rebound-lost");

const reboundText =
  document.querySelector("#level1-attack-rebound-percentage");

const reboundFill =
  document.querySelector("#level1-attack-rebound-fill");


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


function updateGSAttackReboundPercentage() {

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


  const gsText =
    document.querySelector(
      "#gs-attack-rebound-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-attack-rebound-fill"
    );


  if (total === 0) {

    gsText.textContent =
      "0%";

    gsFill.style.width =
      "0%";

    return;

  }


  const percentage =
    Math.round(
      (gsReboundWon / total) * 100
    );


  gsText.textContent =
    percentage + "%";


  gsFill.style.width =
    percentage + "%";

}


function updatePlayerReboundCounter(player, result) {

  if (player === "GS") {

    if (result === "won")
      gsReboundWon++;

    if (result === "lost")
      gsReboundLost++;

  } else if (player === "GA") {

    if (result === "won")
      gaReboundWon++;

    if (result === "lost")
      gaReboundLost++;

  } else if (player === "WA") {

    if (result === "won")
      waReboundWon++;

    if (result === "lost")
      waReboundLost++;

  } else if (player === "C") {

    if (result === "won")
      cReboundWon++;

    if (result === "lost")
      cReboundLost++;

  } else if (player === "WD") {

    if (result === "won")
      wdReboundWon++;

    if (result === "lost")
      wdReboundLost++;

  } else if (player === "GD") {

    if (result === "won")
      gdReboundWon++;

    if (result === "lost")
      gdReboundLost++;

  } else if (player === "GK") {

    if (result === "won")
      gkReboundWon++;

    if (result === "lost")
      gkReboundLost++;

  } else if (player === "S1") {

    if (result === "won")
      s1ReboundWon++;

    if (result === "lost")
      s1ReboundLost++;

  } else if (player === "S2") {

    if (result === "won")
      s2ReboundWon++;

    if (result === "lost")
      s2ReboundLost++;

  } else if (player === "S3") {

    if (result === "won")
      s3ReboundWon++;

    if (result === "lost")
      s3ReboundLost++;

  } else if (player === "S4") {

    if (result === "won")
      s4ReboundWon++;

    if (result === "lost")
      s4ReboundLost++;

  } else if (player === "S5") {

    if (result === "won")
      s5ReboundWon++;

    if (result === "lost")
      s5ReboundLost++;

  }

}


// ======================================================
// FEED SUCCESS
// ======================================================

const feedSuccess =
  document.querySelector("#level1-feed-success");

const feedMissed =
  document.querySelector("#level1-feed-missed");

const feedText =
  document.querySelector("#level1-feed-success-percentage");

const feedFill =
  document.querySelector("#level1-feed-success-fill");


let gsFeedSuccess = 0;
let gsFeedMissed = 0;


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


function updateGSFeedSuccessPercentage() {

  const total =
    gsFeedSuccess + gsFeedMissed;


  const gsText =
    document.querySelector(
      "#gs-feed-success-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-feed-success-fill"
    );


  if (total === 0) {

    gsText.textContent =
      "0%";

    gsFill.style.width =
      "0%";

    return;

  }


  const percentage =
    Math.round(
      (gsFeedSuccess / total) * 100
    );


  gsText.textContent =
    percentage + "%";


  gsFill.style.width =
    percentage + "%";

}


// ======================================================
// CENTRE SUCCESS
// ======================================================

const centreSuccess =
  document.querySelector("#level1-centre-success");

const centreMissed =
  document.querySelector("#level1-centre-missed");

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

  const total =
    gsCentreSuccess + gsCentreMissed;


  const gsText =
    document.querySelector(
      "#gs-centre-success-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-centre-success-fill"
    );


  if (total === 0) {

    gsText.textContent =
      "0%";

    gsFill.style.width =
      "0%";

    return;

  }


  const percentage =
    Math.round(
      (gsCentreSuccess / total) * 100
    );


  gsText.textContent =
    percentage + "%";


  gsFill.style.width =
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

  const total =
    gsDReboundWon + gsDReboundLost;


  const gsText =
    document.querySelector(
      "#gs-defence-rebound-percentage"
    );

  const gsFill =
    document.querySelector(
      "#gs-defence-rebound-fill"
    );


  if (total === 0) {

    gsText.textContent =
      "0%";

    gsFill.style.width =
      "0%";

    return;

  }


  const percentage =
    Math.round(
      (gsDReboundWon / total) * 100
    );


  gsText.textContent =
    percentage + "%";


  gsFill.style.width =
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


function updateTurnover() {

  turnoverText.textContent =
    turnoverCount;

  turnoverFill.style.width =
    (turnoverCount / TURNOVER_MAX) *
    100 +
    "%";

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


  gsText.textContent =
    gsTurnoverCount;


  gsFill.style.width =
    (gsTurnoverCount / TURNOVER_MAX) *
    100 +
    "%";

}


// ======================================================
// ATTACK UNFORCED ERROR
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


function updateUnforcedError() {

  unforcedErrorText.textContent =
    unforcedErrorCount;

  unforcedErrorFill.style.width =
    (unforcedErrorCount / UNFORCED_ERROR_MAX) *
    100 +
    "%";

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


  gsText.textContent =
    gsUnforcedErrorCount;


  gsFill.style.width =
    (gsUnforcedErrorCount / UNFORCED_ERROR_MAX) *
    100 +
    "%";

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
    (dunforcedErrorCount / DUNFORCED_ERROR_MAX) *
    100 +
    "%";

}


// ======================================================
// UNDO LAST ACTION
// ======================================================

function undoLastAction() {

  const lastAction =
    history.pop();


  if (!lastAction) return;


  // REMOVE MOST RECENT GAME FEED EVENT

  eventFeed.firstElementChild?.remove();


  switch(lastAction.button) {


    // --------------------------------------------
    // SHOT SCORED
    // --------------------------------------------

    case "level1-attack-shot-success":

      teamScore--;

      updateTeamScore();


      shotScoredButton
        .querySelector(".counter")
        .textContent =
          Number(
            shotScoredButton
              .querySelector(".counter")
              .textContent
          ) - 1;


      // Undo GS shot

      if (lastAction.gs) {
        gsShotSuccess--;
      }


      // Undo GA shot

      if (lastAction.ga) {
        gaShotSuccess--;
      }


      // Undo WA shot

      if (lastAction.wa) {
        waShotSuccess--;
      }


      // Undo C shot

      if (lastAction.c) {
        cShotSuccess--;
      }


      // Undo WD shot

      if (lastAction.wd) {
        wdShotSuccess--;
      }


      // Undo GD shot

      if (lastAction.gd) {
        gdShotSuccess--;
      }


      // Undo GK shot

      if (lastAction.gk) {
        gkShotSuccess--;
      }


      // Undo S1 shot

      if (lastAction.s1) {
        s1ShotSuccess--;
      }


      // Undo S2 shot

      if (lastAction.s2) {
        s2ShotSuccess--;
      }


      // Undo S3 shot

      if (lastAction.s3) {
        s3ShotSuccess--;
      }


      // Undo S4 shot

      if (lastAction.s4) {
        s4ShotSuccess--;
      }


      // Undo S5 shot

      if (lastAction.s5) {
        s5ShotSuccess--;
      }


      break;


    // --------------------------------------------
    // SHOT MISSED
    // --------------------------------------------

    case "level1-attack-shot-missed":

      shotMissedButton
        .querySelector(".counter")
        .textContent =
          Number(
            shotMissedButton
              .querySelector(".counter")
              .textContent
          ) - 1;


      // Undo GS shot missed

      if (lastAction.gs) {
        gsShotMissed--;
      }


      // Undo GA shot missed

      if (lastAction.ga) {
        gaShotMissed--;
      }


      // Undo WA shot missed

      if (lastAction.wa) {
        waShotMissed--;
      }


      // Undo C shot missed

      if (lastAction.c) {
        cShotMissed--;
      }


      // Undo WD shot missed

      if (lastAction.wd) {
        wdShotMissed--;
      }


      // Undo GD shot missed

      if (lastAction.gd) {
        gdShotMissed--;
      }


      // Undo GK shot missed

      if (lastAction.gk) {
        gkShotMissed--;
      }


      // Undo S1 shot missed

      if (lastAction.s1) {
        s1ShotMissed--;
      }


      // Undo S2 shot missed

      if (lastAction.s2) {
        s2ShotMissed--;
      }


      // Undo S3 shot missed

      if (lastAction.s3) {
        s3ShotMissed--;
      }


      // Undo S4 shot missed

      if (lastAction.s4) {
        s4ShotMissed--;
      }


      // Undo S5 shot missed

      if (lastAction.s5) {
        s5ShotMissed--;
      }


      break;


    // --------------------------------------------
    // ATTACK REBOUND WON
    // --------------------------------------------

    case "level1-attack-rebound-won":

      reboundWon
        .querySelector(".counter")
        .textContent =
          Number(
            reboundWon
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsReboundWon--;
      }


      break;


    // --------------------------------------------
    // ATTACK REBOUND LOST
    // --------------------------------------------

    case "level1-attack-rebound-lost":

      reboundLost
        .querySelector(".counter")
        .textContent =
          Number(
            reboundLost
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsReboundLost--;
      }


      break;


    // --------------------------------------------
    // FEED SUCCESS
    // --------------------------------------------

    case "level1-feed-success":

      feedSuccess
        .querySelector(".counter")
        .textContent =
          Number(
            feedSuccess
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsFeedSuccess--;
      }


      break;


    // --------------------------------------------
    // FEED FAIL
    // --------------------------------------------

    case "level1-feed-missed":

      feedMissed
        .querySelector(".counter")
        .textContent =
          Number(
            feedMissed
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsFeedMissed--;
      }


      break;


    // --------------------------------------------
    // CENTRE SUCCESS
    // --------------------------------------------

    case "level1-centre-success":

      centreSuccess
        .querySelector(".counter")
        .textContent =
          Number(
            centreSuccess
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsCentreSuccess--;
      }


      break;


    // --------------------------------------------
    // CENTRE FAIL
    // --------------------------------------------

    case "level1-centre-missed":

      centreMissed
        .querySelector(".counter")
        .textContent =
          Number(
            centreMissed
              .querySelector(".counter")
              .textContent
          ) - 1;


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


      turnoverButton
        .querySelector(".counter")
        .textContent =
          Number(
            turnoverButton
              .querySelector(".counter")
              .textContent
          ) - 1;


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


      unforcedErrorButton
        .querySelector(".counter")
        .textContent =
          Number(
            unforcedErrorButton
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsUnforcedErrorCount--;
      }


      break;


    // --------------------------------------------
    // DEFENSIVE REBOUND WON
    // --------------------------------------------

    case "level1-defence-rebound-won":

      lvl1dreboundwon
        .querySelector(".counter")
        .textContent =
          Number(
            lvl1dreboundwon
              .querySelector(".counter")
              .textContent
          ) - 1;


      if (lastAction.gs) {
        gsDReboundWon--;
      }


      break;


    // --------------------------------------------
    // DEFENSIVE REBOUND LOST
    // --------------------------------------------

    case "level1-defence-rebound-lost":

      lvl1dreboundlost
        .querySelector(".counter")
        .textContent =
          Number(
            lvl1dreboundlost
              .querySelector(".counter")
              .textContent
          ) - 1;


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


      dunforcedErrorButton
        .querySelector(".counter")
        .textContent =
          Number(
            dunforcedErrorButton
              .querySelector(".counter")
              .textContent
          ) - 1;


      break;


    // --------------------------------------------
    // OPPOSITION SCORE
    // --------------------------------------------

    case "opposition-score-btn":

      oppositionScore--;

      updateOppositionScore();


      oppositionButton
        .querySelector(".counter")
        .textContent =
          Number(
            oppositionButton
              .querySelector(".counter")
              .textContent
          ) - 1;


      break;

  }


  // REFRESH ALL STATISTICS

  updateShotPercentage();

  updateAllPlayerShotPercentages();

  updateAttackReboundPercentage();
  updateGSAttackReboundPercentage();

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

  const counter =
    button.querySelector(".counter");


  if (!counter) return;


  button.addEventListener("click", () => {


    // --------------------------------------------
    // RECORD ACTION
    // --------------------------------------------

    const isGS =
      gsToggle.classList.contains("active");


    const activePlayer =
      document.querySelector(
        ".player-toggle.active"
      );


    const activePlayerName =
      activePlayer
        ? activePlayer.textContent.trim()
        : "";


    const isGA =
      activePlayerName === "GA";


    const isWA =
      activePlayerName === "WA";


    const isC =
      activePlayerName === "C";


    const isWD =
      activePlayerName === "WD";


    const isGD =
      activePlayerName === "GD";


    const isGK =
      activePlayerName === "GK";


    const isS1 =
      activePlayerName === "S1";


    const isS2 =
      activePlayerName === "S2";


    const isS3 =
      activePlayerName === "S3";


    const isS4 =
      activePlayerName === "S4";


    const isS5 =
      activePlayerName === "S5";


    counter.textContent =
      Number(counter.textContent) + 1;


    history.push({

      button:
        button.id,

      time:
        matchClock.textContent,

      gs:
        isGS,

      ga:
        isGA,

      wa:
        isWA,

      c:
        isC,

      wd:
        isWD,

      gd:
        isGD,

      gk:
        isGK,

      s1:
        isS1,

      s2:
        isS2,

      s3:
        isS3,

      s4:
        isS4,

      s5:
        isS5

    });


    // REFRESH NORMAL MATCH REPORT

    updateShotPercentage();

    updateAttackReboundPercentage();

    updateFeedSuccessPercentage();
    updateGSFeedSuccessPercentage();

    updateCentreSuccessPercentage();
    updateGSCentreSuccessPercentage();

    updateDefenceReboundPercentage();


    // ==================================================
    // TURNOVER
    // ==================================================

    if (
      button.id ===
      "level1-attack-turnover"
    ) {

      if (
        turnoverCount <
        TURNOVER_MAX
      ) {

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

    if (
      button.id ===
      "level1-unforced-error"
    ) {

      if (
        unforcedErrorCount <
        UNFORCED_ERROR_MAX
      ) {

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

    if (
      button.id ===
      "level1-defence-unforced-error"
    ) {

      if (
        dunforcedErrorCount <
        DUNFORCED_ERROR_MAX
      ) {

        dunforcedErrorCount++;

        updateDunforcedError();

      }

    }


    // ==================================================
    // GAME FEED - SHOT SCORED
    // ==================================================

    if (
      button.id ===
      "level1-attack-shot-success"
    ) {

      teamScore++;

      updateTeamScore();


      // GS

      if (isGS) {

        gsShotSuccess++;

        updateGSShotPercentage();

      }


      // GA

      if (isGA) {

        gaShotSuccess++;

        updateGAShotPercentage();

      }


      // WA

      if (isWA) {

        waShotSuccess++;

        updateWAShotPercentage();

      }


      // C

      if (isC) {

        cShotSuccess++;

        updateCShotPercentage();

      }


      // WD

      if (isWD) {

        wdShotSuccess++;

        updateWDShotPercentage();

      }


      // GD

      if (isGD) {

        gdShotSuccess++;

        updateGDShotPercentage();

      }


      // GK

      if (isGK) {

        gkShotSuccess++;

        updateGKShotPercentage();

      }


      // S1

      if (isS1) {

        s1ShotSuccess++;

        updateS1ShotPercentage();

      }


      // S2

      if (isS2) {

        s2ShotSuccess++;

        updateS2ShotPercentage();

      }


      // S3

      if (isS3) {

        s3ShotSuccess++;

        updateS3ShotPercentage();

      }


      // S4

      if (isS4) {

        s4ShotSuccess++;

        updateS4ShotPercentage();

      }


      // S5

      if (isS5) {

        s5ShotSuccess++;

        updateS5ShotPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : isGA
            ? "GA "
            : isWA
              ? "WA "
              : isC
                ? "C "
                : isWD
                  ? "WD "
                  : isGD
                    ? "GD "
                    : isGK
                      ? "GK "
                      : isS1
                        ? "S1 "
                        : isS2
                          ? "S2 "
                          : isS3
                            ? "S3 "
                            : isS4
                              ? "S4 "
                              : isS5
                                ? "S5 "
                                : "";


      eventFeed.innerHTML =
        `<div class="shot-scored-event">${matchClock.textContent} - ${playerPrefix}SHOT SCORED</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");


      if (activePlayer) {

        activePlayer.classList.remove("active");

      }

    }


    // ==================================================
    // GAME FEED - SHOT MISSED
    // ==================================================

    if (
      button.id ===
      "level1-attack-shot-missed"
    ) {

      if (isGS) {

        gsShotMissed++;

        updateGSShotPercentage();

      }


      if (isGA) {

        gaShotMissed++;

        updateGAShotPercentage();

      }


      if (isWA) {

        waShotMissed++;

        updateWAShotPercentage();

      }


      if (isC) {

        cShotMissed++;

        updateCShotPercentage();

      }


      if (isWD) {

        wdShotMissed++;

        updateWDShotPercentage();

      }


      if (isGD) {

        gdShotMissed++;

        updateGDShotPercentage();

      }


      if (isGK) {

        gkShotMissed++;

        updateGKShotPercentage();

      }


      if (isS1) {

        s1ShotMissed++;

        updateS1ShotPercentage();

      }


      if (isS2) {

        s2ShotMissed++;

        updateS2ShotPercentage();

      }


      if (isS3) {

        s3ShotMissed++;

        updateS3ShotPercentage();

      }


      if (isS4) {

        s4ShotMissed++;

        updateS4ShotPercentage();

      }


      if (isS5) {

        s5ShotMissed++;

        updateS5ShotPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : isGA
            ? "GA "
            : isWA
              ? "WA "
              : isC
                ? "C "
                : isWD
                  ? "WD "
                  : isGD
                    ? "GD "
                    : isGK
                      ? "GK "
                      : isS1
                        ? "S1 "
                        : isS2
                          ? "S2 "
                          : isS3
                            ? "S3 "
                            : isS4
                              ? "S4 "
                              : isS5
                                ? "S5 "
                                : "";


      eventFeed.innerHTML =
        `<div class="shot-missed-event">${matchClock.textContent} - ${playerPrefix}SHOT MISSED</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");


      if (activePlayer) {

        activePlayer.classList.remove("active");

      }

    }


    // ==================================================
    // GAME FEED - ATTACK REBOUND WON
    // ==================================================

    if (
      button.id ===
      "level1-attack-rebound-won"
    ) {

      if (
        gsToggle.classList.contains("active")
      ) {

        updatePlayerReboundCounter(
          "GS",
          "won"
        );

        updateGSAttackReboundPercentage();


        eventFeed.innerHTML =
          `<div class="attack-rebound-won-event">${matchClock.textContent} - GS ATTACK REBOUND WON</div>` +
          eventFeed.innerHTML;

      } else {

        const activePlayer =
          document.querySelector(
            ".player-toggle.active"
          );


        if (activePlayer) {

          const player =
            activePlayer.textContent.trim();


          updatePlayerReboundCounter(
            player,
            "won"
          );


          updateGSAttackReboundPercentage();


          eventFeed.innerHTML =
            `<div class="attack-rebound-won-event">${matchClock.textContent} - ${player} ATTACK REBOUND WON</div>` +
            eventFeed.innerHTML;

        } else {

          eventFeed.innerHTML =
            `<div class="attack-rebound-won-event">${matchClock.textContent} - ATTACK REBOUND WON</div>` +
            eventFeed.innerHTML;

        }

      }


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - ATTACK REBOUND LOST
    // ==================================================

    if (
      button.id ===
      "level1-attack-rebound-lost"
    ) {

      let player = null;


      if (
        gsToggle.classList.contains("active")
      ) {

        player = "GS";

      } else {

        const activePlayer =
          document.querySelector(
            ".player-toggle.active"
          );


        if (activePlayer) {

          player =
            activePlayer.textContent.trim();

        }

      }


      if (player) {

        updatePlayerReboundCounter(
          player,
          "lost"
        );

      }


      if (!player) {

        gsReboundLost++;

      }


      updateGSAttackReboundPercentage();


      eventFeed.innerHTML =
        `<div class="attack-rebound-lost-event">${matchClock.textContent} - ATTACK REBOUND LOST</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - FEED SUCCESS
    // ==================================================

    if (
      button.id ===
      "level1-feed-success"
    ) {

      if (isGS) {

        gsFeedSuccess++;

        updateGSFeedSuccessPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="feed-success-event">${matchClock.textContent} - ${playerPrefix}FEED SUCCESS</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - FEED FAIL
    // ==================================================

    if (
      button.id ===
      "level1-feed-missed"
    ) {

      if (isGS) {

        gsFeedMissed++;

        updateGSFeedSuccessPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="feed-missed-event">${matchClock.textContent} - ${playerPrefix}FEED FAIL</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - CENTRE SUCCESS
    // ==================================================

    if (
      button.id ===
      "level1-centre-success"
    ) {

      if (isGS) {

        gsCentreSuccess++;

        updateGSCentreSuccessPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="centre-success-event">${matchClock.textContent} - ${playerPrefix}CENTRE SUCCESS</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - CENTRE FAIL
    // ==================================================

    if (
      button.id ===
      "level1-centre-missed"
    ) {

      if (isGS) {

        gsCentreMissed++;

        updateGSCentreSuccessPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="centre-fail-event">${matchClock.textContent} - ${playerPrefix}CENTRE FAIL</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - TURNOVER
    // ==================================================

    if (
      button.id ===
      "level1-attack-turnover"
    ) {

      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="turnover-event">${matchClock.textContent} - ${playerPrefix}TURNOVER</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - UNFORCED ERROR
    // ==================================================

    if (
      button.id ===
      "level1-unforced-error"
    ) {

      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="unforced-error-event">${matchClock.textContent} - ${playerPrefix}UNFORCED ERROR</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - DEFENCE REBOUND WON
    // ==================================================

    if (
      button.id ===
      "level1-defence-rebound-won"
    ) {

      if (isGS) {

        gsDReboundWon++;

        updateGSDReboundPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="defence-rebound-won-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND WON</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - DEFENCE REBOUND LOST
    // ==================================================

    if (
      button.id ===
      "level1-defence-rebound-lost"
    ) {

      if (isGS) {

        gsDReboundLost++;

        updateGSDReboundPercentage();

      }


      const playerPrefix =
        isGS
          ? "GS "
          : "";


      eventFeed.innerHTML =
        `<div class="defence-rebound-lost-event">${matchClock.textContent} - ${playerPrefix}DEFENCE REBOUND LOST</div>` +
        eventFeed.innerHTML;


      gsToggle.classList.remove("active");

    }


    // ==================================================
    // GAME FEED - OPPOSITION SCORE
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

  });

});


clearLastButton.addEventListener(
  "click",
  undoLastAction
);

});