package de.ls5.wt2.auth;

//import de.ls5.wt2.RoleRepository;
//import de.ls5.wt2.UserRepository;
//import de.ls5.wt2.entity.Role;
//import de.ls5.wt2.entity.User;

import de.ls5.wt2.UserRepository;
import de.ls5.wt2.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Transactional
@RestController //"rest/auth/session/profile", "rest/auth/basic/profile", "rest/auth/jwt/profile",
@RequestMapping(path = {"rest/auth/session/profile", "rest/auth/basic/profile", "rest/auth/jwt/profile"})
public class UserREST {
    /*
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordService passwordService;
    */
    @Autowired
    private UserRepository userRepository;

    //sorgt dafür dass der login funktioniert
    //----aber login funktioniert noch nicht mit den userdaten----
    @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity getProfile() {

        final Subject subject = SecurityUtils.getSubject();


       // if (!subject.isAuthenticated()) {
       //     return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
       // }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);//ResponseEntity.ok(subject.getPrincipal().toString());
    }


/*
    @GetMapping(path = "{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable("id") final long id) {

        //System.out.print("it works");
        User user = userRepository.findById(id);

    }*/

}
