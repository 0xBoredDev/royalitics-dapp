import moment from "moment";

export const getFeeDataPoints = (data) => {
  let labels = [];
  let temp = [];
  let collectedDataPoints = [];
  let uncollectedDataPoints = [];
  let firstDay = parseFloat(data[data.length - 1].day);
  let lastDay = parseFloat(data[0].day);
  let firstMonth = moment(data[data.length - 1].timestamp).format("MMM");
  let currentMonth = moment().format("MMM");
  //This is only needed to sample data....
  if (firstMonth !== currentMonth) {
    currentMonth = firstMonth;
  }

  for (let i = firstDay; i <= lastDay; i++) {
    labels.push(`${currentMonth} ${i}`);
    temp.push({ day: i, collected: 0, uncollected: 0 });
  }

  //console.log(data);

  for (let d of data) {
    temp.find((i) => i.day == d.day).collected += d.royaltiesCollected;
    temp.find((i) => i.day == d.day).uncollected += d.royaltiesUnCollected;
  }

  temp.forEach((t) => {
    collectedDataPoints.push(t.collected);
    uncollectedDataPoints.push(t.uncollected);
  });

  //console.log(labels, collectedDataPoints, uncollectedDataPoints);
  return { labels, collectedDataPoints, uncollectedDataPoints };
};
