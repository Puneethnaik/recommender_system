import Recommender
import sys

'''
    this is the bridge between nodejs and python
    arguments made by the nodejs backend
    :argv1 : userID
    :argv2 : number of neighboring users needed
    :argv3 : number of movies
    :argv4 : the number of movies required recommended
'''
recommenderObject = Recommender.Recommender(sys.argv[2], sys.argv[3], sys.argv[1])

print(recommenderObject.recommend_movies(sys.argv[4]))
sys.stdout.flush()