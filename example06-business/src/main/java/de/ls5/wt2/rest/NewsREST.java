package de.ls5.wt2.rest;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import de.ls5.wt2.entity.DBNews;
import de.ls5.wt2.entity.DBNews_;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@Transactional
@RestController
@RequestMapping(path = "rest/news")
public class NewsREST {

    @Autowired
    private EntityManager entityManager;

    @GetMapping(path = "newest",
                produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews readNewestNews() {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<DBNews> query = builder.createQuery(DBNews.class);

        final Root<DBNews> from = query.from(DBNews.class);

        final Order order = builder.desc(from.get(DBNews_.publishedOn));

        query.select(from).orderBy(order);

        return this.entityManager.createQuery(query).setMaxResults(1).getSingleResult();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                 produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews create(@RequestBody final DBNews param) { //pathvar und requestbody

        final DBNews news = new DBNews();

        news.setHeadline(param.getHeadline());
        news.setContent(param.getContent());
        news.setPublishedOn(new Date());

        this.entityManager.persist(news);

        return news;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DBNews> readAllAsJSON() {
        final CriteriaBuilder builder = this.entityManager.getCriteriaBuilder();
        final CriteriaQuery<DBNews> query = builder.createQuery(DBNews.class);

        final Root<DBNews> from = query.from(DBNews.class);

        query.select(from);

        return this.entityManager.createQuery(query).getResultList();
    }

    @GetMapping(path = "{id}",
               // consumes = MediaType.TEXT_PLAIN_VALUE, //
                produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews readAsJSON(@PathVariable("id") final long id) {

        //System.out.print("it works");
        return this.entityManager.find(DBNews.class, id);
    }



    @DeleteMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> deleteNews(@PathVariable(value="id") long id) {
        DBNews news = entityManager.find(DBNews.class, id);

        entityManager.remove(news);
        return ResponseEntity.ok(true);
    }

    //put request
    //request body


    @PutMapping(path = "/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews edit( @RequestBody final DBNews param, @PathVariable(value="id") long id) { //pathvar und requestbody

        DBNews news = entityManager.find(DBNews.class, id);

        news.setHeadline(param.getHeadline());
        news.setContent(param.getContent());

        return news;
    }

    //spring rest basic auth
    //oder spring rest session
    //rest soll auth abfrage machen







    // An example of how to misuse the API and do something unRESTful
    @GetMapping(path = "new/{headline}/{content}",
                consumes = MediaType.TEXT_PLAIN_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    public DBNews create(@PathVariable("headline") final String headline,
                         @PathVariable("content") final String content) {
        final DBNews news = new DBNews();

        news.setHeadline(headline);
        news.setContent(content);
        news.setPublishedOn(new Date());

        this.entityManager.persist(news);

        return news;
    }
}
