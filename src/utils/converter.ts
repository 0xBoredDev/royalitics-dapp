import moment from "moment";

export const getFeeDataPoints = (data, daysnumber) => {
  let temp = {};
  let labels = [];

  data.forEach(function (d) {
    let date_daysago = moment().utc().add(-daysnumber, "days").format();
    let daysdiff = moment(d.time).diff(moment(date_daysago), "days");

    if (temp.hasOwnProperty(daysdiff)) {
      temp[daysdiff] = temp[daysdiff] + d.royalty_fee;
    } else {
      temp[daysdiff] = d.royalty_fee;
      labels.push(d.time.split("T")[0]);
    }
  });

  var feeDataPoints = [];

  for (var point in temp) {
    feeDataPoints.push(temp[point]);
  }

  console.log(labels, feeDataPoints);
  return { labels, feeDataPoints };
};
