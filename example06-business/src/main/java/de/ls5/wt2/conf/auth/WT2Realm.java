package de.ls5.wt2.conf.auth;

import java.util.Collection;
import java.util.Collections;

import javax.persistence.EntityManager;

import de.ls5.wt2.UserRepository;
//import de.ls5.wt2.conf.auth.permission.ReadNewsItemPermission;
import de.ls5.wt2.conf.auth.permission.ReadNewsItemPermission;
import de.ls5.wt2.entity.User;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

public class WT2Realm extends AuthorizingRealm implements Realm {

    final static String REALM = "WT2";

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordService passwordService;

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
        if(!(token instanceof UsernamePasswordToken)) throw new IllegalStateException("Please only use UsernamePasswordToken for authentication");

        final UsernamePasswordToken userPassToken = (UsernamePasswordToken) token;

        User myUser = userRepository.findByUsername(userPassToken.getUsername());
        if(myUser == null) return null;

        String pwHash = passwordService.encryptPassword(userPassToken.getPassword());
        System.out.println("Comparing given: " + pwHash + " to " + myUser.getPassword());
        if(pwHash.equals(myUser.getPassword())) {
            return new SimpleAccount(token.getPrincipal(), token.getCredentials(), WT2Realm.REALM);
        }

        throw new IllegalStateException("Login Failed, password didn't match");
    }
    /*
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //final String user = (String) token.getPrincipal();
        User user = userRepository.findByUsername((String) token.getPrincipal());

        final Object username = token.getPrincipal();
        final Object pw = token.getCredentials();
        System.out.println("## "+ username + " " + pw);
        if(!user.getPassword().equals(pw)){


            throw new AuthenticationException();
        }
        //in db anschauen
        return new SimpleAccount(token.getPrincipal(), token.getCredentials(), WT2Realm.REALM);
       // return new SimpleAccount(user.getUsername(), user.getPassword(), WT2Realm.REALM);//dbUser.getpw
    }*/






    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        return new AuthorizationInfo() {

            @Override
            public Collection<String> getRoles() {
                if ("admin".equals(principals.getPrimaryPrincipal())) {
                    return Collections.singleton("admin");
                }

                return Collections.emptyList();
            }

            @Override
            public Collection<String> getStringPermissions() {
                return Collections.emptyList();
            }

            @Override
            public Collection<Permission> getObjectPermissions() {
                return Collections.singleton(new ReadNewsItemPermission());
            }
        };
    }
}
