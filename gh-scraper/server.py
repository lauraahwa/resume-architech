from flask import Flask, jsonify
from flask import request

app = Flask(__name__)

import db
from scraper import get_repos
import json
import pandas as pd
from vectorize import sort_by_similarity, embed_data

@app.route("/getprojects")
def getprojects():
    username = request.args.get('username')

    existing_user = db.db.collection.find_one({"username": username})
    if existing_user == None or 'repos' not in existing_user:
        repos = get_repos(username)
        db.db.collection.insert_one({"username": username, "repos": repos})
        return jsonify(repos)
    else:
        return jsonify(existing_user['repos'])

@app.route("/generatebullets")
def genbullets():
    return "generating!!"

@app.route("/sortbullets")
def getmostsimilar():
    data = []
    with open("dummydata.json", "r") as f:
        json_data = json.load(f)
        for project in json_data:
            for bullet in json_data[project]['bullets']:
                data.append((bullet, json_data[project]['title']))
    data = pd.DataFrame(data, columns=["bullet", "title"])

    job_desc = open("dummyjob.txt", "r").read()

    return sort_by_similarity(job_desc, embed_data(data)).to_json()



if __name__ == '__main__':
    app.run(port=8000)