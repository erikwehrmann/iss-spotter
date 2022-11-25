const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP('174.116.1.165', (error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("It worked! Returned Coords:", data);
});

fetchISSFlyOverTimes({ latitude: 45.4215296, longitude: -75.6971931 }, (error, times) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log("It worked! Returned flyover times:", times);
})
