from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the model
with open("bangalore_price_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load the list of feature names (needed for encoding incoming data properly)
# You can recreate it using the same steps as training
df = pd.read_csv("dataset/Bengaluru_House_Data.csv")
df = df.drop(['area_type', 'availability', 'society', 'balcony'], axis=1)
df = df.dropna()
df['bhk'] = df['size'].apply(lambda x: int(x.split(' ')[0]))
df = df.drop('size', axis=1)

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

# Save columns used in model
dummies = pd.get_dummies(df['location'], drop_first=True)
df = pd.concat([df.drop('location', axis=1), dummies], axis=1)
feature_columns = df.drop('price', axis=1).columns

@app.route('/')
def home():
    return "🏠 Bangalore House Price Prediction API is running."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    try:
        # Extract and prepare input
        input_data = pd.DataFrame([data])
        input_data['bhk'] = input_data['size'].apply(lambda x: int(x.split(' ')[0]))
        input_data = input_data.drop(['size'], axis=1)
        input_data['total_sqft'] = input_data['total_sqft'].apply(convert_sqft)

        # One-hot encode location
        location_dummies = pd.get_dummies(input_data['location'])
        input_data = pd.concat([input_data.drop('location', axis=1), location_dummies], axis=1)

        # Align input with training features
        final_input = pd.DataFrame(columns=feature_columns)
        for col in final_input.columns:
            final_input[col] = input_data[col] if col in input_data else 0

        # Predict
        prediction = model.predict(final_input)[0]

        return jsonify({'predicted_price (Lakhs)': round(prediction, 2)})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
     app.run(host='0.0.0.0', port=10000)
