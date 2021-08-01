/*user register-login table  */
CREATE TABLE "public".user_info
(
    user_id SERIAL,
    user_name character varying(50) NOT NULL,
    email_id character varying,
    password character varying,
    CONSTRAINT user_pkey PRIMARY KEY (user_id),
    CONSTRAINT user_email_key UNIQUE (email_id),
    CONSTRAINT user_user_name_key UNIQUE (user_name),
);
/*department table  */                          
CREATE TABLE "public".department                                                                                                                                                                                                                    

(
    department_id SERIAL,
    department_name varchar(1024) NULL,
    roles varchar(1024) NOT NULL,
    CONSTRAINT department_pkey PRIMARY KEY (department_id)
  
);
/*department table  */       
CREATE TABLE "public".menu_user
(
    menuuser_id SERIAL,
    user_name character varying(1024),
    department_name character varying(1024),
    email_id varchar(1024) NULL ,
    address  varchar(1024) NULL
    
)