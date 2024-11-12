
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFXwPtX6xPjQpb34Vr2aLH3A3G-1S4tXs",
  authDomain: "quiz-app-8c63e.firebaseapp.com",
  projectId: "quiz-app-8c63e",
  storageBucket: "quiz-app-8c63e.firebasestorage.app",
  messagingSenderId: "124320069183",
  appId: "1:124320069183:web:00f56266f3a02e449caa8a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication instance
const auth = firebase.auth();


document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);
      window.location.href = "quiz.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});


document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User created:', user);
    })
    .catch((error) => {
      alert("Sign up failed: " + error.message);
    });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // window.location.href = "index.html"; // Redirect to login page if not logged in
  }
});

// **Quiz Logic**
const questions = [
  { question: "Q1: HTML Stands for?", option1: "Hyper Text Markup Language", option2: "Hyper Tech Markup Language", option3: "Hyper Touch Markup Language", corrAnswer: "Hyper Text Markup Language" },
  { question: "CSS Stands for", option1: "Cascoding Style Sheets", option2: "Cascading Style Sheets", option3: "Cascating Style Sheets", corrAnswer: "Cascading Style Sheets" },
  { question: "Which tag is used for most large heading", option1: "<h6>", option2: "<h2>", option3: "<h1>", corrAnswer: "<h1>" },
  { question: "Which tag is used to make element unique", option1: "id", option2: "class", option3: "label", corrAnswer: "id" },
  { question: "Any element assigned with id, can be get in css", option1: "by # tag", option2: "by @ tag", option3: "by & tag", corrAnswer: "by # tag" },
  { question: "CSS can be used with ______ methods", option1: "8", option2: "3", option3: "4", corrAnswer: "3" },
  { question: "In JS variable types are ____________", option1: "6", option2: "3", option3: "8", corrAnswer: "8" },
  { question: "In array we can use key name and value", option1: "True", option2: "False", option3: "None of above", corrAnswer: "False" },
  { question: "toFixed() is used to define length of decimal", option1: "True", option2: "False", option3: "None of above", corrAnswer: "True" },
  { question: "push() method is used to add element in the start of array", option1: "True", option2: "False", option3: "None of above", corrAnswer: "False" }
];

// DOM elements for quiz
const questionElement = document.getElementById('ques');
const option1 = document.getElementById('opt1');
const option2 = document.getElementById('opt2');
const option3 = document.getElementById('opt3');
const timer = document.getElementById('timer');
const button = document.getElementById('btn');

let index = 0;
let score = 0;
let min = 2;
let sec = 0;

// Timer function
function timers() {
  timer.innerText = `${min}:${sec < 10 ? '0' + sec : sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 2;
      sec = 0;
      nextQuestion(); 
    }
  }
}


function resetTimer() {
  min = 2;
  sec = 0;
}


setInterval(timers, 1000);


function nextQuestion(){
  var options = document.getElementsByClassName('options');
  var button = document.getElementById('btn');
  
  for(var i = 0; i <options.length;i++){

     if(options[i].checked){
        var userSelectedInput = options[i].value;

        console.log(userSelectedInput);
        
        var getoptions = questions[index - 1][`option${userSelectedInput}`] ;

        var correctAnswer = questions[index - 1]['corrAnswer'];

      if(getoptions === correctAnswer){
          score++
      }
  
     }
      
      options[i].checked = false
  }

  button.disabled = true


  if (index >= questions.length) {
    const percentage = (score / questions.length) * 100;

    Swal.fire({
      title: percentage < 40 ? "You failed!" : "Good job!",
      text: `Your Final Score is ${percentage.toFixed(2)}%`,
      icon: percentage < 40 ? "error" : "success",
      timer: 10000,
      timerProgressBar: true, 
      willClose: () => {
        
        window.location.href = "index.html";
  }});
   
  } else {
    
    questionElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
    
    resetTimer();
  }
}


function clicked() {
  button.disabled = false;
}
