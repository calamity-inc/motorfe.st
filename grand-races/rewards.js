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
	68: [68850, 36720], // "+50%"; 39,312 XP with 12% difficulty bonus, 42,552 XP with +15% from main stage & 45,792 XP with +30% from main stage; 38,664 XP with 9% difficulty bonus
	60: [60750, 32400],
	56: [56700, 30240], // "+20%"; 32,832 XP with 12% difficulty bonus & 39,312 XP with an additional +30% from main stage; 32,184 XP with 9% difficulty bonus
	52: [52650, 28079], // "+10%"; 30,672 XP with 12% difficulty bonus
};

const REWARDS_MATRIX = {
	//    #1   #2  #3  #4  #5  #6  #7  #8  #9 #10 #11 #12 #13 #14 #15 #16 #17 #18 #19 #20 #21 #22 #23 #24 #25 #26 #27 #28
	28: [ 101, 85, 81, 81, 81, 72, 72, 72, 72, 72, 72, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52, 52 ],
	27: [  93, 85, 81, 81, 81, 72, 72, 72, 72, 72, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52 ],
	26: [  93, 85, 81, 81, 81, 72, 72, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52, 52 ],
	25: [  93, 85, 81, 81, 72, 72, 72, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52, 52 ],
	24: [  93, 85, 72, 72, 72, 72, 72, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52, 52 ],
	23: [  93, 85, 72, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52, 52 ],
	22: [  85, 76, 72, 68, 68, 68, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 52, 52 ],
	21: [  85, 76, 72, 68, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 52 ],
	20: [  85, 76, 72, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	19: [  85, 76, 68, 68, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	18: [  85, 72, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	17: [  81, 72, 68, 68, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	16: [  81, 72, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	15: [  81, 72, 68, 68, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	14: [  81, 72, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	13: [  81, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	12: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	11: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56, 56 ],
	10: [  68, 60, 56, 56, 56, 56, 56, 56, 56, 56 ],
	 9: [  68, 60, 56, 56, 56, 56, 56, 56, 56 ],
	 8: [  68, 60, 52, 52, 52, 52, 52, 52 ],
};

console.assert(REWARDS_MATRIX[16][5 - 1] == 56);
console.assert(REWARDS_MATRIX[18][7 - 1] == 56);
console.assert(REWARDS_MATRIX[20][9 - 1] == 56);
console.assert(REWARDS_MATRIX[21][11 - 1] == 56);
console.assert(REWARDS_MATRIX[21][12 - 1] == 56);
console.assert(REWARDS_MATRIX[22][15 - 1] == 56);
console.assert(REWARDS_MATRIX[23][10 - 1] == 68);
console.assert(REWARDS_MATRIX[24][7 - 1] == 72);
console.assert(REWARDS_MATRIX[24][8 - 1] == 68);
console.assert(REWARDS_MATRIX[24][12 - 1] == 68);
console.assert(REWARDS_MATRIX[24][15 - 1] == 56);
console.assert(REWARDS_MATRIX[25][5 - 1] == 72);
console.assert(REWARDS_MATRIX[25][11 - 1] == 68);
console.assert(REWARDS_MATRIX[25][12 - 1] == 68);
console.assert(REWARDS_MATRIX[25][14 - 1] == 56);
console.assert(REWARDS_MATRIX[26][7 - 1] == 72);
console.assert(REWARDS_MATRIX[26][8 - 1] == 68);
console.assert(REWARDS_MATRIX[26][10 - 1] == 68);
console.assert(REWARDS_MATRIX[26][12 - 1] == 68);
console.assert(REWARDS_MATRIX[26][17 - 1] == 56);
console.assert(REWARDS_MATRIX[27][4 - 1] == 81);
console.assert(REWARDS_MATRIX[27][6 - 1] == 72);
console.assert(REWARDS_MATRIX[27][11 - 1] == 68);
console.assert(REWARDS_MATRIX[27][15 - 1] == 68);
console.assert(REWARDS_MATRIX[27][16 - 1] == 56);
console.assert(REWARDS_MATRIX[27][17 - 1] == 56);
console.assert(REWARDS_MATRIX[27][21 - 1] == 56);
console.assert(REWARDS_MATRIX[28][5 - 1] == 81);
console.assert(REWARDS_MATRIX[28][7 - 1] == 72);
console.assert(REWARDS_MATRIX[28][8 - 1] == 72);
console.assert(REWARDS_MATRIX[28][10 - 1] == 72);
console.assert(REWARDS_MATRIX[28][11 - 1] == 72);
console.assert(REWARDS_MATRIX[28][13 - 1] == 68);
console.assert(REWARDS_MATRIX[28][15 - 1] == 68);
console.assert(REWARDS_MATRIX[28][17 - 1] == 56);

function getPositionSuffix(pos)
{
	if (pos < 10 || pos >= 20)
	{
		const last_digit = pos % 10;
		if (last_digit == 1)
		{
			return "st";
		}
		if (last_digit == 2)
		{
			return "nd";
		}
		if (last_digit == 3)
		{
			return "rd";
		}
	}
	return "th";
}

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
			td.innerHTML = "<b>" + pos + "</b>" + getPositionSuffix(pos);
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
