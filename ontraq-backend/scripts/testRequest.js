const axios = require("axios");

async function testTrack() {
  try {
    const res = await axios.post("http://localhost:5001/api/track", {
      userId: "demo",
      domain: "github.com",
      secondsSpent: 120,
    });
    console.log(res.data);
  } catch (err) {
    if (err.response) {
      console.error("❌ Response Error:", err.response.data);
    } else if (err.request) {
      console.error("❌ Request made but no response:", err.request);
    } else {
      console.error("❌ Error:", err.message);
    }
  }
}

testTrack();
