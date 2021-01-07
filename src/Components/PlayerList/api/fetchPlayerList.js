import axios from "axios";

export const playerData = async () => {
  return await axios
    .get(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json"
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
