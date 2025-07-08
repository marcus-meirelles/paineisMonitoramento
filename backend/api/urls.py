from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

from api import views

urlpatterns = [

    path('usuarios/', views.UsuarioList.as_view()),
    path('usuario/<int:pk>/', views.UsuarioDetail.as_view()),
    path('paineis/', views.PainelList.as_view()),
    path('painel/<int:pk>/', views.PainelDetail.as_view()),
    path('baseCompromissos/', views.BaseCompromissosView.as_view()),
    path('usuario-logado/', views.UsuarioLogadoView.as_view(), name='usuario_logado'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('signin/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),

]

urlpatterns = format_suffix_patterns(urlpatterns)