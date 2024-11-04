document.getElementById('startQuizButton').addEventListener('click', function() {
    loadQuestions();
    document.getElementById('startQuizButton').style.display = 'none'; // Hide the start button
    document.querySelector('.questions-container').style.display = 'block'; // Show the questions container
    document.querySelector('.next-question').style.display = 'block'; // Show the next question button
});

let currentQuestionIndex = 0;
let totalQuestions = 10; // Adjusted to match the number of questions
let questionsToLoad = [];
let incorrectAttempts = 0; // Track incorrect attempts
let correctAnswers = 0; // Track correct answers

// Define players and their teams with correct associations
const players = [
    {
        id: 1,
        question: "Batting Average",
        player_name: "Gunnar Henderson",
        player_link: "https://www.mlb.com/player/gunnar-henderson-683002",
        team: "Orioles"
    },
    {
        id: 2,
        question: "Home Run Ratio",
        player_name: "Cedric Mullins",
        player_link: "https://www.mlb.com/player/cedric-mullins-666211",
        team: "Orioles"
    },
    {
        id: 3,
        question: "Three-Point Shots",
        player_name: "Devin Booker",
        player_link: "https://www.nba.com/player/1626164/devin-booker",
        team: "Suns"
    },
    {
        id: 4,
        question: "Passing Completion Rate",
        player_name: "Josh Allen",
        player_link: "https://www.nfl.com/players/josh-allen/",
        team: "Bills"
    },
    {
        id: 5,
        question: "Field Goal Percentage",
        player_name: "Chris Paul",
        player_link: "https://www.nba.com/player/101108/chris-paul",
        team: "Suns"
    },
    {
        id: 6,
        question: "Free Throw Percentage",
        player_name: "Mikal Bridges",
        player_link: "https://www.nba.com/player/1628969/mikal-bridges",
        team: "Suns"
    },
    {
        id: 7,
        question: "Rebound Average",
        player_name: "Deandre Ayton",
        player_link: "https://www.nba.com/player/1629028/deandre-ayton",
        team: "Suns"
    },
    {
        id: 8,
        question: "Home Run Ratio", // Changed to a relevant baseball question
        player_name: "Trey Mancini",
        player_link: "https://www.mlb.com/player/trey-mancini-641820",
        team: "Orioles"
    },
    {
        id: 9,
        question: "Steal Success Rate",
        player_name: "Ricky Henderson",
        player_link: "https://www.mlb.com/player/rickey-henderson-116682",
        team: "Athletics"
    },
    {
        id: 10,
        question: "Assist to Turnover Ratio",
        player_name: "Steve Nash",
        player_link: "https://www.nba.com/player/959",
        team: "Suns"
    }
];

