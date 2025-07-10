from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class NivelPermissao(models.IntegerChoices):
    ALTO = 3, 'Alto'
    MEDIO = 2, 'Medio'
    BAIXO = 1, 'Baixo'

class Painel (models.Model):
    nome = models.CharField(max_length=100, blank=True, default='')
    descricao = models.CharField(max_length=100, blank=True, default='')
    nivelPermissao = models.IntegerField(blank=False, choices=NivelPermissao.choices)

    def __str__(self):
        return self.nome + " " + self.descricao + " " + str(self.nivelPermissao)

class Usuario(AbstractUser):
    id = models.AutoField(primary_key=True, editable=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    nivelPermissao = models.IntegerField(blank=True, null=True, choices=NivelPermissao.choices)
    USERNAME_FIELD = 'username'
    first_name = None
    last_name = None
    def __str__(self):
        return str(self.id) +" "+ self.username + " " + self.email + " " + str(self.nivelPermissao)

class BaseCompromissos (models.Model):
    indice = models.IntegerField(null=True,  blank=True)
    identificador = models.CharField(max_length=10, null=True,  blank=True)
    compromisso = models.TextField(max_length=10, null=True,  blank=True)
    eixo = models.CharField(max_length=100, null=True,  blank=True)
    areaPanoGoverno = models.CharField(max_length=100, null=True,  blank=True)
    grupo = models.CharField(max_length=50, null=True,  blank=True)
    orgao = models.CharField(max_length=50, null=True,  blank=True)
    participa = models.CharField(max_length=100, null=True,  blank=True)
    g1 = models.CharField(max_length=10, null=True,  blank=True)
    natureza = models.CharField(max_length=50, null=True,  blank=True)
    cem_dias =  models.CharField(max_length=50, null=True,  blank=True)
    duzentos_dias = models.CharField(max_length=10, null=True,  blank=True)
    trezentos_dias = models.CharField(max_length=10, null=True,  blank=True)
    seisentos_dias = models.CharField(max_length=10, null=True,  blank=True)
    setecentos_trinta_dias = models.CharField(max_length=10, null=True,  blank=True)
    previsao_final = models.CharField(max_length=10, null=True,  blank=True)

    def __str__(self):
        return str(self.indice) +", "+ str(self.identificador) +", "+ str(self.compromisso) +", "+ str(self.eixo) +", "+ str(self.areaPanoGoverno) +", "+ str(self.grupo) +", "+ str(self.orgao) +", "+ str(self.participa)  +", "+ str(self.g1) +", "+ str(self.natureza) +", "+ str(self.cem_dias) +", "+ str(self.duzentos_dias)  +", "+ str(self.trezentos_dias) +", "+ str(self.seisentos_dias) +", "+ str(self.setecentos_trinta_dias) +", "+ str(self.previsao_final)

