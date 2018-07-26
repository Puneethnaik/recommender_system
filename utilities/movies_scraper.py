import beautiful_soup_wrapper as BSWrapper
url = "https://www.imdb.com/chart/top"
parser = BSWrapper.Parser(url, env = "development")
parser.extract()
movies = parser.search('table', {'class' : ['chart',  'full-width']})
tbody = parser.searchChild(movies, "tbody", {'class' : ['lister-list']})
tr_s = parser.searchChildren(tbody, "tr", {})

for tr in tr_s:
    td = parser.searchChild(tr, "td", {'class' : ['titleColumn']})
    target = parser.searchChild(td, "a", {})
    print("processed")
    print("movie name ", target.text , "movie title" + target['title'])
    # print("------------end------------------")

