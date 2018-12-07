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

// Set up time triggers for lab sessions and lab strikethroughs
function createLabSessionTime(hour, minute) {
  new Date(year, month, day, hour, minute, 0);
}
var lab1 = createLabSessionTime(10, 0);
var lab2 = createLabSessionTime(10, 45);
var lab3 = createLabSessionTime(11, 30);
var lab4 = createLabSessionTime(12, 30);
var lab5 = createLabSessionTime(1, 15);
var openDesign = createLabSessionTime(2, 0);
var strikethroughDelay = 10;

// Set up times for reloading
var reloadTime1 = new Date(year, month, day + 1, 8, 15, 0);
// var reloadTime2 = new Date(year, month, day + 1, 8, 15, 1);
var reloadTime3 = new Date(year, month, day, 14, 0, 5);
// var reloadTime4 = new Date(year, month, day, 14, 0, 6);

// var labSession = new Date(year, month, day, 9, 15, 0);
// var labSessionend = new Date(year, month, day, 9, 15, 1);
// var labSession1 = new Date(year, month, day, 10, 0, 0);
// var labSession1end = new Date(year, month, day, 10, 0, 1);
// var strikethrough1 = new Date(year, month, day, 10, 10, 0);
// var strikethrough1end = new Date(year, month, day, 10, 10, 1);
// var labSession2 = new Date(year, month, day, 10, 45, 0);
// var labSession2end = new Date(year, month, day, 10, 45, 1);
// var strikethrough2 = new Date(year, month, day, 10, 55, 0);
// var strikethrough2end = new Date(year, month, day, 10, 55, 1);
// var labSession3 = new Date(year, month, day, 11, 30, 0);
// var labSession3end = new Date(year, month, day, 11, 30, 1);
// var strikethrough3 = new Date(year, month, day, 11, 40, 0);
// var strikethrough3end = new Date(year, month, day, 11, 40, 1);
// var labSession4 = new Date(year, month, day, 12, 30, 0);
// var labSession4end = new Date(year, month, day, 12, 30, 1);
// var strikethrough4 = new Date(year, month, day, 12, 40, 0);
// var strikethrough4end = new Date(year, month, day, 12, 40, 1);
// var labSession5 = new Date(year, month, day, 13, 15, 0);
// var labSession5end = new Date(year, month, day, 13, 15, 1);
// var strikethrough5 = new Date(year, month, day, 13, 25, 0);
// var strikethrough5end = new Date(year, month, day, 13, 25, 1);
// var labSession6 = new Date(year, month, day, 14, 0, 0);



// Initialize countdown timer whenever refreshed
// if (now.getTime() >= labSession.getTime() && now.getTime() < labSession1.getTime()) {
//   countDownDate = labSession1;
//   console.log("Pre Session 1!");
// }
// if (now.getTime() >= labSession1.getTime() && now.getTime() < labSession2.getTime()) {
//   countDownDate = labSession2;
//   console.log("Session 1!");
// }
// if (now.getTime() >= labSession2.getTime() && now.getTime() < labSession3.getTime()) {
//   countDownDate = labSession3;
//   console.log("Session 2!");
// }
// if (now.getTime() >= labSession3.getTime() && now.getTime() < labSession4.getTime()) {
//   countDownDate = labSession4;
//   console.log("Session 3!");
// }
// if (now.getTime() >= labSession4.getTime() && now.getTime() < labSession5.getTime()) {
//   countDownDate = labSession5;
//   console.log("Session 4!");
// }
// if (now.getTime() >= labSession5.getTime() && now.getTime() < labSession6.getTime()) {
//   countDownDate = labSession6;
//   console.log("Session 5!");
// }
function setOpenDesignStyles() {
  document.getElementById("title").classList.toggle("openDesignTitle");
  document.getElementById("description").classList.toggle("openDesignDescription");
  document.getElementById("labSessions").style.display = "none";
  document.getElementById("myVideo").style.display = "inline";
}

function startTimer() {
  var timer = setInterval(function() {
    now = new Date();
    // Set styles for weekdays after 2pm or Saturday or Sunday
    if (now.getHours() >= 14 || now.getDay() === 0 || now.getDay() === 6) {
      setOpenDesignStyles();
    }
    // Set styles for after 1pm on weekends
    if (now.getHours() >= 13 & (now.getDay() === 0 || now.getDay() === 6)) {
      document.getElementById("heading").style.display = "none";
    }
    // Reload page at 8:15 a.m & 2 p.m.
    if (now.getTime() >= reloadTime1.getTime() && now.getTime() <= reloadTime2.getTime() || now.getTime() >= reloadTime3.getTime() && now.getTime() <= reloadTime4.getTime()) {
      window.location.reload(true);
    }
    // Countdown timer math
    timeLeft = countDownDate.getTime() - now.getTime();
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    // Start countdown timers for individual lab sessions
    if (now.getTime() >= lab1.getTime() && now.getTime() <= lab1.getTime() + 1000) {
      countDownDate = lab2;
      // countDownDate.setMinutes(now.getMinutes() + 45);
      // countDownDate.setSeconds(now.getSeconds());
      console.log("Session 1!");
    }
    if (now.getTime() >= strikethrough1.getTime() && now.getTime() <= strikethrough1end.getTime()) {
      $("#lab_time1").toggleClass("strikethrough");
    }
    if (now.getTime() >= labSession2.getTime() && now.getTime() <= labSession2end.getTime()) {
      countDownDate.setMinutes(now.getMinutes() + 45);
      countDownDate.setSeconds(now.getSeconds());
      console.log("Session 2!");
    }
    if (now.getTime() >= strikethrough2.getTime() && now.getTime() <= strikethrough2end.getTime()) {
      $("#lab_time2").toggleClass("strikethrough");
    }
    if (now.getTime() >= labSession3.getTime() && now.getTime() <= labSession3end.getTime()) {
      countDownDate.setMinutes(now.getMinutes() + 60);
      countDownDate.setSeconds(now.getSeconds());
      console.log("Session 3!");
    }
    if (now.getTime() >= strikethrough3.getTime() && now.getTime() <= strikethrough3end.getTime()) {
      $("#lab_time3").toggleClass("strikethrough");
    }
    if (now.getTime() >= labSession4.getTime() && now.getTime() <= labSession4end.getTime()) {
      countDownDate.setMinutes(now.getMinutes() + 45);
      countDownDate.setSeconds(now.getSeconds());
      console.log("Session 4!");
    }
    if (now.getTime() >= strikethrough4.getTime() && now.getTime() <= strikethrough4end.getTime()) {
      $("#lab_time4").toggleClass("strikethrough");
    }
    if (now.getTime() >= labSession5.getTime() && now.getTime() <= labSession5end.getTime()) {
      countDownDate.setMinutes(now.getMinutes() + 45);
      countDownDate.setSeconds(now.getSeconds());
      $('.Next').html('Open Design in:');
      console.log("It's almost open design time");
      console.log("Session 5!");
    }
    if (now.getTime() >= strikethrough5.getTime() && now.getTime() <= strikethrough5end.getTime()) {
      $("#lab_time5").toggleClass("strikethrough");
    }
    // Reload page
    if (now.getTime() >= reloadTime1.getTime() && now.getTime() <= reloadTime2.getTime() || now.getTime() >= reloadTime3.getTime() && now.getTime() <= reloadTime4.getTime()) {
      window.location.reload(true);
    }

    // Countdown timer math
    timeLeft = countDownDate.getTime() - now.getTime();
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
      if (now.getTime() < labSession5.getTime()) {
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
