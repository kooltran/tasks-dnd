import axios from "axios";

const getTasks = () => {
  return axios
    .get("https://mocki.io/v1/f35b1928-289b-4294-ad6a-bbb5a2b77c80")
    .then((res) => res.data);
};

export { getTasks };