// Function to generate random values for questions
function generateRandomQuestion(player) {
    let description, correctAnswer, steps;

    switch (player.question) {
        case "Batting Average":
            const hits = Math.floor(Math.random() * 50) + 10;
            const atBats = Math.floor(Math.random() * 100) + 50;
            const battingAverage = (hits / atBats).toFixed(3);
            description = `${player.player_name} gets ${hits} hits in ${atBats} at-bats. What is his batting average?`;
            correctAnswer = parseFloat(battingAverage);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the batting average.`,
                `Step 2: Use the formula <span class="highlight">x = hits / at-bats</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = ${hits} / ${atBats}</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${(hits / atBats).toFixed(5)}</span>.`,
                `Step 5: Round to three decimal places: <span class="highlight">x = ${battingAverage}</span>.`
            ];
            break;
        case "Home Run Ratio":
            const homeRuns = Math.floor(Math.random() * 30) + 5;
            const games = Math.floor(Math.random() * 100) + 50;
            const homeRunRatio = (homeRuns / games).toFixed(3);
            description = `${player.player_name} hits ${homeRuns} home runs in ${games} games. What is his home run ratio?`;
            correctAnswer = parseFloat(homeRunRatio);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the home run ratio.`,
                `Step 2: Use the formula <span class="highlight">x = home runs / games</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = ${homeRuns} / ${games}</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${(homeRuns / games).toFixed(5)}</span>.`,
                `Step 5: Round to three decimal places: <span class="highlight">x = ${homeRunRatio}</span>.`
            ];
            break;
        case "Three-Point Shots":
            const threePointers = Math.floor(Math.random() * 100) + 50;
            const attempts = Math.floor(Math.random() * 200) + 100;
            const threePointPercentage = ((threePointers / attempts) * 100).toFixed(1);
            description = `${player.player_name} makes ${threePointers} three-point shots out of ${attempts} attempts. What is his three-point shooting percentage?`;
            correctAnswer = parseFloat(threePointPercentage);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the three-point shooting percentage.`,
                `Step 2: Use the formula <span class="highlight">x = (three-pointers made / attempts) * 100</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = (${threePointers} / ${attempts}) * 100</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${threePointPercentage}</span>.`
            ];
            break;
        case "Passing Completion Rate":
            const completions = Math.floor(Math.random() * 300) + 100;
            const passAttempts = Math.floor(Math.random() * 500) + 200;
            const completionRate = ((completions / passAttempts) * 100).toFixed(1);
            description = `${player.player_name} completes ${completions} passes out of ${passAttempts} attempts. What is his passing completion rate?`;
            correctAnswer = parseFloat(completionRate);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the passing completion rate.`,
                `Step 2: Use the formula <span class="highlight">x = (completions / attempts) * 100</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = (${completions} / ${passAttempts}) * 100</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${completionRate}</span>.`
            ];
            break;
        case "Field Goal Percentage":
            const fieldGoalsMade = Math.floor(Math.random() * 100) + 50;
            const fieldGoalAttempts = Math.floor(Math.random() * 200) + 100;
            const fieldGoalPercentage = ((fieldGoalsMade / fieldGoalAttempts) * 100).toFixed(1);
            description = `${player.player_name} makes ${fieldGoalsMade} field goals out of ${fieldGoalAttempts} attempts. What is his field goal percentage?`;
            correctAnswer = parseFloat(fieldGoalPercentage);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the field goal percentage.`,
                `Step 2: Use the formula <span class="highlight">x = (field goals made / attempts) * 100</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = (${fieldGoalsMade} / ${fieldGoalAttempts}) * 100</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${fieldGoalPercentage}</span>.`
            ];
            break;
        case "Free Throw Percentage":
            const freeThrowsMade = Math.floor(Math.random() * 50) + 20;
            const freeThrowAttempts = Math.floor(Math.random() * 100) + 50;
            const freeThrowPercentage = ((freeThrowsMade / freeThrowAttempts) * 100).toFixed(1);
            description = `${player.player_name} makes ${freeThrowsMade} free throws out of ${freeThrowAttempts} attempts. What is his free throw percentage?`;
            correctAnswer = parseFloat(freeThrowPercentage);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the free throw percentage.`,
                `Step 2: Use the formula <span class="highlight">x = (free throws made / attempts) * 100</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = (${freeThrowsMade} / ${freeThrowAttempts}) * 100</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${freeThrowPercentage}</span>.`
            ];
            break;
        case "Rebound Average":
            const totalRebounds = Math.floor(Math.random() * 500) + 100;
            const gamesPlayed = Math.floor(Math.random() * 50) + 20;
            const reboundAverage = (totalRebounds / gamesPlayed).toFixed(2);
            description = `${player.player_name} collects ${totalRebounds} rebounds over ${gamesPlayed} games. What is his average rebounds per game?`;
            correctAnswer = parseFloat(reboundAverage);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the average rebounds per game.`,
                `Step 2: Use the formula <span class="highlight">x = total rebounds / games played</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = ${totalRebounds} / ${gamesPlayed}</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${reboundAverage}</span>.`
            ];
            break;
        case "Steal Success Rate":
            const successfulSteals = Math.floor(Math.random() * 30) + 10;
            const totalStealAttempts = Math.floor(Math.random() * 50) + 20;
            const stealSuccessRate = ((successfulSteals / totalStealAttempts) * 100).toFixed(1);
            description = `${player.player_name} successfully steals ${successfulSteals} bases out of ${totalStealAttempts} attempts. What is his steal success rate?`;
            correctAnswer = parseFloat(stealSuccessRate);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the steal success rate.`,
                `Step 2: Use the formula <span class="highlight">x = (successful steals / total attempts) * 100</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = (${successfulSteals} / ${totalStealAttempts}) * 100</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${stealSuccessRate}</span>.`
            ];
            break;
        case "Assist to Turnover Ratio":
            const assists = Math.floor(Math.random() * 100) + 50;
            const turnovers = Math.floor(Math.random() * 20) + 5;
            const assistToTurnoverRatio = (assists / turnovers).toFixed(2);
            description = `${player.player_name} has ${assists} assists and ${turnovers} turnovers. What is his assist to turnover ratio?`;
            correctAnswer = parseFloat(assistToTurnoverRatio);
            steps = [
                `Step 1: Let <span class="highlight">x</span> represent the assist to turnover ratio.`,
                `Step 2: Use the formula <span class="highlight">x = assists / turnovers</span>.`,
                `Step 3: Substitute the values: <span class="highlight">x = ${assists} / ${turnovers}</span>.`,
                `Step 4: Calculate <span class="highlight">x = ${assistToTurnoverRatio}</span>.`
            ];
            break;
        default:
            console.warn(`No case for question type: ${player.question}`);
            return null;
    }

    return {
        "id": player.id,
        "question": player.question,
        "player_name": player.player_name,
        "player_link": player.player_link,
        "description": description,
        "correct_answer": correctAnswer,
        "steps": steps
    };
}

