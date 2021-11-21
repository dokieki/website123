from .config import Config
from os import chdir
from flask import Flask, render_template
from flask_assets import Environment, Bundle
from json import load

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

		return render_template('index.html',
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