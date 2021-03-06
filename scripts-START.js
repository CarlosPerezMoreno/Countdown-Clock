let countdown;
const theTimerDisplay = document.querySelector(".display__time-left");
const theEndTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]")

function timer(seconds) {

    // Delete previous timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds)
    displayEndTime(then)
    //Time left
    countdown = setInterval(() => {
        const timeLeft = Math.round((then - Date.now()) / 1000);
    //Stop the countdown at 0.
    if(timeLeft < 0) {
        clearInterval(countdown)
        return;
    }

    //Display the countdown
    displayTimeLeft(timeLeft)

    }, 1000)
}
//Text display function
function displayTimeLeft(seconds) {
    const minuteTransform = Math.floor(seconds / 60);
    const secondsTransform = seconds % 60;
    const display = `${minuteTransform}:${secondsTransform < 10 ? "0" : ""}${secondsTransform}`;
    document.title = display;
    theTimerDisplay.textContent = display;
}
//Timestamp
function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hours = end.getHours()
    const minutes = end.getMinutes()
    theEndTimeDisplay.textContent = `Return at ${hours}:${minutes < 10 ? "0" : ""}${minutes}`
}

//Buttons functionality
function buttonStartTimer() {
    const secButton = parseInt(this.dataset.time);
    timer(secButton)
}

buttons.forEach(button => button.addEventListener('click', buttonStartTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});