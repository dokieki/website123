from .config import Config
from os import chdir
from flask import Flask, render_template
from flask_assets import Environment, Bundle
from json import load
from datetime import datetime

def create_app():
	chdir(Config.BASE_DIR);

	app = Flask(__name__);
	assets = Environment(app);

	assets.init_app(app);

	app.config['ASSETS_DEBUG'] = True

	app.debug = True;

	@app.route('/')
	def index():
		data = load(open('data.json', 'r'));
		file = 'index.html';
		files = {
			12: 'day/christmas.html',
			1: 'day/christmas.html'
		};

		try:
			file = files[datetime.now().month];
		except KeyError:
			file = 'index.html';

		return render_template(file,
			contacts = data['contacts'],
			projects = data['projects'],
			music = data['music'],
			love = data['love'],
			bablo = data['bablo'],
			price = data['price']
		);

	@app.route('/lite')
	def lite():
		return render_template('lite.html');

	return app;