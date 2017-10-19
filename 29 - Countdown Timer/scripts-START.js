let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
//buttons
const buttons = document.querySelectorAll("[data-time]");


function timer(seconds) {
    //clear timerDisplayc
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);


    countdown =
        setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);

            if (secondsLeft < 0) {
                //stop timer
                clearInterval(countdown);
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);

}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    /*let zero = "0";
    if (remainderSeconds < 10) {
        zero = "0";
    } else {
        zero = "";
    }*/
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display
    timerDisplay.textContent = display;
    console.log(display);
}


function displayEndTime(timestamp) {
    //this converts Date.now()
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${hour > 12 ? (hour-12) : hour}:${minutes < 10 ? '0' : ''}${minutes}`;

}

function startTimer() {

    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

//Hook up buttons
buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60)
    this.reset();
});

//Add animations and interactions