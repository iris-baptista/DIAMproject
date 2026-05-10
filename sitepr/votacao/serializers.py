from rest_framework import serializers
from .models import *

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model= Jogador
        fields= ('id')

class ClassificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Classificacao
        fields= ('id', 'estrelhas', 'quem_classificou')

class DesenvolvedorSerializer(serializers.ModelSerializer):
    class Meta:
        model= Desenvolvedor
        fields= ('id', 'nome', 'classificacao')

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = ('id', 'titulo', 'pub_data', 'dev', 'classificacao')

class ListaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lista
        fields = ('id', 'tipo_lista', 'jogos', 'jogador')

class ColecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colecao
        fields = ('id', 'nome', 'jogos', 'jogador')

class NomeadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomeado
        fields = ('id', 'jogo', 'quem_nomeou', 'num_nomeacoes')

class NomeacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomeacao
        fields = ('id', 'categoria', 'nomeados', 'votos', 'vencedor')

class ProezaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proeza
        fields = ('id', 'nome', 'criterio', 'jogo')

class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = ('id', 'titulo', 'texto', 'pub_data')

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'titulo', 'descricao', 'data', 'dev')

class CriticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Critica
        fields = ('id', 'jogo', 'critica', 'autor')