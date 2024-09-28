const ROTATION_START = 1725129900;
const ROTATION = [
	/* 1 */ [ "Kalaeola", "Rally Raid > Rally / Plane > Drift" ],
	/* 2 */ [ "Ma'akua Black Beach", "Hypercar > AGP > Racing" ],
	/* 3 */ [ "Waikiki", "ST2 > Hypercar > Racing" ],
	/* 4 */ [ "Kaena Point", "ST2 > Rally > Motocross" ],
	/* 5 */ [ "Nuuanu - Punchbowl", "Drift > Racing > ST2" ],
	/* 6 */ [ "Haleiwa", "Monster > Hypercar > AGP" ],
	/* 7 */ [ "Mauna Pele", "RR > ST2 > AGP" ],
	/* 8 */ [ "Diamond Head", "Hypercar > Rally > AGP" ],
	/* 9 */ [ "Wahiawa Fields", "Hypercar > ST1 > AGP" ],
	/* 10 */ [ "Kahuku", "ST2 > RR > Racing" ],
	/* 11 */ [ "Kanehoe", "Monster > Racing > ST2" ],
	/* 12 */ [ "Kalaeola", "Hypercar > AGP > Racing" ],
	/* 13 */ [ "Ma'akua Black Beach", "ST1 > RR > ST2" ],
	/* 14 */ [ "Nuuanu - Punchbowl", "Motocross > RR / Plane > Rally" ],
	/* 15 */ [ "Waikiki", "ST2 > AGP > RR" ],
	/* 16 */ [ "Kaena Point", "ST1 > ST2 > Hypercar" ],
	/* 17 */ [ "Haleiwa", "ST2 > ST1 > Hypercar" ],
	/* 18 */ [ "Kaneohe", "Hypercar > Rally > Racing" ],
	/* 19 */ [ "Mauna Pele", "ST1 > Hypercar / Plane > Racing" ],
	/* 20 */ [ "Wahiawa Fields", "Hypercar > ST2 > RR" ],
	/* 21 */ [ "Kahuku", "RR > Motocross > Monster" ],
	/* 22 */ [ "Diamond Head", "ST1 > RR > Hypercar" ],
];
const EVENT_DURATION = 30 * 60;
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
			td.textContent = event[0];
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.textContent = event[1];
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
