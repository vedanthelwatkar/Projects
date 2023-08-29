import os
import openai
from flask import Flask, redirect, render_template, request, url_for

messages = []
result = []

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        user_input = request.form["text"]
        messages.append(user_input)
        bot_response = generate_response(user_input)
        result.append(bot_response)
        print('Identified text:', user_input)
        return redirect(url_for("index"))

    return render_template("index.html", result=result, messages=messages)


@app.route("/chat", methods=("GET", "POST"))
def chat():
    if request.method == "POST":
        user_input = request.form["text"]
        messages.append(user_input)
        bot_response = generate_response(user_input)
        result.append(bot_response)
        return redirect(url_for("chat"))

    return render_template("chat.html", result=result, messages=messages)

def generate_response(user_input):
    prompt = "User: {}\nChatGPT:".format(user_input)
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.6,
        max_tokens=50,
    )
    bot_response = response.choices[0].text.strip()
    return bot_response


if __name__ == "__main__":
    app.run(debug=True,use_reloader=True)
