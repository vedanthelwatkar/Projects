import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report
import warnings
import pickle

warnings.filterwarnings("ignore")

data = pd.read_csv("mail_data.csv")
res = data.isnull().sum()

data.loc[data['Category'] == 'spam', 'Category'] = 0
data.loc[data['Category'] == 'ham', 'Category'] = 1

features = data["Message"]
target = data["Category"]

x_train,x_test,y_train,y_test = train_test_split(features,target,test_size=0.2,random_state=3)

feature_extraction = TfidfVectorizer(min_df=1,stop_words='english',lowercase=True)

x_train_features = feature_extraction.fit_transform(x_train)
x_test_features = feature_extraction.transform(x_test)


y_train = y_train.astype('int')
y_test = y_test.astype('int')

model = LogisticRegression()
model.fit(x_train_features,y_train)

cr = classification_report(y_test, model.predict(x_test_features))

input_mail = [""]

# convert text to feature vectors
input_data_features = feature_extraction.transform(input_mail)

prediction = model.predict(input_data_features)
print(prediction)

if (prediction[0]==1):
  print('Ham mail')

else:
  print('Spam mail')

with open("re.model", "wb") as f:
    pickle.dump((model, feature_extraction), f)