# Carrier of Hope



**if background does not load properly**:  Change './assets' to '/assets' in styles.sass and vice versa. 



## Deployment
* (If you dont get the application from version control, you might need to mvn package und java -jar the .war file instead of running the main application directly)


* Run main application
* navigate to example06-presentation/src/main/angular 
    * execute npm install 
    * npm run start

* Application should then run on port 4200

## Whats Changed
 * Users can now view messages when they arent logged in (but not create/edit/delete)
 * Login directs to secured /auth route 
 * components refresh correctly after a message was edited/deleted when logged in

## Added but not 100% functional 
(mainly because of unauthorized request and lack of time)
 * The created message shows who published it. However, the request to the backend on who is the current user returns an unauthorized. Therefore, there are 2 ways of testing this functionality: 1. Hardcode the username into the edit/create component. 2. Pull the experimental path where a cookie with the username is created. This isnt safe and not recommended but a good way to test the functionality. 
 * We couldnt figure out how to select the username from the message in time. Therefore this needs to be hardcoded as well to be tested.
 * There now exists an admin account if you choose the username "AdminOfAdmins". However, you need to hardcode that line into the component or use the experimental branch to test this feature as well.


