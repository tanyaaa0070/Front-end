let alarms = [];
let ringingAlarm = null;

function updateClock() {
  const now = new Date();
  document.getElementById("current-time").innerText = now.toLocaleTimeString();
  document.getElementById("current-date").innerText = now.toDateString();

  alarms.forEach((alarm, index) => {
    if (!alarm.active) return;
    if (
      now.getHours() === alarm.time.getHours() &&
      now.getMinutes() === alarm.time.getMinutes() &&
      now.getSeconds() === 0
    ) {
      playAlarm(alarm, index);
    }
  });
}
setInterval(updateClock, 1000);

function setAlarm() {
  const timeInput = document.getElementById("alarm-time").value;
  const tone = document.getElementById("alarm-tone").value;

  if (!timeInput) return alert("Please select a time.");

  const [hours, minutes] = timeInput.split(":");
  const alarmTime = new Date();
  alarmTime.setHours(hours, minutes, 0, 0);

  alarms.push({ time: alarmTime, tone: tone, active: true });
  renderAlarms();
}

function renderAlarms() {
  const list = document.getElementById("alarm-list");
  list.innerHTML = "";

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${alarm.time.toLocaleTimeString()} 
      <input type="checkbox" ${alarm.active ? "checked" : ""} 
        onchange="toggleAlarm(${index})"> 
      <button onclick="deleteAlarm(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function toggleAlarm(index) {
  alarms[index].active = !alarms[index].active;
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

function playAlarm(alarm, index) {
  ringingAlarm = index;
  const audio = document.getElementById("alarm-audio");
  audio.src = alarm.tone;
  audio.loop = true;
  audio.play();
  document.getElementById("alarm-controls").classList.remove("hidden");
}

function snoozeAlarm() {
  const snoozeTime = new Date();
  snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
  alarms[ringingAlarm].time = snoozeTime;
  stopAlarm();
}

function dismissAlarm() {
  alarms[ringingAlarm].active = false;
  stopAlarm();
}

function stopAlarm() {
  const audio = document.getElementById("alarm-audio");
  audio.pause();
  audio.currentTime = 0;
  document.getElementById("alarm-controls").classList.add("hidden");
  ringingAlarm = null;
}
