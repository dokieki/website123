from flask import Flask, render_template
from json import load

app = Flask(__name__);

@app.route('/')
def index():
	data = load(open('data.json', 'r'));

	return render_template('index.html',
		contacts = data['contacts'],
		projects = data['projects'],
		music = data['music'],
		love = data['love'],
		bablo = data['bablo']
	);

@app.route('/lite')
def lite():
	return render_template('lite.html');

app.run(port = 5287, host = 'localhost', debug = True);
