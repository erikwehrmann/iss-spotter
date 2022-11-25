const { nextISSTimesForMyLocation } = require('./iss_promised');

const printTimes = function(times) {
  for (const time of times) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((times) => {
    printTimes(times);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });