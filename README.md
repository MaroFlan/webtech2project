# Carrier of Hope



**if background does not load properly**:  Change './assets' to '/assets' in styles.sass and vice versa. 



## Deployment
* (If you dont get the application from version control, you might need to mvn package und java -jar the .war file instead of running the main application directly)


* Run main application
* navigate to example06-presentation/src/main/angular 
    * execute npm install 
    * npm run start

* Application should then run on port 4200

## Whats Changed (Update 11.07.)
 * Created messages show the creator's username. Only the creator can edit or delete messages.
 * The admin can create an account with the username "AdminOfAdmins" to gain full control over all messages.
 * Website title and icon individualized