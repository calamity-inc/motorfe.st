const ROTATION_START = 1757484000;
const ROTATION = [
  ["Kula", "ST2 > Racing > Hyper", "No Collision"],
  ["KALAELOA", "Motocross > Monster > RR"],
  ["Wahiawa Fields", "ST1 > ST2 > RR", "No Collision"],
  ["Kahakuloa", "Racing > AGP > Hyper"],
  ["Haleiwa", "ST2 > Hyper > Racing"],
  ["Lahaina", "AGP > ST2 > Racing", "Special Selection"],
  ["Ma'akua Black Beach", "AGP > RR > Hyper"],
  ["Kealaloloa", "ST1 > ST2 > AGP"],
  ["Kahuku", "ST2 > Monster > Hyper", "No Collision"],
  ["Kula", "Racing > Rally > AGP"],
  ["Kaena Point", "ST2 > RR > Motocross"],
  ["Paia", "ST1 > Racing > AGP", "Special Selection"],
  ["Waikiki", "AGP > Racing > Rally"],
  ["Diamond Head", "Hyper > AGP > Racing"],
  ["Kaneohe", "ST2 > Racing > AGP", "No Collision"],
  ["Halekala", "ST1 > Racing > Hyper"],
  ["Nuuahu - Punchbowl", "RR > Monster > Rally"],
  ["Wailea", "Hyper > ST2 > Racing", "Special Selection"],
  ["Kalaeloa", "RR > Rally > ST2"],
  ["Hana", "AGP > Racing > Hyper"],
  ["Peacock Flats", "ST2 > RR > Racing", "No Collision"],
  ["Kealaloloa", "ST1 > Rally > Hyper"],
  ["KANEOHE", "RR > Hyper > Drift"],
];
const EVENT_DURATION = 20 * 60;
const ROTATION_DURATION = ROTATION.length * EVENT_DURATION;

function getCurrentEventIndex() {
  return (
    (((new Date() / 1000 - ROTATION_START) % ROTATION_DURATION) /
      EVENT_DURATION) |
    0
  );
}

function getRotationStart(rotation_delta) {
  return ROTATION_START + rotation_delta * ROTATION_DURATION;
}

let rotation_offset = 0;

function renderSchedule() {
  document.getElementById("schedule").innerHTML = "";

  const current_event_index =
    rotation_offset == 0 ? getCurrentEventIndex() : -1;
  const time_delta = new Date() / 1000 - ROTATION_START;
  const rotation_delta = (time_delta / ROTATION_DURATION) | 0;
  let event_time = getRotationStart(rotation_delta + rotation_offset);
  for (let i = 0; i != ROTATION.length; ++i) {
    const event = ROTATION[i];

    event[1] = event[1]
      .split("AGP")
      .join("Alpha GP")
      .split("RR")
      .join("Rally Raid")
      .split("ST1")
      .join("Street Tier 1")
      .split("ST2")
      .join("Street Tier 2");

    const tr = document.createElement("tr");
    tr.setAttribute("data-index", i);
    if (i == current_event_index) {
      tr.className = "fw-semibold bg-secondary-subtle";
    }
    {
      const td = document.createElement("td");
      td.className = "ps-1 pe-2";
      td.textContent = new Date(event_time * 1000).toLocaleString([], {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.className = "text-end pe-2";
      td.textContent = event[0];
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.textContent = event[1];
      tr.appendChild(td);
    }
    {
      const td = document.createElement("td");
      td.className = "text-center pe-2";
      td.textContent = event[2] ?? "";
      tr.appendChild(td);
    }
    document.getElementById("schedule").appendChild(tr);

    event_time += EVENT_DURATION;
  }
}

renderSchedule();

setInterval(function () {
  if (rotation_offset == 0) {
    renderSchedule();
  }
}, 60000);

function rotateSchedule(delta) {
  rotation_offset += delta;
  renderSchedule();
}
