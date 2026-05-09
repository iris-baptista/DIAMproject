from votacao.models import Questao, Opcao
from django.utils import timezone

########################### Funcoes ###########################
#alinha a)
def create_question(questao_texto, lista_de_opcoes):
    q = Questao.objects.create(
        questao_texto=questao_texto,
        pub_data=timezone.now()
    )

    for opcao in lista_de_opcoes:
        Opcao.objects.create(
            questao=q,
            opcao_texto=opcao[0],
            votos=opcao[1]
        )

    return q

#alinha c)
def delete_all_questions():
    Questao.objects.all().delete()

#alinha d)
def mostrar_questao(questao):
    print(questao.questao_texto)
    for opcao in questao.opcao_set.all():
        print(opcao.opcao_texto,opcao.votos)

    print("") #para ter um espaco

#alinha e)
def mostrar_todas():
    for questao in Questao.objects.all():
        mostrar_questao(questao)

#alinha f)
def questao_starts_with(prefix):
    resultados= Questao.objects.filter(questao_texto__startswith=prefix)

    if(resultados.count()==0):
        print("Não existem questões com esse prefixo")
    else:
        print("Questões que começãm com 'Qual':")
        for r in resultados:
            print(r.questao_texto)

    print("")

#alinha g)
def mostrar_opcao_popular(questao):
    maior_num_votos= -1
    opcao_mais_votos= []

    for opcao in questao.opcao_set.all():
        # print(opcao_mais_votos)
        if(opcao.votos>maior_num_votos):
            maior_num_votos = opcao.votos
            opcao_mais_votos= [opcao]
        elif(opcao.votos==maior_num_votos):
            opcao_mais_votos.append(opcao)

    print(questao.questao_texto)
    for m in opcao_mais_votos:
        print(m.opcao_texto, m.votos)

    print("")  # para ter um espaco

def total_votos():
    total= 0
    for q in Questao.objects.all():
        for o in q.opcao_set.all():
            total += o.votos

    return total

########################### Main ###########################
#alinha c)
delete_all_questions() #no inicio para apagar testes anteriores

#alinha b)
o1= [["Azul", 9], ["Rosa", 3]]
o2= [["Piriquito", 2], ["Cão", 7], ["Gato", 5]]
o3= [["Um código que contém diversos estilos pré-definidos", 8], ["Uma linguagem de programação", 2],
     ["Um servidor web", 0], ["Uma base de dados", 0]]
o4= [["Guardar dados numa base de dados", 1],
     ["Criar rotas num servidor", 1], ["Fazer pedidos HTTP", 2], ["Definir o aspeto visual de uma página", 7]]

create_question("Qual é a tua cor favorita?", o1)
create_question("Qual é o teu animal de estimacao favorito?", o2)
create_question("O que são Frameworks CSS?", o3)
create_question("Para que serve o CSS?", o4)

#alinha d)+e)
print("e)")
mostrar_todas()

#alinha f)
print("f)")
questao_starts_with("Qual")

#alinha g)
print("g)")
for q in Questao.objects.all():
    mostrar_opcao_popular(q)

#alinha h)
print("h)")
print("Total de votos na base de dados:", total_votos())