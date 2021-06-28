/*package de.ls5.wt2;

import de.ls5.wt2.entity.Role;
import de.ls5.wt2.entity.User;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAccount;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.shiro.util.ByteSource;

import java.util.HashSet;
import java.util.Set;

public class H2AuthorizingRealm extends AuthorizingRealm{


        final private String REALM_NAME = "H2REALM";
        private Logger _logger = LoggerFactory.getLogger(this.getClass());

        @Autowired
        private UserRepository UserRepository;

        @Autowired
        private PasswordService passwordService;

        public static final String salt = "UPypGFpzeioUbFNaCCcOAGk0";

        @Override
        protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
            User myUser = UserRepository.findByUsername(principals.getPrimaryPrincipal().toString());
            if(myUser == null) return null;

            Set<String> roles = new HashSet<>();
            Set<String> permissions = new HashSet<>();

            for(Role role : myUser.getRoles()) {
                roles.add(role.getName());
            }

            SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo(roles);
            authorizationInfo.setStringPermissions(permissions);
            return authorizationInfo;
        }

        @Override
        protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
            if(!(token instanceof UsernamePasswordToken)) throw new IllegalStateException("Please only use UsernamePasswordToken for authentication");

            final UsernamePasswordToken userPassToken = (UsernamePasswordToken) token;

            User myUser = UserRepository.findByUsername(userPassToken.getUsername());
            if(myUser == null) return null;

            String pwHash = passwordService.encryptPassword(userPassToken.getPassword());
            _logger.debug("Comparing given: " + pwHash + " to " + myUser.getPassword());
            if(pwHash.equals(myUser.getPassword())) {
                return new SimpleAccount(
                        myUser.getUsername(),
                        pwHash,
                        REALM_NAME
                );
            }

            throw new IllegalStateException("Login Failed, password didn't match");
        }
}
*/