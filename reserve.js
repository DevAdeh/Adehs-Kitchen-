// 1. Populate time slots (restaurant open 12pm - 10pm, 30 min intervals)
const timeSelect = document.getElementById('time');
function generateTimeSlots() {
  const start = 12; // 12 PM
  const end = 22;   // 10 PM
  for (let hour = start; hour <= end; hour++) {
    ['00', '30'].forEach(min => {
      if (hour === end && min === '30') return; // stop at 10:00, not 10:30
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const label = `${displayHour}:${min} ${period}`;
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      timeSelect.appendChild(option);
    });
  }
}
generateTimeSlots();

// 2. Prevent picking a past date - set min date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// 3. Grab form elements
const form = document.getElementById('reservationForm');
const confirmation = document.getElementById('confirmation');
const confirmationDetails = document.getElementById('confirmationDetails');
const newReservationBtn = document.getElementById('newReservationBtn');

// 4. Validation helper - shows/hides error state on a field
function setFieldValidity(inputEl, isValid) {
  const group = inputEl.closest('.form-group');
  if (isValid) {
    group.classList.remove('invalid');
  } else {
    group.classList.add('invalid');
  }
}

// 5. Handle form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // stop the page from reloading

  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const date = document.getElementById('date');
  const time = document.getElementById('time');
  const guests = document.getElementById('guests');

  let isValid = true;

  // Basic checks - each field just needs a value here,
  // "required" on the input already blocks empty submits in most browsers,
  // but we double-check so our custom error styling shows too
  if (name.value.trim() === '') { setFieldValidity(name, false); isValid = false; }
  else setFieldValidity(name, true);

  if (phone.value.trim().length < 10) { setFieldValidity(phone, false); isValid = false; }
  else setFieldValidity(phone, true);

  if (date.value === '') { setFieldValidity(date, false); isValid = false; }
  else setFieldValidity(date, true);

  if (time.value === '') { setFieldValidity(time, false); isValid = false; }
  else setFieldValidity(time, true);

  if (!isValid) return; // stop here if anything failed

  // 6. Everything passed - show confirmation with their details
  const formattedDate = new Date(date.value).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  confirmationDetails.textContent =
    `Thanks, ${name.value}! Your table for ${guests.value} guest(s) is booked for ${formattedDate} at ${time.value}. We'll call ${phone.value} if anything changes.`;

  form.classList.add('hidden');
  confirmation.classList.remove('hidden');
});

// 7. Reset to book again
newReservationBtn.addEventListener('click', function () {
  form.reset();
  form.classList.remove('hidden');
  confirmation.classList.add('hidden');
});