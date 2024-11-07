const ROTATION_START = 1730951400;
const ROTATION = [
	["Ma'akua Black Beach", "Rally > RR > ST2"],
	["Diamond Head", "Hypercar > RR > ST2"],
	["Kalaeloa", "Motocross > Rally / Plane > Drift"],
	["Diamond Head", "AGP > Rally > ST2", "No Collisions"],
	["Wailea", "Hypercar > AGP > ST2"],
	["Kula", "AGP > ST2 > Hypercar"],
	["Ma'akua Black Beach", "Racing > Hypercar > AGP"],
	["Waikiki", "Racing > Hypercar > ST2", "No Collisions"],
	["Kahuku", "Monster > RR > Motocross"],
	["Kealaloloa", "ST2 > RR > Racing"],
	["Kahakuloa", "ST1 > Rally > ST2"],
	["Kula", "Hypercar > Monster > AGP", "No Collisions"],
	["Mauna Pele", "RR > Racing > Hypercar"],
	["Nuuanu - Punchbowl", "Drift > ST1 > ST2"],
	["Kaena Point", "ST1 > Motocross > RR"],
	["Kealaloloa", "Racing > RR > Hypercar", "No Collisions"],
	["Kahakuloa", "ST1 > Rally > ST2"],
	["Diamond Head", "Hypercar > Racing > ST2"],
	["Wahiawa Fields", "AGP > Rally > Hypercar"],
	["Nuuanu - Punchbowl", "Monster > RR / Plane > Rally", "No Collisions"],
	["Haleiwa", "Racing > ST1 > AGP"],
	["Kula", "Racing > AGP > ST2"],
	["Kula", "ST1 > RR > Hypercar"],
	["Wailea", "Racing > ST1 > Hypercar", "No Collisions"],
];
const EVENT_DURATION = 20 * 60;
const ROTATION_DURATION = ROTATION.length * EVENT_DURATION;

function getCurrentEventIndex()
{
	return ((((new Date() / 1000) - ROTATION_START) % ROTATION_DURATION) / EVENT_DURATION) | 0;
}

function getRotationStart(rotation_delta)
{
	return ROTATION_START + (rotation_delta * ROTATION_DURATION);
}

let rotation_offset = 0;

function renderSchedule()
{
	document.getElementById("schedule").innerHTML = "";

	const current_event_index = (rotation_offset == 0 ? getCurrentEventIndex() : -1);
	const time_delta = ((new Date() / 1000) - ROTATION_START);
	const rotation_delta = (time_delta / ROTATION_DURATION) | 0;
	let event_time = getRotationStart(rotation_delta + rotation_offset);
	for (let i = 0; i != ROTATION.length; ++i)
	{
		const event = ROTATION[i];

		event[1] = event[1]
			.split("AGP").join("Alpha GP")
			.split("RR").join("Rally Raid")
			.split("ST1").join("Street Tier 1")
			.split("ST2").join("Street Tier 2")
			;

		const tr = document.createElement("tr");
		tr.setAttribute("data-index", i);
		if (i == current_event_index)
		{
			tr.className = "fw-semibold bg-secondary-subtle";
		}
		{
			const td = document.createElement("td");
			td.className = "pe-2";
			td.textContent = new Date(event_time * 1000).toLocaleString([], {month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"});;
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.className = "text-end pe-2";
			if (["Wailea", "Kula", "Kealaloloa", "Kahakuloa"].indexOf(event[0]) != -1) // Starts on Maui?
			{
				td.textContent = " " + event[0];
				const tag = document.createElement("span");
				tag.className = "badge text-bg-success";
				tag.textContent = "New";
				td.insertBefore(tag, td.firstChild);
			}
			else // Starts on Oahu
			{
				td.textContent = event[0];
			}
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.textContent = event[1];
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.textContent = event[2] ?? "";
			tr.appendChild(td);
		}
		document.getElementById("schedule").appendChild(tr);

		event_time += EVENT_DURATION;
	}
}

renderSchedule();

setInterval(function()
{
	if (rotation_offset == 0)
	{
		renderSchedule();
	}
}, 60000);

function rotateSchedule(delta)
{
	rotation_offset += delta;
	renderSchedule();
}
