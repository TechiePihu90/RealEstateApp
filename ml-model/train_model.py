import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
df = pd.read_csv("ml-model/dataset/Bengaluru_House_Data.csv")

# Drop unnecessary columns
df = df.drop(['area_type', 'availability', 'society', 'balcony'], axis=1)

# Drop rows with null values
df = df.dropna()

# Extract BHK
df['bhk'] = df['size'].apply(lambda x: int(x.split(' ')[0]))

# Remove 'size' column
df = df.drop('size', axis=1)

# Convert total_sqft to float
def convert_sqft(x):
    try:
        return float(x)
    except:
        tokens = x.split('-')
        if len(tokens) == 2:
            return (float(tokens[0]) + float(tokens[1])) / 2
        return None

df['total_sqft'] = df['total_sqft'].apply(convert_sqft)
df = df.dropna()

# One-hot encoding for location
dummies = pd.get_dummies(df['location'], drop_first=True)
df = pd.concat([df.drop('location', axis=1), dummies], axis=1)

# Features and target
X = df.drop('price', axis=1)
y = df['price']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Save model
with open("bangalore_price_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")
