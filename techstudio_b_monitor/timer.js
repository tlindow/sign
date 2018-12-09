// Start timer when document is loaded
$(document).ready(startTimer);
window.focus();

// Set up new date getter and variables
var initialTime = new Date();
var year = initialTime.getYear() + 1900;
var month = initialTime.getMonth();
var day = initialTime.getDate();
var countDownDate = new Date();
var timeLeft;
var now;
var minute = 1000 * 60;

function createLabSessionTime(hour, minute) {
  return new Date(year, month, day, hour, minute, 0);
}
var lab1 = createLabSessionTime(10, 0);
var lab2 = createLabSessionTime(10, 45);
var lab3 = createLabSessionTime(11, 30);
var lab4 = createLabSessionTime(12, 30);
var lab5 = createLabSessionTime(1, 15);
var openDesign = createLabSessionTime(2, 0);
var reloadTime1 = new Date(year, month, day + 1, 8, 15, 0);
var reloadTime2 = new Date(year, month, day, 14, 0, 5);

function initializeOnce() {
  var initialized = false;
  console.log(initialized);
  return function(fn) {
    if (initialized === false) {
      fn();
      console.log(fn + " initialized!");
      initialized = true;
      return initialized;
    }
  };
}

var initializeVolunteer = initializeOnce();
var initializeOpenDesignStyles = initializeOnce();
var initializeLab1 = initializeOnce();
var intializeLab2 = initializeOnce();
var intializeLab3 = initializeOnce();
var initializeLab4 = initializeOnce();
var initializeLab5 = initializeOnce();

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

function setCountDownTime(labTime) {
  countDownDate = labTime;
  console.log("Countdown timer set to " + labTime);
}

function crossOffTime(lab_time) {
  $("#" + lab_time).toggleClass("strikethrough");
}

function setVolunteerActivityStyles() {
  document.getElementById("heading").style.display = "none";
  document.getElementById("labSessions").style.display = "none";
  console.log("Volunteer Activity Styles set!");
}

function startTimer() {
  var timer = setInterval(function() {
    now = new Date();
    // Set styles for weekdays after 2pm or Saturday or Sunday
    if (now.getHours() >= 14 || now.getDay() === 0 || now.getDay() === 6) {
      initializeOpenDesignStyles(setOpenDesignStyles);
    }
    // Set styles for after 1pm on weekends
    if (now.getHours() >= 13 & (now.getDay() === 0 || now.getDay() === 6)) {
      initializeVolunteer(setVolunteerActivityStyles);
    }
    // Reload page at 8:15 a.m & 2 p.m.
    if (now.getTime() >= reloadTime1.getTime() && now.getTime() <= reloadTime1.getTime() + 1000 ||
      now.getTime() >= reloadTime2.getTime() && now.getTime() <= reloadTime2.getTime() + 1000) {
      window.location.reload(true);
    }
    timeLeft = countDownDate.getTime() - now.getTime();

    // Start countdown timers for individual lab sessions
    // if (now.getTime() >= lab1.getTime() && now.getTime() < lab2.getTime()) {
    //   initializeOnce()(setCountDownTime(lab2));
    //   if (timeLeft <= (30 * minute)) {
    //     initializeOnce(crossOffTime(lab1));
    //   }
    // } else if (now.getTime() >= lab2.getTime() && now.getTime() < lab3.getTime()) {
    //   initializeOnce()(setCountDownTime(lab3));
    //   if (timeLeft <= (30 * minute)) {
    //     initializeOnce(crossOffTime(lab2));
    //   }
    // } else if (now.getTime() >= lab3.getTime() && now.getTime() < lab4.getTime()) {
    //   initializeOnce()(setCountDownTime(lab4));
    //   if (timeLeft <= (30 * minute)) {
    //     initializeOnce(crossOffTime(lab3));
    //   }
    // } else if (now.getTime() >= lab4.getTime() && now.getTime() < lab5.getTime()) {
    //   initializeOnce()(setCountDownTime(lab5));
    //   if (timeLeft <= (30 * minute)) {
    //     initializeOnce(crossOffTime(lab4));
    //   }
    // } else if (now.getTime() >= lab5.getTime() && now.getTime() < openDesign.getTime()) {
    //   initializeOnce()(setCountDownTime(openDesign));
    //   if (timeLeft <= (30 * minute)) {
    //     initializeOnce(crossOffTime(lab5));
    //   }
    // }

    // Countdown timer math
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Some details to make the timer format properly
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var time = document.getElementById("time");
    if (timeLeft < 0) {
      if (now.getTime() < lab5.getTime()) {
        time.innerHTML = "~";
      } else {
        time.innerHTML = "";
        $('.Next').html('Open Design!');
      }
    } else if (timeLeft > 2100000 && now.getTime() <= labSession3.getTime() && now.getTime() > labSession4.getTime() && now.getTime() > labSession1.getTime()) {
      time.innerHTML = "Starting Now!";
    } else if (timeLeft > 2400000) {
      time.innerHTML = "Starting Now!";
    } else {
      if (now.getTime() >= labSession3.getTime() && now.getTime() < labSession4.getTime()) {
        time.innerHTML = minutes + ":" + seconds;
      } else {
        time.innerHTML = minutes + ":" + seconds;
      }
    }
  }, 1000);
}