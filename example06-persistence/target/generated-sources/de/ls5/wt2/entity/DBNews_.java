package de.ls5.wt2.entity;

import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(DBNews.class)
public abstract class DBNews_ extends de.ls5.wt2.entity.DBIdentified_ {

	public static volatile SingularAttribute<DBNews, Date> publishedOn;
	public static volatile SingularAttribute<DBNews, String> headline;
	public static volatile SingularAttribute<DBNews, Long> userId;
	public static volatile SingularAttribute<DBNews, String> content;
	public static volatile SingularAttribute<DBNews, String> username;

	public static final String PUBLISHED_ON = "publishedOn";
	public static final String HEADLINE = "headline";
	public static final String USER_ID = "userId";
	public static final String CONTENT = "content";
	public static final String USERNAME = "username";

}

