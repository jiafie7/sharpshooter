from django.http import JsonResponse
from django.contrib.auth import authenticate, login

def signIn(request):
    username = request.GET.get('username')
    password = request.GET.get('password')
    user = authenticate(request, username=username, password=password)
    if not user:
        return JsonResponse({
            "result": "Incorrect username or password"
        })
    else:
        login(request, user)
        return JsonResponse({
            "result": "success"
        })

