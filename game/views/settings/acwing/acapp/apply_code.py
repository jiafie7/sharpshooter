from random import randint
from urllib.parse import quote

from django.core.cache import cache
from django.http import JsonResponse


def get_state():
    res = ""
    for i in range(8):
        res += str(randint(0, 9))
    return res

# 向AcWing申请授权码Code
def apply_code(request):
    appid = "6791"
    redirect_uri = quote("http://127.0.0.1:8000/settings/acwing/acapp/receive_code/")
    scope = "userinfo"
    state = get_state()
    
    cache.set(state, True, 7200) # valid time 2 hours

    return JsonResponse({
        'result': "success",
        'appid': appid,
        'redirect_uri': redirect_uri,
        'scope': scope,
        'state': state
    })

    
