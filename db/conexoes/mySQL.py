import mysql.connector
import pandas as pd
import numpy as np

config = {
  'user': 'mysql',
  'password': '#abc$878da454',
  'host': '127.0.0.1',
  'database': 'athon',
  'raise_on_warnings': True
}


class Conexao(object):
    def __init__(self, data):
        self._config = (config if data is None else data)
        self._connector = None
        self._cursor = None
        self.tabela = pd.DataFrame()

    def open(self):
        self._connector = mysql.connector.connect(user=self._config['user'],
                                                  password=self._config['password'],
                                                  host=self._config['host'],
                                                  database=self._config['database'],
                                                  raise_on_warnings=self._config['raise_on_warnings'])
        self._cursor = self._connector.cursor()

    def insert(self, sql, data):
        data = self.tratamento(data)
        self.open()

        if len(sql.split()) == 1:
            sql = 'INSERT INTO ' + sql
            fields = ' ('
            values = ' VALUES ('
            for key, _ in data.items():
                fields += key + ','
                values += '%(' + key + ')s,'
            fields = fields[:-1] + ')'
            values = values[:-1] + ')'
            sql = sql + fields + values

        self._cursor.execute(sql, data)
        self._connector.commit()
        self.close()

    def update(self, sql, data, **kwargs):
        data = self.tratamento(data)
        self.open()

        if len(sql.split()) == 1:
            sql = 'UPDATE ' + sql + ' SET '
            values = ' '
            for key, _ in data.items():
                values += key + '=%s, '
            values = values[:-2]
            sql = sql + values

        where = kwargs.get('where', None)
        if where is not None:
            if not 'WHERE' in where.upper():
                where = 'where ' + where
            sql = sql + ' ' + where

        self._cursor.execute(sql, tuple([d for d in data.values()]))
        self._connector.commit()
        self.close()

    def select(self, **kwargs):
        self.open()
        sql = kwargs.get('sql', None)
        if sql is None:
            sql = 'select '
            for campo in kwargs.get('campos'):
                sql += campo + ','
            sql = sql[:-1] + ' from ' + kwargs.get('tabela')
            where = kwargs.get('where', None)
            if where is not None:
                if not 'WHERE' in where.upper():
                    where = 'where ' + where
                sql = sql + ' ' + where

            limite = kwargs.get('limit', None)
            if limite is not None:
                if not 'LIMIT' in limite.upper():
                    limite = 'limit ' + limite
                sql = sql + ' ' + limite
        self._cursor.execute(sql)
        self.tabela = pd.DataFrame([[field for field in row] for row in self._cursor.fetchall()],
                                   columns=[cn for cn in self._cursor.column_names])
        self.close()

    def delete(self, sql, **kwargs):
        self.open()
        self._cursor.execute(sql)
        if kwargs.get('AUTO_INCREMENT', False):
            self._cursor.execute('ALTER TABLE {} AUTO_INCREMENT = 1'.format(sql[sql.upper().find("FROM")+4:]))
        self._connector.commit()
        self.close()

    def close(self):
        self._connector.close()

    def tratamento(self, data):
        for key, _ in data.items():
            if type(_) == np.int64:
                data[key] = int(data[key])
            if type(_) == np.float64:
                data[key] = float(data[key])
        return data


testeconexao = Conexao(None)
testeconexao.open()
testeconexao.close()