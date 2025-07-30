
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
from .Authentication import token_expire_handler, expires_in
from rest_framework.status import (
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)


class UsuarioList(generics.ListCreateAPIView):

    permission_classes = [AllowAny]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PainelList(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Painel.objects.all()
    serializer_class = PainelSerializer


class PainelDetail(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Painel.objects.all()
    serializer_class = PainelSerializer

class BaseCompromissosView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        baseCompromissos = BaseCompromissos.objects.all()
        serializer = BaseCompromissosSerializer(baseCompromissos, many=True)
        
        eixo = BaseCompromissos.objects.values('eixo').distinct()
        jsonEixo = ''
        if(eixo is not None) :
            listaEixo = []
            for obj in eixo.iterator():
                listaEixo.append(obj['eixo'])
            jsonEixo = json.dumps(listaEixo, indent=4, ensure_ascii=False)
  
        areaPlanoGoverno = BaseCompromissos.objects.values('areaPlanoGoverno').distinct()
        jsonAreaPlanoGoverno = ''
        if(areaPlanoGoverno is not None) :
            listasAreaPlanoGoverno = []
            for obj in areaPlanoGoverno.iterator():
                listasAreaPlanoGoverno.append(obj['areaPlanoGoverno'])
            jsonAreaPlanoGoverno = json.dumps(listasAreaPlanoGoverno, indent=4, ensure_ascii=False)

        grupo = BaseCompromissos.objects.values('grupo').distinct()
        jsonGrupo = ''
        if(grupo is not None) :
            listaGrupo = []
            for obj in grupo.iterator():
                listaGrupo.append(obj['grupo'])
            jsonGrupo = json.dumps(listaGrupo, indent=4, ensure_ascii=False)

        orgao = BaseCompromissos.objects.values('orgao').distinct()
        jsonOrgao = ''
        listaOrgaos = []
        if(orgao is not None) :
            for obj in orgao.iterator():
                listaOrgaos.append(obj['orgao'])
            jsonOrgao = json.dumps(listaOrgaos, indent=4, ensure_ascii=False)

        natureza = BaseCompromissos.objects.values('natureza').distinct()
        listaNatureza = []
        jsonNatureza = ''
        if(natureza is not None) :
            for obj in natureza.iterator():
                listaNatureza.append(obj['natureza'])
            jsonNatureza = json.dumps(listaNatureza, indent=4, ensure_ascii=False)

        cemDias = BaseCompromissos.objects.values('cem_dias').distinct()
        listaCemDias = []
        jsonCemDias = ''
        if(cemDias is not None) :
            for obj in cemDias.iterator():
                listaCemDias.append(obj['cem_dias'])
            jsonCemDias = json.dumps(listaCemDias, indent=4, ensure_ascii=False)

        duzentosDias = BaseCompromissos.objects.values('duzentos_dias').distinct()
        listaDuzentosDias = []
        jsonDuzentosDias = ''
        if(cemDias is not None) :
            for obj in duzentosDias.iterator():
                listaDuzentosDias.append(obj['duzentos_dias'])
            jsonDuzentosDias = json.dumps(listaDuzentosDias, indent=4, ensure_ascii=False)

        trezentosDias = BaseCompromissos.objects.values('trezentos_dias').distinct()
        listaTrenzentosDias = []
        jsonTrenzentosDias = ''
        if(trezentosDias is not None) :
            for obj in trezentosDias.iterator():
                listaTrenzentosDias.append(obj['trezentos_dias'])
            jsonTrenzentosDias = json.dumps(listaTrenzentosDias, indent=4, ensure_ascii=False)

        seisentosDias = BaseCompromissos.objects.values('seisentos_dias').distinct()
        listaSeisentosDias = []
        jsonSeisentosDias = ''
        if(seisentosDias is not None) :
            for obj in seisentosDias.iterator():
                listaSeisentosDias.append(obj['seisentos_dias'])
            jsonSeisentosDias = json.dumps(listaSeisentosDias, indent=4, ensure_ascii=False)

        setecentosTrintaDias = BaseCompromissos.objects.values('setecentos_trinta_dias').distinct()
        jsonSetecentosTrintaDias = ''
        if(setecentosTrintaDias is not None) :
            listaSetecentosTrintaDias = []
            for obj in setecentosTrintaDias.iterator():
                listaSetecentosTrintaDias.append(obj['setecentos_trinta_dias'])
            jsonSetecentosTrintaDias = json.dumps(listaSetecentosTrintaDias, indent=4, ensure_ascii=False)

        previsaoFinal = BaseCompromissos.objects.values('previsao_final').distinct()
        listaPrevisaoFinal = []
        jsonPrevisaoFinal = ''
        if(previsaoFinal is not None) :
            for obj in previsaoFinal.iterator():
                listaPrevisaoFinal.append(obj['previsao_final'])
            jsonPrevisaoFinal = json.dumps(listaPrevisaoFinal, indent=4, ensure_ascii=False)

        return Response({'base' : serializer.data,
                         'dominioEixo' :  jsonEixo,
                         'dominioAreaPlanoGoverno' : jsonAreaPlanoGoverno,
                         'dominioGrupo' : jsonGrupo,
                         'dominioOrgao' : jsonOrgao,
                         'dominioNatureza' : jsonNatureza,
                         'dominioCemDias' : jsonCemDias,
                         'dominioDuzentosDias' : jsonDuzentosDias,
                         'dominioTrezentosDias' : jsonTrenzentosDias,
                         'dominioSeisentos' : jsonSeisentosDias,
                         'dominioSetecentosTrinta' : jsonSeisentosDias,
                         'dominioPrevisaoFinal' : jsonSetecentosTrintaDias,
                         'dominioPrevisaoFinal' :  jsonPrevisaoFinal,
                         }, status=status.HTTP_200_OK)

    def put(self, request):

        csv_export_url  = 'https://docs.google.com/spreadsheets/d/1QvIHGu8ovZAo1m8PPJe0S1NgP5ZWTjipURufOzgIGzQ/export?format=csv&gid=1227780371#gid=1227780371'
       
        df = pd.read_csv(csv_export_url, encoding='UTF-8')

        df.drop(columns=['indice'], inplace=True ) 

        df.rename(columns={"1" : "indice",
                      "ID" : "identificador",
                      "COMPROMISSO" : "compromisso", 
                      "EIXO": "eixo",
                      "ÁREA_PLANO_DE_GOVERNO" : "areaPlanoGoverno",
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

        df['cem_dias'] = df['cem_dias'].replace({'NÃO AVALIADO': 'nan', 'N': 'nan'})

        BaseCompromissos.objects.all().delete()
        
        for row_tuple in df.itertuples():
            bc = BaseCompromissos(indice=row_tuple[0], identificador=row_tuple[1], compromisso=row_tuple[2], eixo=row_tuple[3], areaPlanoGoverno=row_tuple[4], grupo=row_tuple[5], orgao=row_tuple[6], participa=row_tuple[7], g1=row_tuple[8], 
                             natureza=row_tuple[9], cem_dias= row_tuple[10], duzentos_dias=row_tuple[11], trezentos_dias=row_tuple[12], seisentos_dias=row_tuple[13], setecentos_trinta_dias=row_tuple[14], previsao_final=row_tuple[15]) 
            bc.save() 
        
        return Response({'Base de compromissos atualizada'},status=status.HTTP_200_OK)

class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        user = authenticate(username=request.data['username'], password=request.data['password'])

        if not user:
            return Response({'detail': 'Invalid Credentials or activate account'}, status=HTTP_404_NOT_FOUND)
           
        token, created = Token.objects.get_or_create(user=user)

        #token_expire_handler will check, if the token is expired it will generate new one
        is_expired, token = token_expire_handler(token)     # The implementation will be described further
        user_serialized = UsuarioSerializer(user)

        return Response({
            'user': user_serialized.data, 
            'expires_in': expires_in(token),
            'token': token.key,
            'isSuperUser' : user.is_superuser == None if False else user.is_superuser
            
        }, status=HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        
        request.user.auth_token.delete()
       
        logout(request)
        return Response(status=HTTP_200_OK)
    

class NivelPermissaoView(APIView):
    
    permission_classes = [IsAuthenticated]

    enum_dict = {nivel.value: nivel.name for nivel in NivelPermissao}

    json_string = json.dumps(enum_dict)

    def get(self, request):
        return Response({self.json_string})
    
    
