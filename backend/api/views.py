
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Painel, Usuario, BaseCompromissos, NivelPermissao
from django.contrib.auth import logout
from .serializers import UsuarioSerializer, PainelSerializer, BaseCompromissosSerializer
import pandas as pd
import json


class UsuarioList(generics.ListCreateAPIView):

    permission_classes = [AllowAny]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [AllowAny]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PainelList(generics.ListCreateAPIView):

    permission_classes = [AllowAny]

    queryset = Painel.objects.all()
    serializer_class = PainelSerializer


class PainelDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [AllowAny]

    queryset = Painel.objects.all()
    serializer_class = PainelSerializer

class BaseCompromissosView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):

        baseCompromissos = BaseCompromissos.objects.all()
        serializer = BaseCompromissosSerializer(baseCompromissos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):

        self.delete(self, request)

        csv_export_url  = 'https://docs.google.com/spreadsheets/d/1QvIHGu8ovZAo1m8PPJe0S1NgP5ZWTjipURufOzgIGzQ/export?format=csv&gid=1227780371#gid=1227780371'
       
        df = pd.read_csv(csv_export_url, encoding='UTF-8')

        df.drop(columns=['indice'], inplace=True ) 

        df.rename(columns={"1" : "indice",
                      "ID" : "identificador",
                      "COMPROMISSO" : "compromisso", 
                      "EIXO": "eixo",
                      "ÁREA_PLANO_DE_GOVERNO" : "areaPanoGoverno",
                      "GRUPO" : "grupo",
                      "ÓRGÃO" : "orgao",
                      "PARTICIPA" : "participa",
                      "G1" : "g1",
                      "NATUREZA" : "natureza",
                      "100_DIAS" : "cem_dias",
                      "200_DIAS" : "duzentos_dias",
                      "300_DIAS" : "trezentos_dias",
                      "600_DIAS" : "seisentos_dias",
                      "730_dias" : "setecentos_trinta_dias",
                      "PREVISÃO_final2025" : "previsao_final"
                      }, inplace=True)
        
        df.set_index('indice', inplace=True)

        #df.to_csv('resultado.csv')

        for row_tuple in df.itertuples():
            bc = BaseCompromissos(indice=row_tuple[0], identificador=row_tuple[1], compromisso=row_tuple[2], eixo=row_tuple[3], areaPanoGoverno=row_tuple[4], grupo=row_tuple[5], orgao=row_tuple[6], participa=row_tuple[7], g1=row_tuple[8], 
                             natureza=row_tuple[9], cem_dias=row_tuple[10], duzentos_dias=row_tuple[11], trezentos_dias=row_tuple[12], seisentos_dias=row_tuple[13], setecentos_trinta_dias=row_tuple[14], previsao_final=row_tuple[15]) 
            bc.save() 
        
        return Response(status=status.HTTP_200_OK)
    
    def delete(self, request):
        BaseCompromissos.objects.all().delete()
        return Response(status=status.HTTP_200_OK)

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        # Your authentication logic here
        user = authenticate(username=request.data['username'], password=request.data['password'])

        if user:
            token, created = Token.objects.get_or_create(user=user)

            return Response({   'token': token.key,
                                'username': user.username,
                                'id' : user.pk})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
        
class UsuarioLogadoView(APIView):
    permission_classes = [IsAuthenticated] # <-- And here

    def get(self, request):
        usuario = request.user
        serializer = UsuarioSerializer(usuario, many=False)
        
        print(serializer.data)

        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"status": "Logged out"})
    

class NivelPermissaoView(APIView):
    
    permission_classes = [AllowAny]

    enum_dict = {nivel.value: nivel.name for nivel in NivelPermissao}

    json_string = json.dumps(enum_dict)

    def get(self, request):
        return Response(self.json_string)