const axios2 = require("axios");

const BASE_URL = "http://localhost:3000/api";

let authToken;
let candidateId;
let interviewId;


const axios = {
  post: async(...args) => {
      try {
          const res = await axios2.post(...args)
          return res
      } catch (e) {
          return e.response
      }
  },

  get: async(...args) => {
      try {
          const res = await axios2.get(...args)
          return res
      } catch (e) {
          return e.response
      }
  },
  put: async(...args) => {
      try {
          const res = await axios2.put(...args)
          return res
      } catch (e) {
          return e.response
      }
  },
  delete: async(...args) => {
      try {
          const res = await axios2.delete(...args)
          return res
      } catch (e) {
          return e.response
      }
  }
}


/* -------------------- AUTH ROUTES -------------------- */
describe("Auth API", () => {
  let email;
  beforeAll(()=>{
    // Unique email for each test run
    email = `interviewer${Date.now()}@test.com`;

  })
  test("POST /auth/signup → register interviewer", async () => {
    console.log("Registering interviewer...");
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      name: "Test Interviewer",
      email: email,
      phone: "9999999999",
      password: "secret123",
    });
    expect(res.status).toBe(201);
    expect(res.data.message).toBe("User registered successfully");
  });

  test("POST /auth/signin → login interviewer", async () => {
    const res = await axios.post(`${BASE_URL}/auth/signin`, {
      email: email,
      password: "secret123",
    });

    console.log(res.data.token);
    expect(res.status).toBe(200);
    expect(res.data.token).toBeDefined();
    authToken = res.data.token;
  });
});

/* -------------------- CANDIDATE ROUTES -------------------- */
describe("Candidate API", () => {
  test("POST /candidate/upload → upload candidate", async () => {

    const email = `candidate${Date.now()}@test.com`; // Unique email for each test run
    const res = await axios.post(`${BASE_URL}/candidate/upload`, {
      name: "Test Candidate",
      email: email,
      phone: "1234567890",
      resumeText: "John Doe\nEmail: john.doe@gmail.com\nPhone: +91-9876543210\nApplied Position: Backend Developer"
      
    });

    console.log(res.data);
    expect(res.status).toBe(201);
    expect(res.data.user).toBeDefined();
    candidateId = res.data.user._id;
  });
});

/* -------------------- INTERVIEWER ROUTES -------------------- */
describe("Interviewer API", () => {
  test("GET /interviewer/details → list candidates", async () => {
    const res = await axios.get(`${BASE_URL}/interviewer/candidates`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(res.status, res.data);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.candidates)).toBe(true);
  });
/**
 * 
 * TODO here : ye test ko chalana hai
 * candiate ka data defined nhi hai usko check karo
 */
  test("GET /interviewer/candidate/:id → get candidate details", async () => {  
    const res = await axios.get(`${BASE_URL}/interviewer/candidate/${candidateId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    expect(res.status).toBe(200);
    expect(res.data.candidate).toBeDefined();
    expect(res.data.candidate._id).toBe(candidateId);
  });
});


/* -------------------- INTERVIEW FLOW -------------------- */
describe("Interview Flow API", () => {
  test("POST /interview/start → generate questions", async () => {
    const res = await axios.post(`${BASE_URL}/interview/start`, {
      candidateId,
      context: "React + Node.js developer",
    });

    expect(res.status).toBe(200);
    expect(res.data.questions).toBeDefined();
    expect(res.data.questions.length).toBeGreaterThan(0);
    interviewId = res.data.interviewId;
  });

  test("POST /interview/answer → score answer", async () => {
    const res = await axios.post(`${BASE_URL}/interview/answer`, {
      interviewId,
      qid: "q1",
      question: "What is a closure in JS?",
      answerText: "A closure is a function with preserved scope in JavaScript.",
    });

    expect(res.status).toBe(200);
    expect(res.data.score).toBeDefined();
    expect(res.data.summary).toBeDefined();
  });

  test("POST /interview/finish → final summary", async () => {
    const res = await axios.post(`${BASE_URL}/interview/finish`, {
      interviewId,
    });

    expect(res.status).toBe(200);
    expect(res.data.totalScore).toBeDefined();
    expect(res.data.summary).toBeDefined();
  });
});
