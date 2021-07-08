package de.ls5.wt2.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

    private String username;

    private String email;

    private String password;

    private String firstname;

    private String lastname;

    private Boolean isCurrent;


    @Id
    @GeneratedValue
    private long id;

    public void setCurrent(Boolean current) {
        isCurrent = current;
    }

    public Boolean getCurrent() {
        return isCurrent;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {

        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {

        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

}






/*
import org.slf4j.LoggerFactory;
import org.apache.shiro.authc.credential.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    @Autowired
    private PasswordService passwordService;

    private Set<Role> roles = new HashSet<>();


    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void addRole(Role role)  {
        this.roles.add(role);
    }

    public boolean hasRole(String role) {
        for(Role iRole: this.roles) {
            LoggerFactory.getLogger(this.getClass()).debug("User has all these roles: " + this.roles);
            if(role.toLowerCase().equals(iRole.getName().toLowerCase())) return true;
        }

        return false;
    }


}
*/