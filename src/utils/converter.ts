import moment from "moment";

export const getFeeDataPoints = (data) => {
  console.log("getFeeDataPoints");
  let labels = [];
  let temp = [];
  let collectedDataPoints = [];
  let uncollectedDataPoints = [];

  let currentDay = parseFloat(moment().format("D"));
  let currentMonth = moment().format("MMM");

  for (let i = 1; i <= currentDay; i++) {
    labels.push(`${currentMonth} ${i}`);
    temp.push({ d: i, collected: 0, uncollected: 0 });
  }

  data.forEach((d) => {
    let day = d.day;
    console.log(day);
    if (day <= temp.length) {
      temp[day - 1].collected += d.royaltiesCollected;
      temp[day - 1].uncollected += d.royaltiesUnCollected;
    }
  });

  temp.forEach((t) => {
    collectedDataPoints.push(t.collected);
    uncollectedDataPoints.push(t.uncollected);
  });

  console.log(labels, collectedDataPoints, uncollectedDataPoints);
  return { labels, collectedDataPoints, uncollectedDataPoints };
};
