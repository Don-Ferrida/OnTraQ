const productiveSites = [
  "github.com",
  "stackoverflow.com",
  "w3schools.com",
  "google.com",
  "leetcode.com",
];

module.exports = function classify(domain) {
  return productiveSites.includes(domain) ? "productive" : "unproductive";
};
