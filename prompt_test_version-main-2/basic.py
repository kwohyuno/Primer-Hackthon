import random
import openai
import re
#  각자 발급받은 키를 입력하세요.
openai.api_key = "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"




# 대화 내용을 추적하는 리스트 초기화




# chatGPT에 문의하는 함수. 리턴값으로 답변과 현재 사용된 토큰수를 돌려줍니다.
def askToChatGPT(msg):
   try:
       resp = openai.ChatCompletion.create(
           model = "gpt-3.5-turbo",
           messages = msg
       )


       return {"answer": resp["choices"][0]["message"]["content"], "token_count": resp['usage']['total_tokens']}
   except Exception as ex:
       return {"error" : ex}

def makeSSML(msg):
    # SSML 태그를 만들어 줍니다.
   try:
       resp = openai.ChatCompletion.create(
           model = "gpt-3.5-turbo",
           messages = msg
       )
       return {"answer": resp["choices"][0]["message"]["content"], "token_count": resp['usage']['total_tokens']}
   except Exception as ex:
       return {"error" : ex}



{
    "language":["japanese","english"],
    "cafe_menu_list":["Spiced Yam Capuccino","Apple Cider","S'Mores Latte","Avocado Toast","Breakfast Sandwich"],
    "cafe_menu_price":["$5","$4.5","$5.5","$11","$8.5"],
    "city":["New York","London","Sydney","Dublin","Tokyo"],
    "employee gender":["man","woman"],
    "personality":["overly-kind", "good-mannered", "cold", "bad-mannered","in-a-hurry"],
    "messages":[
        "you are a cafe manager.",
       "you have {menu_num} menus. The menus and price are {cafe_menu_list} and {cafe_menu_price}.",
        "your personality is {manager_character}.",
        "always say in {selected_lang}",
        "Let's start now. You say 'Can I take your order?' in {selected_lang} first. Be careful not to include another foreign language.",
        "The customer is currently in the cafe.",
        "you do not understand if the customer does not speak in {selected_lang}",
        "during the conversation, payment method and for here or to go is important.",
        "do not include 'swipe machine provided' in the conversation.",
        "you never say you are a bot but pretend you are a cafe manager.",
        "you always speak with more than one sentence."
        "your personality excludes any negative ones like angry, annoyed, indifferent, cold, rude.",
        "Use {selected_lang} only.",
        "The following is the start of conversation with customer and start with one sentences."
    ]
}




# 지원하는 언어 종류 - 이 언어로 답변하게 합니다.
selected_language = ["japanese","english"]
#selected_lang = random.choice(selected_language) # 위 언어 중 하나를 미리 선정. 혹은 고정 사용.
selected_lang = "english"


# 랜덤하게 부여할 내용을 이곳에 정의합니다.
# 실제 서비스에서는 외부의 저장소에서 가져올 데이터들입니다.

             
cafe_menu_list = ["Spiced Yam Capuccino","Apple Cider","S'Mores Latte","Avocado Toast","Breakfast Sandwich"]
cafe_menu_price = ["$5","$4.5","$5.5","$11","$8.5"]    # 지역별로 다르게 해야 할 듯. -_-a
manager_character = ["a bit hot-headed and cold", "good-humoured", "too much talker", "bad-mannered"]
keyword_in_conversation = ["payment method","for here or to go"]
banned_keyword_in_conversation = ["bot", "*"]
# chatGPT에게 적용할 롤을 여기에 정의합니다.
# 가능한 짧고 명확히 롤을 부여해야 하며
# 랜덤하게 롤이 변경될 수 있도록 해줍니다.
define_bot_role = "you are a cafe manager."


# 성별, 지역별 인물, 감정 표현에 필요한 모든 데이터를 여기 정리합니다.
# https://cloud.google.com/text-to-speech/docs/phonemes?hl=ko

# 메뉴 설정 단계
menu_num = len(cafe_menu_list)
define_bot_role += "you have 5 menus. The menus and price are "
for value in range(0,menu_num):
   menu = random.choice(cafe_menu_list)
   cafe_menu_list.remove(menu)
   define_bot_role += menu + " and price is " + random.choice(cafe_menu_price)
   if value == menu_num-1:
       define_bot_role += "."
   else:
       define_bot_role += ","

# 카페 매니저의 캐릭터 설정
define_bot_role += "your personality is " + random.choice(manager_character) + "."
# 그 외 기본 세팅
# define_bot_role += "Express your feelings just one word inside the () symbol once at the end of your sentence."
# 랜덤하게 할 사항은 아니고... 샘플로 언어를 넣어 봤습니다.
define_bot_role += "always say in " + selected_lang +"."
# 시작할 때 유저가 먼저 말하는게 아니고 chatGPT가 먼저 인사하게 만듭니다.
define_bot_role += "Let's start now. You say 'Can I take your order?' in "+ selected_lang + " first."
# 고객이 이미 카페 안에 있다고 가정합니다 (방문해서 알아보세요라는 대답 방지 )
define_bot_role += "The customer is currently in the cafe."
# 외국어로 말하면 잘 모르겠다고(이해를 못하겠다고) 답변
define_bot_role += "you do not understand if the customer does not speak in " + selected_lang + "."
# 포장 여부 혹은 결제 방법 꼭 물어보기 
define_bot_role += "during the conversation, payment method and for here or to go is important."
define_bot_role += "do not include 'swipe machine provided' in the conversation."


messages = []
messages.append({"role":"system", "content": define_bot_role})
# 항상 상기시켜야 하는 내용들?
# 이후 4096을 넘어갔을 때 다시 한번 상기시켜야 함.
notice_msg = "you never say you are a bot but pretend you are a cafe manager."
# notice_msg += "your personality excludes any negative ones like angry, annoyed, indifferent, cold, rude."
notice_msg += "if order was made or payment method was set or for take-out was decided, include '@' at the end of your reply for once."
notice_msg += "Use "+selected_lang+" only."
notice_msg += "The following is the start of conversation with customer and start with 2 sentences."
# notice_msg += "everytime express your feelings just one word inside the () symbol once at the end of your sentence."
# notice_msg += "Make your sentences with ssml tags include your feelings."
messages.append({"role":"user", "content": notice_msg})


# print("bot setting =", define_bot_role)


# 대화를 진행하며 선별적으로 화면에 출력할 수 있다.
# 예를들어 사용자의 주문이 완료되었는지를 물어보는 질문을 던진 후
# 그 응답은 출력도, 저장도 하지 않을 수 있음.
response = askToChatGPT(messages)
# print(response)
print(response)
print("\n" + response["answer"] + "(" + str(response["token_count"]) + ")\n")


while input:
   message = input("")
   messages.append({"role":"user", "content": message})
   response = askToChatGPT(messages)
   if "error" in response.keys():
       print("\n error : 에러 발생. 다시 시도 요망! "+ response["error"])
   else:
       # 대화 내용을 계속 붙여준다.
       messages.append({"role":"assistant", "content": response["answer"]})
       if response["token_count"] > 3000:
           #너무 길어졌다. 정리해야 함.
           del messages[2:-6]
       feeling = re.findall('\((.*?)\)', response["answer"])
       answer = re.sub(r'\([^)]*\)', '', response["answer"])
       print("\n" + answer + "\n")
       #print("\n          feeling = " + feeling[0] , ", token = " + str(response["token_count"]) + "\n")
       print("\n           token = " + str(response["token_count"]) + "\n")
