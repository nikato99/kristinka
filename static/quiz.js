document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { id: 'name', question: "What's your name?" },
        // Add the rest of your questions here
    ];

    let currentQuestionIndex = 0;
    const form = document.getElementById('quiz-form');
    const questionContainer = document.getElementById('question-container');

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionContainer.innerHTML = `<label for="${question.id}">${question.question}</label>
                                        <input type="text" id="${question.id}" name="${question.id}">`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Collect the answer
        const formData = new FormData(form);
        const answers = {};
        formData.forEach((value, key) => { answers[key] = value; });

        // Submit answers for validation
        fetch('/submit', {
            method: 'POST',
            body: JSON.stringify(answers),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                window.location.href = data.redirect_url; // Redirect to the surprise
            } else {
                alert(data.message); // Show error message
                // Optionally, move to the next question or reset
            }
        });
    });

    // Initially show the first question
    showQuestion();
});
