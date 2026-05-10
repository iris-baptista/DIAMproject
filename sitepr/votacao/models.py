from django.db import models

class Jogador(models.Model):  # nao sei se este e o nome mais adequado XD
    pass  # vai estar ligado a um utilizador do django para podermos ter outros campos

class Classificacao(models.Model):
    estrelhas= models.IntegerField() #sera q isto precisa de ser uma class?
    quem_classificou= models.ForeignKey(Jogador, on_delete=models.CASCADE)

class Desenvolvedor(models.Model):
    nome= models.CharField(max_length=200)
    classificacao= models.ForeignKey(Classificacao, on_delete=models.CASCADE)

class Jogo(models.Model):
    titulo= models.CharField(max_length=200)
    pub_data = models.DateTimeField('data de publicacao')
    dev= models.ForeignKey(Desenvolvedor, on_delete=models.CASCADE)
    classificacao= models.ForeignKey(Classificacao, on_delete=models.CASCADE)

class Lista(models.Model):
    tipo_lista= models.CharField(max_length=200) #ver se da para usar um Enum
    jogos= models.ForeignKey(Jogo, on_delete=models.CASCADE) #isto devia ser uma lista, nao um elemento
    jogador= models.ForeignKey(Jogador, on_delete=models.CASCADE)

class Colecao(models.Model):
    nome= models.CharField(max_length=200)
    jogos= models.ForeignKey(Jogo, on_delete=models.CASCADE) #mesma logica q "lista"
    jogador= models.ForeignKey(Jogador, on_delete=models.CASCADE)

class Nomeado(models.Model):
    jogo= models.ForeignKey(Jogo, on_delete=models.CASCADE)
    quem_nomeou= models.ForeignKey(Jogador, on_delete=models.CASCADE) #sao os jogadores a nomear?
    num_nomeacoes= models.IntegerField() #se calhar so ter este campo e nao o de cima
    #repetir categoria?

class Nomeacao(models.Model):
    categoria= models.CharField(max_length=200)
    nomeados= models.ForeignKey(Nomeado, on_delete=models.CASCADE) #precisa de ser lista
    #indicar quem escolheu os nomeados? tipo qual admin???
    votos= models.IntegerField()
    vencedor= models.BooleanField() #?

class Proeza(models.Model):
    nome= models.CharField(max_length=200)
    criterio= models.CharField(max_length=200) #?
    jogo= models.ForeignKey(Jogo, on_delete=models.CASCADE)
    #incluir %s como no steam?

class Noticia(models.Model):
    titulo= models.CharField(max_length=200)
    #ter admin autor?
    texto= models.TextField()
    pub_data= models.DateTimeField('data de publicacao')

class Evento(models.Model): #estes sao os q vao no calendario certo?
    titulo= models.CharField(max_length=200)
    descricao= models.TextField()
    data= models.DateTimeField('data do evento')
    dev= models.ForeignKey(Desenvolvedor, on_delete=models.CASCADE)

class Critica(models.Model): #tb temos criticas de devs?
    jogo= models.ForeignKey(Jogo, on_delete=models.CASCADE)
    critica= models.TextField()
    autor= models.ForeignKey(Jogador, on_delete=models.CASCADE)