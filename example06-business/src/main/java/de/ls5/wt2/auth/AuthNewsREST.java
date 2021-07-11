package de.ls5.wt2.auth;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import de.ls5.wt2.UserRepository;
import de.ls5.wt2.conf.auth.permission.ViewFirstFiveNewsItemsPermission;
import de.ls5.wt2.entity.DBNews;
import de.ls5.wt2.entity.DBNews_;
import de.ls5.wt2.entity.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Transactional
@RestController
@RequestMapping(path = {"rest/auth/session/news", "rest/auth/basic/news", "rest/auth/jwt/news", //"/angular"
})
public class AuthNewsREST {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "newest",
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DBNews> readNewestNews() {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<DBNews> query = builder.createQuery(DBNews.class);

        final Root<DBNews> from = query.from(DBNews.class);

        final Order order = builder.desc(from.get(DBNews_.publishedOn));

        query.select(from).orderBy(order);

        final List<DBNews> result = this.entityManager.createQuery(query).getResultList();

        // Attribute based permission check using permissions
        final Subject subject = SecurityUtils.getSubject();
        final Permission firstFiveNewsItemsPermission = new ViewFirstFiveNewsItemsPermission(result);
        System.out.println("this is the subject " + subject);

        if (!subject.isPermitted(firstFiveNewsItemsPermission)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(result.get(0));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<DBNews>> readAllAsJSON() {
        final Subject subject = SecurityUtils.getSubject();
        System.out.println("this is the subject " + subject);
        if (subject == null || !subject.isAuthenticated()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<DBNews> query = builder.createQuery(DBNews.class);

        final Root<DBNews> from = query.from(DBNews.class);

        query.select(from);

        final List<DBNews> result = this.entityManager.createQuery(query).getResultList();
        return ResponseEntity.ok(result);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews create(@RequestBody final DBNews param) {

        SecurityUtils.getSubject().checkRole("admin");//damit user abfragen?

        final DBNews news = new DBNews();

        news.setHeadline(param.getHeadline());
        news.setContent(param.getContent());
        // news.setPublishedOn(new Date());
        news.setUsername(param.getUsername());
        news.setPublishedOn(param.getUsername());

        this.entityManager.persist(news);

        return news;
    }

    //////////////////////////current user handling

    @PostMapping(value = "/current") //vllt path abfrage anders
    public String saveUsername(final String username){
        final User user = userRepository.findByUsername(username);
        user.setCurrent(true);
        userRepository.save(user);//habe einen eintrag in der datenbank wo current true ist
        //console.log('saveUsername:' + username);

        return username;
    }

    //put statt post eignet sich evtl besser. Es soll schließlich nur der current wert geändert werden
    @PostMapping(value = "/current/inactive") //vllt path abfrage anders
    public String UserNowInactive(final String username){
        final User user = userRepository.findByUsername(username);
        user.setCurrent(false);
        userRepository.save(user);
        //setze current false sobald user sich abmeldet
        
        return username;
    }

    @GetMapping( value="/current")
    public String getCurrentUser(){
        int tryId=1; //id einträge starten bei 1 und werden anschließend inkrementiert
        int currentUserId=-1;
        String currentUsername= "";
        while(true){
            try{
                User maybeUser = userRepository.findById(tryId);
                if(maybeUser.getCurrent() == true){
                    currentUsername = maybeUser.getUsername();
                    break;
                }
                else{
                    tryId++;
                }
            }
            catch (Exception e) {
                break;
            }
        }
        return currentUsername;
    }

}
