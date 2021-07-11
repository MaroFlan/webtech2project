package de.ls5.wt2;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.Filter;

import org.apache.shiro.authc.credential.DefaultPasswordService;
import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import de.ls5.wt2.auth.BasicAuthenticationFilterWithoutRedirect;
import de.ls5.wt2.auth.FormAuthenticationFilterWithoutRedirect;
import de.ls5.wt2.auth.LogoutFilterWithoutRedirect;
import de.ls5.wt2.conf.auth.WT2Realm;

@Configuration
public class ShiroConfig {

    @Bean
    public Realm realm() {
        return new WT2Realm();
    }


    @Bean
    public DefaultWebSecurityManager securityManager(Realm realm) {
        return new DefaultWebSecurityManager(Arrays.asList( realm));
    }

    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(DefaultWebSecurityManager securityManager) {

        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        Map<String, Filter> filters = shiroFilterFactoryBean.getFilters();

        filters.put("restAuthenticator", new BasicAuthenticationFilterWithoutRedirect());
        filters.put("loginFilter", new FormAuthenticationFilterWithoutRedirect());
        filters.put("logoutFilter", new LogoutFilterWithoutRedirect());


        final Map<String, String> chainDefinition = new LinkedHashMap<>();

        // configuration for stateless authentication on each request
        chainDefinition.put("/rest/auth/basic/**", "noSessionCreation, restAuthenticator");


        // configuration for using session based authentication
        chainDefinition.put("/login.jsp", "loginFilter");
        chainDefinition.put("/logout", "logoutFilter");

        // configuration for stateless authentication on each request
        chainDefinition.put("/rest/auth/**", "restAuthenticator");

        // make other examples not require authentication
        chainDefinition.put("/rest/**", "anon");

        // make static Angular resources globally available
        chainDefinition.put("/**", "anon");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(chainDefinition);

        return shiroFilterFactoryBean;
    }



    /////////////////////////////////////////////////////////////////////////////////
    //passwort hash
    /////////////////////////////////////////////////////////////////////////////////
    @Bean
    public DefaultPasswordService passwordService() {
        DefaultPasswordService defaultPasswordService = new DefaultPasswordService();
        DefaultHashService hashService = new DefaultHashService();
        hashService.setHashAlgorithmName("SHA-512");
       // hashService.setGeneratePublicSalt(false); //vllt noch salten mit einbauen? ---Bedingung: muss fehlerfrei funktionieren
        hashService.setHashIterations(1024); //increase hash iterations damit ein Attacker länger zum computen braucht

        defaultPasswordService.setHashService(hashService);
        return defaultPasswordService;

    }



}
