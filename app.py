from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

def load_data():
    try:
        with open('data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

@app.route('/')
def home():
    data = load_data()
    return render_template('home.html', data=data)

@app.route('/api/data')
def get_data():
    """Endpoint to get data as JSON if needed for dynamic frontend updates"""
    return jsonify(load_data())

if __name__ == '__main__':
    app.run(debug=True,port=2323)
