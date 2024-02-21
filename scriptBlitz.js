$(document).ready(() => {
  // Function to get the current timer value from local storage
  const getSavedTime = (clockId) => {
    const savedTime = localStorage.getItem(`timerValueBlitz_${clockId}`);
    return savedTime ? parseInt(savedTime) : 180; // Default to 10 minutes if no value is found
  };

  // Function to get the current state of isWhite from local storage
  const getIsWhite = () => {
    const savedIsWhite = localStorage.getItem("isWhiteBlitz");
    return savedIsWhite ? JSON.parse(savedIsWhite) : false; // Default to false if no value is found
  };

  const modal = document.querySelector(".modal");
  const restart = document.querySelector(".btn");
  const white_timer = document.getElementById("white_timer");
  const black_timer = document.getElementById("black_timer");

  // Initialize FlipClock instances with the saved time
  const whiteClock = new FlipClock($("#white_timer"), getSavedTime("white"), {
    clockFace: "MinuteCounter",
    autoStart: false,
    countdown: true,
    callbacks: {
      stop: () => {
        if (whiteClock.getTime().time === 0) {
          setTimeout(() => {
            modal.style.display = "inline-flex";
            let br = document.createElement("br");
            modal.querySelector(".message").appendChild(br);
            let span = document.createElement("span");
            span.textContent = "timer on LEFT ended to 0";
            modal.querySelector(".message").appendChild(span);
          }, 1000);
        }
      },
      interval: () => {
        // Save the current timer value to local storage every second
        localStorage.setItem(
          "timerValueBlitz_white",
          whiteClock.getTime().time
        );
        localStorage.setItem("isWhiteBlitz", JSON.stringify(isWhite)); // Save isWhite state
      },
    },
  });

  const blackClock = new FlipClock($("#black_timer"), getSavedTime("black"), {
    clockFace: "MinuteCounter",
    autoStart: false,
    countdown: true,
    callbacks: {
      stop: () => {
        if (blackClock.getTime().time === 0) {
          setTimeout(() => {
            modal.style.display = "inline-flex";
            let br = document.createElement("br");
            modal.querySelector(".message").appendChild(br);
            let span = document.createElement("span");
            span.textContent = "timer on RIGHT ended to 0";
            modal.querySelector(".message").appendChild(span);
          }, 1000);
        }
      },
      interval: () => {
        // Save the current timer value to local storage every second
        localStorage.setItem(
          "timerValueBlitz_black",
          blackClock.getTime().time
        );
        localStorage.setItem("isWhiteBlitz", JSON.stringify(isWhite)); // Save isWhite state
      },
    },
  });

  const tickSound = document.getElementById("tickSound");
  let isWhite = getIsWhite();

  $(document).on("keydown", (event) => {
    if (event.key === " ") {
      tickSound.currentTime = 0;
      tickSound.src = "./sound.wav";
      tickSound.play();
      isWhite = !isWhite;
      // Check if space bar is pressed
      if (isWhite) {
        whiteClock.stop();
        whiteClock.setTime(whiteClock.getTime().time + 5);
        white_timer?.classList?.remove("active_timer");
        blackClock.start();
        black_timer.classList.add("active_timer");
      } else {
        blackClock.stop();
        blackClock.setTime(blackClock.getTime().time + 5);
        black_timer?.classList?.remove("active_timer");
        whiteClock.start();
        white_timer.classList.add("active_timer");
      }
    } else if (event.key === "Enter") {
      // Check if the Enter key is pressed
      // Reset both FlipClocks to the initial time (10 minutes)
      whiteClock.setTime(180);
      whiteClock.stop();
      blackClock.setTime(180);
      blackClock.stop();
      modal.style.display = "none";
      localStorage.removeItem("timerValueBlitz_white"); // Clear stored value when resetting
      localStorage.removeItem("timerValueBlitz_black"); // Clear stored value when resetting
      localStorage.setItem("isWhiteBlitz", JSON.stringify(false)); // Set isWhite to false in local storage
      isWhite = false; // Reset isWhite to false
    } else if (event.key === "Shift" || event.key === "p") {
      window.location.reload();
    } else if (event.key === "b") {
      window.location.href = "./";
    }
  });
  restart.addEventListener("click", () => {
    modal.style.display = "none";
    whiteClock.setTime(180);
    blackClock.setTime(180);
    localStorage.removeItem("timerValueBlitz_white"); // Clear stored value when resetting
    localStorage.removeItem("timerValueBlitz_black"); // Clear stored value when resetting
    localStorage.setItem("isWhiteBlitz", JSON.stringify(false)); // Set isWhite to false in local storage
    isWhite = false; // Reset isWhite to false
  });
});
