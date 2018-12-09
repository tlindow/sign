// Start timer when document is loaded
$(document).ready(startTimer);
window.focus();

//Times for labs, open design, and reloads
var lab1 = createLabSessionTime(10, 0);
var lab2 = createLabSessionTime(10, 45);
var lab3 = createLabSessionTime(11, 30);
var lab4 = createLabSessionTime(12, 30);
var lab5 = createLabSessionTime(1, 15);
var openDesign = createLabSessionTime(2, 0);
var reloadTime1 = new Date(year, month, day + 1, 8, 15, 0);
var reloadTime2 = new Date(year, month, day, 14, 0, 5);

function createLabSessionTime(hour, minute) {
  return new Date(year, month, day, hour, minute, 0);
}

// Set up an inital date and year, month, and day variables
var initialTime = new Date();
var year = initialTime.getYear() + 1900;
var month = initialTime.getMonth();
var day = initialTime.getDate();

//Create a date object to act as a time to count down towards
var countDownDate = new Date();

function setCountDownTime(labTime) {
  countDownDate = labTime;
  console.log("Countdown timer set to " + labTime);
}

//Functions to initialize a timer event only once
var initializeVolunteerActivityStyles = initializeOnce();
var initializeOpenDesignStyles = initializeOnce();
var initializeLab1 = initializeOnce();
var initializeLab2 = initializeOnce();
var initializeLab3 = initializeOnce();
var initializeLab4 = initializeOnce();
var initializeLab5 = initializeOnce();
var initializeOpenDesign = initializeOnce();
var initializeCrossOffLab1 = initializeOnce();
var initializeCrossOffLab2 = initializeOnce();
var initializeCrossOffLab3 = initializeOnce();
var initializeCrossOffLab4 = initializeOnce();
var initializeCrossOffLab5 = initializeOnce();

function initializeOnce() {
  var initialized = false;
  return function(fn) {
    if (initialized === false) {
      fn();
      console.log(fn + " initialized!");
      initialized = true;
      return initialized;
    }
  };
}

function startTimer() {

  //Store whether or not a lab session should be crossed off
  var strikethroughData = [];
  function checkToCrossOffLab(lab_number) {
      if (typeof(Storage) !== "undefined") {
          sessionStorage.setItem("strikethrough" + lab_number, "strikethrough");
      }
      strikethroughData[lab_number] = sessionStorage.getItem("strikethrough");
      document.getElementById("lab" + lab_number).classList.add(strikethroughData[lab_number]);
  }

  function setOpenDesignStyles() {
    document.getElementById("title").innerHTML = "Open Design Time";
    document.getElementById("title").classList.toggle("openDesignTitle");
    document.getElementById("title").classList.toggle("MissionMarsTitle");
    document.getElementById("description").innerHTML = "Let your imagination be your guide with our open design kits.";
    document.getElementById("description").classList.toggle("openDesignDescription");
    document.getElementById("description").classList.toggle("MissionMarsDescription");
    document.getElementById("labSessions").style.display = "none";
    document.getElementById("myVideo").style.display = "inline";
    console.log("open design style set!");
  }

  function setVolunteerActivityStyles() {
    document.getElementById("heading").style.display = "none";
    document.getElementById("labSessions").style.display = "none";
    console.log("Volunteer Activity Styles set!");
  }

  var timer = setInterval(function() {
    var now = new Date();
    // Set styles for weekdays after 2pm or Saturday or Sunday
    if (now.getHours() >= 14 || now.getDay() === 0 || now.getDay() === 6) {
      initializeOpenDesignStyles(setOpenDesignStyles);
    }
    // Set styles for after 1pm on weekends
    if (now.getHours() >= 13 & (now.getDay() === 0 || now.getDay() === 6)) {
      initializeVolunteerActivityStyles(setVolunteerActivityStyles);
    }
    // Reload page at 8:15 a.m & 2 p.m.
    if (now.getTime() >= reloadTime1.getTime() && now.getTime() <= reloadTime1.getTime() + 1000 ||
      now.getTime() >= reloadTime2.getTime() && now.getTime() <= reloadTime2.getTime() + 1000) {
      window.location.reload(true);
    }

    //Create a variable to keep track of the time difference between now and count down time
    var timeLeft;
    timeLeft = countDownDate.getTime() - now.getTime();

    //Define one minute
    var minute = 1000 * 60;

    // Start countdown timers for individual lab sessions
    if (now.getDay() >= 1 && now.getDay() <= 5) {
      if (now.getTime() >= lab1.getTime() && now.getTime() < lab2.getTime()) {
        initializeLab1(setCountDownTime(lab2));
        if (timeLeft <= (30 * minute)) {
          checkToCrossOffLab(1);
        }
      } else if (now.getTime() >= lab2.getTime() && now.getTime() < lab3.getTime()) {
        initializeLab2(setCountDownTime(lab3));
        if (timeLeft <= (30 * minute)) {
          checkToCrossOffLab(2);
        }
      } else if (now.getTime() >= lab3.getTime() && now.getTime() < lab4.getTime()) {
        initializeLab3(setCountDownTime(lab4));
        if (timeLeft <= (30 * minute)) {
          checkToCrossOffLab(3);
        }
      } else if (now.getTime() >= lab4.getTime() && now.getTime() < lab5.getTime()) {
        initializeLab4(setCountDownTime(lab5));
        if (timeLeft <= (30 * minute)) {
          checkToCrossOffLab(4);
        }
      } else if (now.getTime() >= lab5.getTime() && now.getTime() < openDesign.getTime()) {
        initializeLab5(setCountDownTime(openDesign));
        if (timeLeft <= (30 * minute)) {
          checkToCrossOffLab(5);
        }
      }
    }

    // Countdown timer math
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Add zeros to make the timer format properly
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    //Update the time display
    var time = document.getElementById("time");

    // Display timer or "starting Now!"
    if (timeLeft > 30 * minute) {
    time.innerHTML = "Starting Now!";
  } else {
    time.innerHTML = minutes + ":" + seconds;
  }
  }, 1000);
}
