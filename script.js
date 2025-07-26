let countdownInterval;

document.getElementById('startBtn').addEventListener('click', () => {
  clearInterval(countdownInterval); // Reset previous timer

  const dateInput = document.getElementById('date').value;
  const timeInput = document.getElementById('time').value;

  if (!dateInput || !timeInput) {
    alert('Please select both date and time!');
    return;
  }

  const targetDateTime = new Date(`${dateInput}T${timeInput}:00`);
  const alarm = document.getElementById('alarmSound');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDateTime.getTime() - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);

      // Update UI to 00:00:00
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      document.getElementById('message').innerText = "Time's up!";

      // Play ringing sound
      alarm.play().catch(err => console.log("Autoplay blocked:", err));
      return;
    }

    // Convert to days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update values
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    document.getElementById('message').innerText = '';
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});
