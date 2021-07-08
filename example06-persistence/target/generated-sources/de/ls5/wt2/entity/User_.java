package de.ls5.wt2.entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(User.class)
public abstract class User_ {

	public static volatile SingularAttribute<User, String> password;
	public static volatile SingularAttribute<User, String> firstname;
	public static volatile SingularAttribute<User, Boolean> isCurrent;
	public static volatile SingularAttribute<User, Long> id;
	public static volatile SingularAttribute<User, String> email;
	public static volatile SingularAttribute<User, String> username;
	public static volatile SingularAttribute<User, String> lastname;

	public static final String PASSWORD = "password";
	public static final String FIRSTNAME = "firstname";
	public static final String IS_CURRENT = "isCurrent";
	public static final String ID = "id";
	public static final String EMAIL = "email";
	public static final String USERNAME = "username";
	public static final String LASTNAME = "lastname";

}

