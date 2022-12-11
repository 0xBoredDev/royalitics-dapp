import moment from "moment";

export const getFeeDataPoints = (data) => {
  //console.log("getFeeDataPoints");
  let labels = [];
  let temp = [];
  let collectedDataPoints = [];
  let uncollectedDataPoints = [];

  let firstDay = parseFloat(data[data.length - 1].day);
  let lastDay = parseFloat(data[0].day);
  let currentMonth = moment().format("MMM");

  for (let i = firstDay; i <= lastDay; i++) {
    labels.push(`${currentMonth} ${i}`);
    temp.push({ day: i, collected: 0, uncollected: 0 });
  }

  //console.log(data);

  data.forEach((d) => {
    temp.find((i) => i.day == d.day).collected += d.royaltiesCollected;
    temp.find((i) => i.day == d.day).uncollected += d.royaltiesUnCollected;
  });

  temp.forEach((t) => {
    collectedDataPoints.push(t.collected);
    uncollectedDataPoints.push(t.uncollected);
  });

  //console.log(labels, collectedDataPoints, uncollectedDataPoints);
  return { labels, collectedDataPoints, uncollectedDataPoints };
};
