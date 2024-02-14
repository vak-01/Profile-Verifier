from os import error
import pickle  # for loading model
import pandas as pd
from instagrapi import Client  # Instagram API for Public Info
import os
from dotenv import load_dotenv

load_dotenv()

# Load the Scikit-Learn model
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define the Flask app
from socketify import App

app = App()
# Instagram API Credentials
INSTAGRAM_USERNAME = os.getenv("USER")
INSTAGRAM_PASSWORD = os.getenv("PASS")

# Create an Instagram client
client = Client()
client.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)

# Main Production route from Client
def get_user_info(res,req):
    try:
        # Get the user by username
        username=req.get_parameter(0)
        user = client.user_info_by_username(username)
        
        # Extract user information
        user_info = {
            "userFollowerCount": user.follower_count,
            "userFollowingCount": user.following_count,
            "userBiographyLength": len(user.biography),
            "userMediaCount": user.media_count,
            "userHasProfilPic": int(bool(user.profile_pic_url)),  # Convert Boolean To Numerical
            "userIsPrivate": int(user.is_private),
            "usernameDigitCount": sum(c.isdigit() for c in username),
            "usernameLength": len(username)
        }

        df = pd.DataFrame.from_dict(user_info, orient="index").T

        # Make a prediction
        prediction = model.predict(df)

        # Convert the prediction to a Python int // 0 for Real and 1 for Fake
        prediction = int(prediction[0])

        # Create a dictionary with the prediction result
        result = {"prediction": prediction}
        custom_headers = (
            ("Access-Control-Allow-Origin", "*"),  # CORS header to allow any origin
            ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),  # CORS header for allowed methods
            ("Access-Control-Allow-Headers", "Content-Type")  # CORS header for allowed headers
        )
        res.send(result, headers=custom_headers)
    except Exception as e:
        # handle any exceptions
        error_headers = (
            ("X-Rate-Limit-Remaining", "0"),  # Adjust as needed
            (b'Another-Headers', b'ErrorValue'),  # Adjust as needed
            ("Access-Control-Allow-Origin", "*"),  # CORS header to allow any origin
            ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),  # CORS header for allowed methods
            ("Access-Control-Allow-Headers", "Content-Type")  # CORS header for allowed headers
        )
        res.end( {"error": f"An error occurred while processing the request: {str(e)}"}, status="400",headers=error_headers)

def list_func(res, req):
    try:
        # Get the user by username
        username=req.get_parameter(0)
        user = client.user_info_by_username(username)
        
        # Extract user information
        user_info = {
            "userFollowerCount": user.follower_count,
            "userFollowingCount": user.following_count,
            "userBiographyLength": len(user.biography),
            "userMediaCount": user.media_count,
            "userHasProfilPic": int(bool(user.profile_pic_url)),  # Convert Boolean To Numerical
            "userIsPrivate": int(user.is_private),
            "usernameDigitCount": sum(c.isdigit() for c in username),
            "usernameLength": len(username)
        }

        df = pd.DataFrame.from_dict(user_info, orient="index").T

        # Make a prediction
        prediction = model.predict(df)

        # Convert the prediction to a Python int // 0 for Real and 1 for Fake
        prediction = int(prediction[0])

        # Create a dictionary with the prediction result
        result = {"username": username, "profilepic":user.profile_pic_url ,"prediction": prediction}
        custom_headers = (
            ("Access-Control-Allow-Origin", "*"),  # CORS header to allow any origin
            ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),  # CORS header for allowed methods
            ("Access-Control-Allow-Headers", "Content-Type")  # CORS header for allowed headers
        )
        res.send(result, headers=custom_headers)
    except Exception as e:
        # handle any exceptions
        error_headers = (
            ("X-Rate-Limit-Remaining", "0"),  # Adjust as needed
            (b'Another-Headers', b'ErrorValue'),  # Adjust as needed
            ("Access-Control-Allow-Origin", "*"),  # CORS header to allow any origin
            ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),  # CORS header for allowed methods
            ("Access-Control-Allow-Headers", "Content-Type")  # CORS header for allowed headers
        )
        res.end( {"error": f"An error occurred while processing the request: {str(e)}"}, status="400",headers=error_headers)


app.get("/user/:username",get_user_info)
app.get("/list/:username",list_func)

# Define a route for the predict API
# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get the input data from the request
#     data = request.get_json()
#
#     # Convert the JSON data to a pandas DataFrame
#     df = pd.DataFrame.from_dict(data, orient="index").T
#
#     # Make a prediction
#     prediction = model.predict(df)
#
#     # Convert the prediction to a Python int
#     prediction = int(prediction[0])
#
#     # Create a dictionary with the prediction result
#     result = {"prediction": prediction}
#
#     # Return the result as a JSON response
#     return jsonify(result)


# Run the Flask app
app.listen(5000, lambda config: print("Listening on port http://localhost:%d now\n" % config.port))
app.run()

