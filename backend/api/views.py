from rest_framework import  viewsets
from .models import Usuario, Painel, PermissaoUsuarioPainel, BaseCompromissos
from .serializers import UsuarioSerializer, PainelSerializer, PermissaoUsuarioPainelSerializer, BaseCompromissosSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
import pandas as pd

class UsuarioList(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class PainelList(generics.ListCreateAPIView):
    queryset = Painel.objects.all()
    serializer_class = PainelSerializer


class PainelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Painel.objects.all()
    serializer_class = PainelSerializer

class PermissaoUsuarioPainelList(generics.ListCreateAPIView):
    queryset = PermissaoUsuarioPainel.objects.all()
    serializer_class = PermissaoUsuarioPainelSerializer


class PermissaoUsuarioPainelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PermissaoUsuarioPainel.objects.all()
    serializer_class = PermissaoUsuarioPainelSerializer

class BaseCompromissosViewSet(viewsets.ModelViewSet):
    def get(self, request):
        BaseCompromissos.delete()
        csv_export_url  = 'https://docs.google.com/spreadsheets/d/1QvIHGu8ovZAo1m8PPJe0S1NgP5ZWTjipURufOzgIGzQ/export?format=csv&gid=1227780371#gid=1227780371'
        df = pd.read_csv(csv_export_url)
        for row in df.iterrows():
            BaseCompromissos(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], 
                                                 row[11], row[12], row[13], row[14], row[15], row[16])
            BaseCompromissos.save()
        return Response(status=status.HTTP_200_OK)

    def put(self, request):
        BaseCompromissos.delete()
        csv_export_url  = 'https://docs.google.com/spreadsheets/d/1QvIHGu8ovZAo1m8PPJe0S1NgP5ZWTjipURufOzgIGzQ/export?format=csv&gid=1227780371#gid=1227780371'
        df = pd.read_csv(csv_export_url)
        for row in df.iterrows():
            BaseCompromissos(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], 
                                                 row[11], row[12], row[13], row[14], row[15], row[16])
            BaseCompromissos.save()
        return Response(status=status.HTTP_200_OK)