from django.db import models

class NivelPermissao(models.IntegerChoices):
    ALTO = 3, 'Alto'
    MEDIO = 2, 'Medio'
    BAIXO = 1, 'Baixo'

class Usuario (models.Model):
    nome = models.CharField(max_length=100, blank=True, default='')
    matricula = models.CharField(max_length=100, blank=True, default='')
    senha = models.CharField(max_length=10)
    email = models.EmailField(max_length=254)
    def __str__(self):
        return self.nome + " " + self.matricula + " " + self.senha + " " + self.email

class Painel (models.Model):
    nome = models.CharField(max_length=100, blank=True, default='')
    descricao = models.CharField(max_length=100, blank=True, default='')
    
    def __str__(self):
        return self.nome + " " + self.descricao

class PermissaoUsuarioPainel (models.Model):
    usuario = models.ForeignKey(
        Usuario,
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
    indice = models.IntegerField()
    identificador = models.CharField(max_length=10)
    compromisso = models.TextField(max_length=10)
    eixo = models.CharField(max_length=50)
    areaPanoGoverno = models.CharField(max_length=50)
    grupo = models.CharField(max_length=25)
    orgao = models.CharField(max_length=15)
    participa = models.CharField(max_length=50)
    g1 = models.CharField(max_length=5)
    natureza = models.CharField(max_length=15)
    cem_dias =  models.CharField(max_length=15)
    duzentos_dias = models.CharField(max_length=5)
    trezentos_dias = models.CharField(max_length=5)
    seisentos_dias = models.CharField(max_length=5)
    setecentos_trinta_dias = models.CharField(max_length=5)
    previsao_final = models.CharField(max_length=5)

    def __init__(self, indice, identificador, compromisso, eixo, areaPanoGoverno, grupo, orgao, participa, g1, 
                 natureza, cem_dias, duzentos_dias, trezentos_dias, seisentos_dias, setecentos_trinta_dias, previsao_final):
        self.indice = indice
        self.identificador = identificador
        self.compromisso = compromisso
        self.eixo = eixo
        self.areaPanoGoverno = areaPanoGoverno
        self.grupo = grupo
        self.orgao = orgao
        self.participa = participa
        self.g1 = g1
        self.natureza = natureza
        self.cem_dias = cem_dias
        self.duzentos_dias = duzentos_dias
        self.trezentos_dias = trezentos_dias
        self.seisentos_dias= seisentos_dias
        self.setecentos_trinta_dias = setecentos_trinta_dias
        self.previsao_final = previsao_final

