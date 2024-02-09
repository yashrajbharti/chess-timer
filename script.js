$(document).ready(() => {
  // Function to get the current timer value from local storage
  const getSavedTime = (clockId) => {
    const savedTime = localStorage.getItem(`timerValue_${clockId}`);
    return savedTime ? parseInt(savedTime) : 600; // Default to 10 minutes if no value is found
  };

  // Function to get the current state of isWhite from local storage
  const getIsWhite = () => {
    const savedIsWhite = localStorage.getItem("isWhite");
    return savedIsWhite ? JSON.parse(savedIsWhite) : false; // Default to false if no value is found
  };

  const modal = document.querySelector(".modal");
  const restart = document.querySelector(".btn");

  // Initialize FlipClock instances with the saved time
  const whiteClock = new FlipClock($("#white_timer"), getSavedTime("white"), {
    clockFace: "MinuteCounter",
    autoStart: false,
    countdown: true,
    callbacks: {
      stop: () => {
        if (
          blackClock.getTime().time === 0 &&
          whiteClock.getTime().time === 0
        ) {
          modal.style.display = "inline-flex";
        }
      },
      interval: () => {
        // Save the current timer value to local storage every second
        localStorage.setItem("timerValue_white", whiteClock.getTime().time);
        localStorage.setItem("isWhite", JSON.stringify(isWhite)); // Save isWhite state
      },
    },
  });

  const blackClock = new FlipClock($("#black_timer"), getSavedTime("black"), {
    clockFace: "MinuteCounter",
    autoStart: false,
    countdown: true,
    callbacks: {
      stop: () => {
        if (
          blackClock.getTime().time === 0 &&
          whiteClock.getTime().time === 0
        ) {
          modal.style.display = "inline-flex";
        }
      },
      interval: () => {
        // Save the current timer value to local storage every second
        localStorage.setItem("timerValue_black", blackClock.getTime().time);
        localStorage.setItem("isWhite", JSON.stringify(isWhite)); // Save isWhite state
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
        blackClock.start();
      } else {
        blackClock.stop();
        whiteClock.start();
      }
    } else if (event.key === "Enter") {
      // Check if the Enter key is pressed
      // Reset both FlipClocks to the initial time (10 minutes)
      whiteClock.setTime(600);
      whiteClock.stop();
      blackClock.setTime(600);
      blackClock.stop();
      modal.style.display = "none";
      localStorage.removeItem("timerValue_white"); // Clear stored value when resetting
      localStorage.removeItem("timerValue_black"); // Clear stored value when resetting
      localStorage.setItem("isWhite", JSON.stringify(false)); // Set isWhite to false in local storage
      isWhite = false; // Reset isWhite to false
    } else if (event.key === "Shift" || event.key === "p") {
      window.location.reload();
    }
  });
  restart.addEventListener("click", () => {
    modal.style.display = "none";
    whiteClock.setTime(600);
    blackClock.setTime(600);
    localStorage.removeItem("timerValue_white"); // Clear stored value when resetting
    localStorage.removeItem("timerValue_black"); // Clear stored value when resetting
    localStorage.setItem("isWhite", JSON.stringify(false)); // Set isWhite to false in local storage
    isWhite = false; // Reset isWhite to false
  });
});