// Load questions and start the quiz
function loadQuestions() {
    questionsToLoad = players.map(player => generateRandomQuestion(player)).filter(q => q !== null);
    console.log(`Loaded Questions: ${questionsToLoad.length}`);
    currentQuestionIndex = 0;
    showQuestion();
    document.querySelector('.next-question').disabled = true; // Disable next question button initially
}

// Show the current question
function showQuestion() {
    const question = questionsToLoad[currentQuestionIndex];
    const container = document.querySelector('.questions-container');
    container.innerHTML = `
        <div class="question">
            <strong>Question ${currentQuestionIndex + 1} of ${totalQuestions}: ${question.question}</strong>
            <p>${question.player_name}: ${question.description}</p>
            <a href="${question.player_link}" target="_blank">Learn more about ${question.player_name}</a>
            <div class="input-answer">
                <input type="text" id="input${question.id}" placeholder="Enter your answer here">
                <button onclick="checkAnswer(${question.id}, ${question.correct_answer})">Check Answer</button>
                <button onclick="showSolution(${question.id})" style="display: none;" id="showSolution${question.id}">Show Answer</button>
            </div>
            <div id="feedback${question.id}" class="feedback"></div>
            <div id="steps${question.id}" class="steps" style="display: none;"></div>
        </div>
    `;
    document.querySelector('.next-question').disabled = true; // Disable until answered
    incorrectAttempts = 0; // Reset incorrect attempts for the new question
}

// Check the user's answer
function checkAnswer(questionId, correctAnswer) {
    const userAnswer = parseFloat(document.getElementById(`input${questionId}`).value);
    const feedback = document.getElementById(`feedback${questionId}`);
    const steps = document.getElementById(`steps${questionId}`);
    
    if (isNaN(userAnswer)) {
        feedback.textContent = "Please enter a valid number.";
        feedback.style.color = "red";
        return;
    }

    if (Math.abs(userAnswer - correctAnswer) < 0.01) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        steps.innerHTML = questionsToLoad[currentQuestionIndex].steps.map(step => `<p>${step}</p>`).join('');
        steps.style.display = 'block'; // Show solution steps
        document.querySelector('.next-question').disabled = false; // Enable next question button
        correctAnswers++;
    } else {
        feedback.textContent = "Incorrect, try again!";
        feedback.style.color = "red";
        steps.style.display = 'none'; // Hide solution steps
        incorrectAttempts++;
        if (incorrectAttempts >= 2) {
            document.getElementById(`showSolution${questionId}`).style.display = 'inline'; // Show "Show Answer" button
        }
    }
}

// Show the solution for the current question
function showSolution(questionId) {
    const steps = document.getElementById(`steps${questionId}`);
    steps.innerHTML = questionsToLoad[currentQuestionIndex].steps.map(step => `<p>${step}</p>`).join('');
    steps.style.display = 'block'; // Show solution steps
    document.querySelector('.next-question').disabled = false; // Enable next question button
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    console.log(`Current Question Index: ${currentQuestionIndex}, Total Questions: ${questionsToLoad.length}`);
    if (currentQuestionIndex < questionsToLoad.length) {
        showQuestion();
    } else {
        generateReportCard();
    }
}

// Generate a report card at the end of the quiz
function generateReportCard() {
    const reportWindow = window.open('', 'Report Card', 'width=600,height=400');
    reportWindow.document.write(`
        <html>
        <head>
            <title>Report Card</title>
            <style>
                body { font-family: 'Roboto', sans-serif; padding: 20px; }
                h1 { text-align: center; }
                .report-card { border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
                .score { font-size: 24px; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>Mikey's Report Card</h1>
            <div class="report-card">
                <p class="score">Score: ${correctAnswers} out of ${totalQuestions}</p>
                <p>Great job, Mikey! Keep practicing and you'll get even better!</p>
            </div>
        </body>
        </html>
    `);
    reportWindow.document.close();
}