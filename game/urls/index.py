from django.urls import path, include
from game.views import index

urlpatterns = [
    path("", index.index, name="index"),
    path("menu/", include("game.urls.menu.index")),
    path("playground/", include("game.urls.playground.index")),
    path("settings/", include("game.urls.settings.index")),
]
