// Data sources:
// - What is advertised at the start of the match for places 1-3: https://www.youtube.com/watch?v=mGbkBJjBXWo, https://gist.github.com/Sainan/265ee34691d3d9ccba27891f32603d7b
// - What is actually rewarded: https://www.youtube.com/@MotorfestGrandRaces/videos

// Bucks, XP
const REWARDS = {
	101: [101250, 54000],
	93: [93150, 49680],
	85: [85050, 45359],
	81: [81000, 43200], // "+80%"; 45,792 XP with 12% difficulty bonus & 52,272 XP with an additional +30% from main stage
	76: [76950, 41040], // "+70%"; 43,632 XP with 12% difficulty bonus
	72: [72900, 38880], // "+60%"; 41,472 XP with 12% difficulty bonus & 47,952 XP with an additional +30% from main stage
	68: [68850, 36720], // "+50%"; 39,312 XP with 12% difficulty bonus & 45,792 XP with an additional +30% from main stage
	60: [60750, 32400],
	56: [56700, 30240], // "+20%"; 32,832 XP with 12% difficulty bonus & 39,312 XP with an additional +30% from main stage
	52: [52650, 28079], // "+10%"; 30,672 XP with 12% difficulty bonus
};

const REWARDS_MATRIX = {
	//    #1   #2  #3  #4  #5  #6  #7  #8  #9 #10 #11 #12 #13 #14 #15 #16 #17 #18 #19 #20 #21 #22 #23 #24 #25 #26 #27 #28
	28: [ 101, 85, 81, 81, 81, 72, 72, 72, 72, 72, 72, 68, 68, 68, 68, 68, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52, 52, 52 ],
	27: [  93, 85, 81, 81, 81, 72, 72, 72, 72, 72, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52, 52 ],
	26: [  93, 85, 81, 81, 81, 72, 72, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52 ],
	25: [  93, 85, 81, 81, 72, 72, 72, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52 ],
	24: [  93, 85, 72, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52 ],
	23: [  93, 85, 72, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52 ],
	22: [  85, 76, 72, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52 ],
	21: [  85, 76, 72, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 52 ],
	20: [  85, 76, 72, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	19: [  85, 76, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	18: [  85, 72, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56 ],
	17: [  81, 72, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56 ],
	16: [  81, 72, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56 ],
	15: [  81, 72, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56 ],
	14: [  81, 72, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	13: [  81, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	12: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	11: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	10: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56 ],
	 9: [  68, 60, 56, 56, 56, 56, 56, 56, 56 ],
	 8: [  68, 60, 52, 52, 52, 52, 52, 52 ],
};

const REWARDS_PERC_TO_KEY = {
	80: 81,
	70: 76,
	60: 72,
	50: 68,
	20: 56,
	10: 52,
};

console.assert(REWARDS_MATRIX[24][8 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[25][12 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[26][7 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[26][10 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[26][12 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[27][4 - 1] == REWARDS_PERC_TO_KEY[80]);
console.assert(REWARDS_MATRIX[27][6 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[27][11 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[27][15 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[27][17 - 1] == REWARDS_PERC_TO_KEY[20]);
console.assert(REWARDS_MATRIX[28][7 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[28][8 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[28][10 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[28][11 - 1] == REWARDS_PERC_TO_KEY[60]);
console.assert(REWARDS_MATRIX[28][13 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[28][15 - 1] == REWARDS_PERC_TO_KEY[50]);
console.assert(REWARDS_MATRIX[28][17 - 1] == REWARDS_PERC_TO_KEY[20]);

function renderRewards()
{
	document.getElementById("rewards").innerHTML = "";
	const participants = document.getElementById("reward-participants").value | 0;
	for (let i = 0; i != participants; ++i)
	{
		const rewards = REWARDS[REWARDS_MATRIX[participants][i]];

		const tr = document.createElement("tr");
		{
			const pos = (i + 1);

			const td = document.createElement("td");
			td.className = "pe-2";
			td.innerHTML = "<b>" + pos + "</b>" + ((pos == 1 || pos == 21) ? "st" : (pos == 2 || pos == 22) ? "nd" : "th");
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.className = "pe-2 text-end";
			td.textContent = rewards[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Bucks";
			tr.appendChild(td);
		}
		{
			const td = document.createElement("td");
			td.textContent = rewards[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " XP";
			tr.appendChild(td);
		}
		document.getElementById("rewards").appendChild(tr);
	}
}
renderRewards();
document.getElementById("reward-participants").onchange = renderRewards;
