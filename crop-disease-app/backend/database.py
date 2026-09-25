import mysql.connector


def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Honey@2007",
        database="cropcare"
    )

    return connection