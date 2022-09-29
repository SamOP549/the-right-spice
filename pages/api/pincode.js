// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pincodes = {
      "226003": ["Lucknow", "Uttar Pradesh"],
      "226017": ["Lucknow", "Uttar Pradesh"],
      "603203": ["Kattankulathur", "Tami Nadu"]
    }
    res.status(200).json(pincodes)
  }
  