from django.db import models
from django.contrib.auth.models import User

class NivelPermissao(models.IntegerChoices):
    ALTO = 3, 'Alto'
    MEDIO = 2, 'Medio'
    BAIXO = 1, 'Baixo'

class Painel (models.Model):
    nome = models.CharField(max_length=100, blank=True, default='')
    descricao = models.CharField(max_length=100, blank=True, default='')
    
    def __str__(self):
        return self.nome + " " + self.descricao

class PermissaoUsuarioPainel (models.Model):
    usuario = models.ForeignKey(
        User,
        null=False,
        on_delete=models.PROTECT
    )
    painel = models.ForeignKey(
        Painel,
        null=False,
        on_delete=models.PROTECT
    )
    nivelPermissao = models.IntegerField(blank=False, choices=NivelPermissao.choices)
    def __str__(self):
        return self.usuario.nome + " " + self.painel.nome + " " + self.nivelPermissao


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

