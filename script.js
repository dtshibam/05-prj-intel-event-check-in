// 1. Get DOM elements based on your HTML IDs
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greetingDisplay = document.getElementById("greeting");

// 2. Track attendance (Load from localStorage or start at 0)
let count = parseInt(localStorage.getItem("totalAttendance")) || 0;
const maxCount = 50;

// 3. Initialize the UI on page load to show saved data
updateUI();

// 4. Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value; // "water", "zero", or "power"
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment total count
  count++;

  // Update team counter logic
  const teamCounter = document.getElementById(team + "Count");
  let currentTeamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = currentTeamCount;
  
  // Save progress to LocalStorage
  localStorage.setItem("totalAttendance", count);
  localStorage.setItem(team + "Count", currentTeamCount);

  // Show personalized welcome message on screen
  greetingDisplay.textContent = `🥳 Welcome, ${name} from ${teamName}!`;
  greetingDisplay.style.display = "block"; // Ensures it's visible

  // Update Progress Bar and Total Display
  updateUI();

  // Celebration Feature: Check if goal is reached
  if (count >= maxCount) {
    greetingDisplay.innerHTML = `🎉 <strong>Goal Reached!</strong> The summit is at capacity!`;
    greetingDisplay.classList.add("celebration"); // You can style this in CSS
  }

  // Clear the form
  form.reset();
});

// 5. Helper function to keep UI and LocalStorage in sync
function updateUI() {
  // Update Total Attendance Text
  if (attendeeCountDisplay) attendeeCountDisplay.textContent = count;

  // Update Progress Bar visually
  const percentage = Math.min((count / maxCount) * 100, 100);
  if (progressBar) {
    progressBar.style.width = percentage + "%";
  }

  // Reload team counts from storage so they persist on refresh
  const teams = ["water", "zero", "power"];
  teams.forEach(t => {
    const savedCount = localStorage.getItem(t + "Count") || 0;
    const element = document.getElementById(t + "Count");
    if (element) element.textContent = savedCount;
  });
}


