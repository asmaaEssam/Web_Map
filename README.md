# OpenLayers Project Template

To use this template:

1. Clone the repository, renaming the project directory as you do so:
    ```nohighlight
    $ git clone https://github.com/LaunchCodeEducation/openlayers-template.git PROJECT_NAME
    ```
2. Create a new GitHub repository in your account to store your project code
3. Connect you local repository to your new remote repository by running these Git commands from the project root:
    ```nohighlight
    $ git remote rm origin
    $ git remote add origin REPO_URL
    $ git push origin master
    ```
    Where `REPO_URL` is the project URL (ending in `.git`) for the repository you created in step 2.
4. Install the project dependencies via NPM. From the project root:
    ```nohighlight
    $ npm install
    ```
5. Make sure the start code builds and runs:
    ```nohiglight
    $ npm start
    ```
    Then visit `localhost:3000` in your browser and make sure you see a "Hello World" message.