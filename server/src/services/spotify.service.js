import axios from "axios";

function getSpotifyToken() {
  return new Promise((resolve, reject) => {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.MUSIC_API_CLIENT_ID +
              ":" +
              process.env.MUSIC_API_CLIENT_SECRET
          ).toString("base64"),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body.access_token);
      } else {
        reject("Error obtaining token");
      }
    });
  });
}

module.exports = { getSpotifyToken };
