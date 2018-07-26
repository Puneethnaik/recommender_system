import numpy as np
import mysql.connector
class Recommender:
    def __init__(self, users, movies):
        self.users = users
        self.movies = movies
        self.db = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database="recommender_system"
        )
        self.cursor = self.db.cursor()
    def get_movie_user_matrix(self):
        self.matrix = np.zeros(shape=[self.users, self.movies])
        #get min and max ids of users
        query = 'select id from users'
        self.cursor.execute(query)
        result = self.cursor.fetchall()
        self.user_ids = list(map(lambda x : x[0], result))
        self.user_ids = list(np.random.permutation(self.user_ids))
        self.user_ids = self.user_ids[:self.users]

        self.mean_rating = {}
        for user_id in self.user_ids:
            query = 'select movieId, rating from ratings where userId = ' + str(user_id)
            self.cursor.execute(query)
            results = self.cursor.fetchall()

            for result in results:
                self.matrix[user_id][result[0]] = result[1]
            print(results)

        row_sum = self.matrix.sum(axis=1)
        for i in range(self.users):
            self.mean_rating[self.user_ids[i]] = row_sum[i]

        print(self.user_ids)
        print(self.mean_rating)
        print(self.matrix[:, 510:])




obj = Recommender(6, 1000)
obj.get_movie_user_matrix()