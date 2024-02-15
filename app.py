from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/submit_name', methods=['POST'])
def submit_name():
    name = request.form['name'].capitalize()
    if name == 'Кристина':
        return redirect(url_for('quiz'))  # Assuming 'quiz' is the route for your main quiz page
    else:
        return redirect(url_for('no_access'))

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')  # Make sure you have this template

@app.route('/no_access')
def no_access():
    return render_template('noaccess.html')  # Make sure you have this template

@app.route('/welldone')
def welldone():
    return render_template('welldone.html')


if __name__ == '__main__':
    app.run(debug=True)
