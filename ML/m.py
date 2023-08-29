import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv("mail_data.csv")
print(data)

x = data["Category"]
y = data["Message"]
plt.scatter(x,y)
plt.xlabel("category")
plt.ylabel("messages")
plt.show()