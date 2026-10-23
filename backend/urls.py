from django.contrib import admin
from django.urls import path, include
from django.conf import *
from django.conf.urls.static import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('api.urls'))
]


if settings.DEBUG:
    urlpatterns += static(
        prefix= settings.MEDIA_URL,
        document_root = settings.MEDIA_ROOT
    )