import openai

openai.api_key = "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"
def askToChatGPT(messages):
    try:
        resp = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            messages = messages
        )
        return {"status":"ok", "answer": resp["choices"][0]["message"]["content"], "token_count": resp['usage']['total_tokens']}
    except Exception as ex:
        return {"status":"fail", "error" : ex}