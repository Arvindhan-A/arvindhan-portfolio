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

@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    # strict-transport-security is usually handled by the web server (Nginx/Cloudflare) but can be added here
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

@app.route('/api/data')
def get_data():
    """Endpoint to get data as JSON if needed for dynamic frontend updates"""
    return jsonify(load_data())

if __name__ == '__main__':
    app.run(debug=True,port=2323)
