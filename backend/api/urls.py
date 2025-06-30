from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
    path('usuarios/', views.UsuarioList.as_view()),
    path('usuario/<int:pk>/', views.UsuarioDetail.as_view()),
    path('paineis/', views.PainelList.as_view()),
    path('painel/<int:pk>/', views.PainelDetail.as_view()),
    path('permissaoUsuarioPaineis/', views.PermissaoUsuarioPainelList.as_view()),
    path('permissaoUsuarioPainel/<int:pk>/', views.PermissaoUsuarioPainelDetail.as_view()),
    path('baseCompromissos/', views.BaseCompromissosViewSet.as_view()),


]

urlpatterns = format_suffix_patterns(urlpatterns)