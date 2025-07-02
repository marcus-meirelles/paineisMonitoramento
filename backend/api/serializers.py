from .models import Painel, PermissaoUsuarioPainel, BaseCompromissos
from django.contrib.auth.models import User
from rest_framework import serializers



class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


class PainelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Painel
        fields = ['nome', 'descricao']

class PermissaoUsuarioPainelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissaoUsuarioPainel
        fields = ['usuario', 'painel', 'nivelPermissao']

class BaseCompromissosSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseCompromissos
        fields = '__all__'

