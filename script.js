// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountElement = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greetingElement = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50;

// Team counters object
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0
};

// Attendee list array (for extra credit)
let attendees = [];

// Load saved data from localStorage on page load
function loadFromLocalStorage() {
  const savedCount = localStorage.getItem("totalCount");
  const savedTeamCounts = localStorage.getItem("teamCounts");
  const savedAttendees = localStorage.getItem("attendees");
  
  if (savedCount) {
    count = parseInt(savedCount);
    if (attendeeCountElement) {
      attendeeCountElement.textContent = count;
    }
    updateProgressBar();
  }
  
  if (savedTeamCounts) {
    teamCounts = JSON.parse(savedTeamCounts);
    const waterCount = document.getElementById("waterCount");
    const zeroCount = document.getElementById("zeroCount");
    const powerCount = document.getElementById("powerCount");
    
    if (waterCount) waterCount.textContent = teamCounts.water;
    if (zeroCount) zeroCount.textContent = teamCounts.zero;
    if (powerCount) powerCount.textContent = teamCounts.power;
  }
  
  if (savedAttendees) {
    attendees = JSON.parse(savedAttendees);
    displayAttendeeList();
  }
}

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem("totalCount", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));
}

// Update progress bar
function updateProgressBar() {
  const percentage = Math.round((count / maxCount) * 100);
  
  if (progressBar) {
    progressBar.style.width = percentage + "%";
  }
  
  // Check if goal is reached
  if (count >= maxCount) {
    showCelebration();
  }
}

// Display attendee list (Extra Credit)
function displayAttendeeList() {
  // Check if attendee list section already exists
  let attendeeListSection = document.querySelector(".attendee-list-section");
  
  // If it doesn't exist, create it
  if (!attendeeListSection) {
    attendeeListSection = document.createElement("div");
    attendeeListSection.className = "attendee-list-section";
    
    const heading = document.createElement("h3");
    heading.textContent = "Checked-In Attendees";
    attendeeListSection.appendChild(heading);
    
    const listContainer = document.createElement("div");
    listContainer.className = "attendee-list";
    listContainer.id = "attendeeList";
    attendeeListSection.appendChild(listContainer);
    
    // Insert after team stats
    const teamStats = document.querySelector(".team-stats");
    if (teamStats) {
      teamStats.insertAdjacentElement("afterend", attendeeListSection);
    }
  }
  
  const attendeeList = document.getElementById("attendeeList");
  if (!attendeeList) return;
  
  attendeeList.innerHTML = "";
  
  attendees.forEach((attendee) => {
    const listItem = document.createElement("div");
    listItem.className = "attendee-item";
    
    const attendeeName = document.createElement("span");
    attendeeName.className = "attendee-name";
    attendeeName.textContent = attendee.name;
    
    const teamBadge = document.createElement("span");
    teamBadge.className = "team-badge " + attendee.teamId;
    teamBadge.textContent = attendee.teamName;
    
    listItem.appendChild(attendeeName);
    listItem.appendChild(teamBadge);
    attendeeList.appendChild(listItem);
  });
}

// Show celebration when goal is reached (Extra Credit)
function showCelebration() {
  // Check if celebration already exists
  if (document.querySelector(".celebration-message")) {
    return;
  }
  
  // Find the winning team
  let winningTeam = "";
  let maxTeamCount = 0;
  
  if (teamCounts.water > maxTeamCount) {
    maxTeamCount = teamCounts.water;
    winningTeam = "Team Water Wise";
  }
  if (teamCounts.zero > maxTeamCount) {
    maxTeamCount = teamCounts.zero;
    winningTeam = "Team Net Zero";
  }
  if (teamCounts.power > maxTeamCount) {
    maxTeamCount = teamCounts.power;
    winningTeam = "Team Renewables";
  }
  
  // Create celebration message
  const celebration = document.createElement("div");
  celebration.className = "celebration-message";
  celebration.style.cssText = "background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 20px auto; max-width: 800px; box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);";
  celebration.innerHTML = 
    "<h2 style='color: #333; font-size: 2rem; margin-bottom: 15px;'>🎉 Goal Reached! 🎉</h2>" +
    "<p style='color: #333; font-size: 1.2rem; margin-bottom: 10px;'>Congratulations! We've reached " + maxCount + " attendees!</p>" +
    "<p style='color: #333; font-size: 1.2rem;'><strong style='color: #0071c5;'>" + winningTeam + "</strong> wins with " + maxTeamCount + " attendees!</p>";
  
  // Insert celebration after the attendance tracker
  const attendanceTracker = document.querySelector(".attendance-tracker");
  if (attendanceTracker) {
    attendanceTracker.insertAdjacentElement("afterend", celebration);
  }
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally
  
  // Get the values from the form
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;
  
  // Validate input
  if (!name || !team) {
    alert("Please enter your name and select a team.");
    return;
  }
  
  console.log(name, team, teamName);
  
  // Increment count
  count++;
  console.log("Total check-ins:", count);
  
  // Update total count display
  if (attendeeCountElement) {
    attendeeCountElement.textContent = count;
  }
  
  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  console.log("Progress: " + percentage + "%");
  updateProgressBar();
  
  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounts[team]++;
  if (teamCounter) {
    teamCounter.textContent = teamCounts[team];
  }
  
  // Add to attendee list (Extra Credit)
  attendees.push({
    name: name,
    teamId: team,
    teamName: teamName
  });
  
  // Display updated attendee list (Extra Credit)
  displayAttendeeList();
  
  // Save to localStorage (Extra Credit)
  saveToLocalStorage();
  
  // Show welcome message
  const message = "Welcome, " + name + " from " + teamName + "!";
  console.log(message);
  
  if (greetingElement) {
    greetingElement.textContent = message;
    greetingElement.style.display = "block";
    greetingElement.style.color = "#0071c5";
    greetingElement.style.fontWeight = "bold";
    greetingElement.style.textAlign = "center";
    greetingElement.style.padding = "15px";
    greetingElement.style.marginBottom = "20px";
    greetingElement.style.backgroundColor = "#e8f4f8";
    greetingElement.style.borderRadius = "8px";
    
    // Hide message after 3 seconds
    setTimeout(function() {
      greetingElement.style.display = "none";
    }, 3000);
  }
  
  // Reset form
  form.reset();
});

