# Profile Verifier

## How to set up the project

### setup backend environment variables

### step 1 : create a dotenv file

```bash
cd backend && touch .env
pip install -r requirements.txt
```

```.env

USER=<replace with insta username of test account>
PASS=<replace with insta password of test account>

```

## IMPORTANT! : Docker needs to be installed

### Step 2 : Run Backend

```bash
docker compose up -d
```

### Step 3 : Frontend

```
cd .. && cd frontend
```

```
npm run dev
```



# FOR WINDOWS (slight change in Docker setup):

## Starting the backend service

1. Install docker desktop from docker.com

2. update your WSL (Windows subsystem for Linux) by running
   ```
   wsl --update
   ```

3. clone the project into your machine

4. In `backend > app.py`. The environment variables are not yet fully configured when running in docker

   > so instead of
   > ```
   > # Instagram API Credentials
   > INSTAGRAM_USERNAME = os.getenv("USER")
   > INSTAGRAM_PASSWORD = os.getenv("PASS")
   > ```
   > hard code the credentials
   > ```
   > INSTAGRAM_USERNAME = "<test account MAIL ID>"
   > INSTAGRAM_PASSWORD = "<test account password>"
   > ```
   > These are required for insta API authentication purposes
   
5. In dockerfile, add the line to expose port 5000
   ```
   # Expose the port that the application will run on
   EXPOSE 7860
   EXPOSE 80
   EXPOSE 443
   EXPOSE 8080
   EXPOSE 5000 -->add this line
   ```

6. change the docker-compose.yml file to this

   ```md
   version: "3.9"
   services:
     app:
       build:
         context: .
         dockerfile: ./DockerFile
       ports:
         - "5000:5000"
   ```
   
   
8. cd to `backend` folder and build the docker container by running the command
   ```
   docker compose up -d --build
   ```
   This will start the container in a detatched mode, meaning the terminal will not be blocked but the container will start running in the background

9. You can see the running status of the docker container either by using the docker desktop OR using the command
  ```
  docker ps
  ```


## Starting the frontend

1. cd into `frontend`

2. Install dependencies using
    ```js
    npm i
    ```
3. Start the development server using
   ```
   npm run dev
   ```
