package de.ls5.wt2.rest;

import de.ls5.wt2.UserRepository;
import de.ls5.wt2.entity.User;
import org.apache.shiro.authc.credential.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import javax.persistence.EntityManager;

@Transactional
@RestController
@RequestMapping(path = "rest/simple")
public class SimpleREST {


    //----Diese Klasse wurde von HelloWorld zum Handlen der User Datenbank befördert


    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    @GetMapping(produces =  MediaType.APPLICATION_JSON_VALUE)
    public String[] get(){
        return new String[] {"value1", "value2"};
    }


    //-----------create User-------------
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User create(@RequestBody final User param) { //pathvar und requestbody

        final User user = new User();

        user.setFirstname(param.getFirstname());
        user.setLastname(param.getLastname());
        user.setEmail(param.getEmail());
        user.setUsername(param.getUsername());


        user.setPassword(passwordService.encryptPassword(param.getPassword())); //sickes hashing

        userRepository.save(user);

        return user;
    }

    //-----------get a User by id-------------
    @GetMapping(path = "/{id}",
            // consumes = MediaType.TEXT_PLAIN_VALUE, //
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserById(@PathVariable("id") final long id) {

        //System.out.print("it works");
        return this.userRepository.findById(id);
    }

    //-----------get a User by name-------------
   /* @GetMapping(path = "{name}",
            // consumes = MediaType.TEXT_PLAIN_VALUE, //
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable("name") final String name) {

        //System.out.print("it works");
        return this.userRepository.findByUsername(name);
    }*/

    //-----------delete User-------------
    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteUser(@PathVariable(value="id") long id) {

        User user = userRepository.findById(id);
        userRepository.delete(user);

        return ResponseEntity.ok(true);
    }

    //-----------edit User-info-------------
    @PutMapping(path = "/{name}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User edit( @RequestBody final User param, @PathVariable("name") final String name) { //pathvar und requestbody

        User user = userRepository.findByUsername(name);

        user.setFirstname(param.getFirstname());
        user.setLastname(param.getLastname());
        user.setEmail(param.getEmail());
        user.setUsername(param.getUsername());
        user.setPassword(param.getPassword());

        return user;
    }


}
