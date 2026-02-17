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

// 3. Initialize the UI on page load
updateUI();

// 4. Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value;
  const team = teamSelect.value; // "water", "zero", or "power"
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment total count
  count++;

  // Update team counter in the UI and save to storage
  const teamCounter = document.getElementById(team + "Count");
  let currentTeamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = currentTeamCount;
  
  // Save progress to LocalStorage [Rubric: Save Your Progress]
  localStorage.setItem("totalAttendance", count);
  localStorage.setItem(team + "Count", currentTeamCount);

  // Show welcome message [Rubric: Check-In Greeting]
  greetingDisplay.textContent = `Welcome, ${name} from ${teamName}!`;

  // Update Progress Bar and Total Display
  updateUI();

  // Celebration Feature [Rubric: LevelUp Celebration]
  if (count >= maxCount) {
    greetingDisplay.innerHTML = "🎉 <strong>Goal Reached!</strong> The summit is at capacity!";
    greetingDisplay.style.color = "#0068b5"; // Intel Blue
  }

  form.reset();
});

// 5. Helper function to keep UI and LocalStorage in sync
function updateUI() {
  // Update Total Attendance Display
  if (attendeeCountDisplay) attendeeCountDisplay.textContent = count;

  // Update Progress Bar [Rubric: Progress Bar]
  const percentage = Math.min((count / maxCount) * 100, 100);
  if (progressBar) {
    progressBar.style.width = percentage + "%";
  }

  // Load team counts from storage so they persist on refresh
  const teams = ["water", "zero", "power"];
  teams.forEach(t => {
    const savedCount = localStorage.getItem(t + "Count") || 0;
    const element = document.getElementById(t + "Count");
    if (element) element.textContent = savedCount;
  });
}
