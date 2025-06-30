from .models import Usuario, Painel, PermissaoUsuarioPainel, BaseCompromissos
from rest_framework import serializers


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nome', 'matricula', 'senha', 'email']


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