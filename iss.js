const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Reponse: ${body}}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
    
    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status: ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    
    const { latitude, longitude } = parsedBody;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    
    const parsedBody = JSON.parse(body);
    callback(null, parsedBody.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // Get IP
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Reponse: ${body}}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;

    // Get Coords
    request(`http://ipwho.is/${ip}`, (error, response, body) => {
      if (error) return callback(error, null);
      
      const parsedBody = JSON.parse(body);

      if (!parsedBody.success) {
        const message = `Success status: ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        callback(Error(message), null);
        return;
      }
      
      const coords = { latitude, longitude } = parsedBody;
      
      // Get Times
      request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) return callback(error, null);

        if (response.statusCode !== 200) {
          callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
          return;
        }
        
        const parsedBody = JSON.parse(body);
        callback(null, parsedBody.response);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };