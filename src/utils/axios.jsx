import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDA0YjE4YWVmMDA4ZWNiYmJiZmI1NDMyZjY5NDYzNSIsIm5iZiI6MTcyNzM2MzEzMy43MjkzNTYsInN1YiI6IjY2ZDE2MGYxZWE3M2E0ZmUxMDk0MzJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eBhpi6o0gq8TtTtHCvpb-flwd3naDexAwLmEsoIM1-c'
      }
})

export default instance;