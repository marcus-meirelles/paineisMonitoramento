from .models import Painel, Usuario, BaseCompromissos
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'})
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'password', 'nivelPermissao', 'is_superuser', 'is_active')
        
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UsuarioSerializer, self).create(validated_data)

class PainelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Painel
        fields = ['nome', 'descricao', 'nivelPermissao']

class BaseCompromissosSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseCompromissos
        fields = '__all__'

