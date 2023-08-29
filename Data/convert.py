import pandas as pd
import json

with open('jsondata.json', encoding='utf-8') as json_file:
    data = json.load(json_file)

df = pd.DataFrame(data)

df.to_csv('data.csv', index=False)
