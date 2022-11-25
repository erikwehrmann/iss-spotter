const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP('174.116.1.165', (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log("It worked! Returned Coords:", data);
// });

// fetchISSFlyOverTimes({ latitude: 45.4215296, longitude: -75.6971931 }, (error, times) => {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", times);
// });

const printTimes = function(times) {
  for (const time of times) {
    const date = new Date(0);
    date.setUTCSeconds(time.risetime);
    const duration = time.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printTimes(times);
})
