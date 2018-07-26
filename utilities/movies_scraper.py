import beautiful_soup_wrapper as BSWrapper
import pySQL
url = "https://www.imdb.com/chart/top"
parser = BSWrapper.Parser(url, env = "development")
parser.extract()
movies = parser.search('table', {'class' : ['chart',  'full-width']})
tbody = parser.searchChild(movies, "tbody", {'class' : ['lister-list']})
tr_s = parser.searchChildren(tbody, "tr", {})

movies = []

for tr in tr_s:
    td = parser.searchChild(tr, "td", {'class' : ['titleColumn']})
    target = parser.searchChild(td, "a", {})
    print("processed")
    print("movie name ", target.text , "movie title" + target['title'])
    # print("------------end------------------")
    movies.append({
        'title' : target.text,
        'cast' : target['title']
    })


pySQLObj = pySQL.pySQL()
pySQLObj.connect({
    'host' : "localhost",
    'user' : "root",
    "password" : "",
    "database" : "recommender_system"
})
pySQLObj.from_dicts(movies, "movies")
pySQLObj.commit_and_close()
