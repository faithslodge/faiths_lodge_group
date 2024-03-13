-- database base name: faiths_lodge

-- Drop all the tables
DROP TABLE IF EXISTS "organization_contact";
DROP TABLE IF EXISTS "loss_type_by_organization";
DROP TABLE IF EXISTS "service_type_by_organization";
DROP TABLE IF EXISTS "service_type";
DROP TABLE IF EXISTS "loss_type";
DROP TABLE IF EXISTS "organization";
DROP TABLE IF EXISTS "address";
DROP TABLE IF EXISTS "user";

------------------------------------------------- BEGIN CREATE TABLE ------------------------------------------------

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (100) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOL DEFAULT FALSE
);

CREATE TABLE "address" (
    "id" SERIAL PRIMARY KEY,
    "address_line_1" VARCHAR(100),
    "address_line_2" VARCHAR(100),
    "city" VARCHAR(30) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "state_abbreviation" VARCHAR(2) NOT NULL,
    "zip_code" VARCHAR(15),
    "latitude" VARCHAR(15),
    "longitude" VARCHAR(15)
);

CREATE TABLE "organization" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200) NOT NULL UNIQUE,
    "service_explanation" TEXT,
    "logo" BYTEA,
    "mission" VARCHAR(500),
    "notes" TEXT,
    "url" VARCHAR(300),
    "phone" VARCHAR(20),
    "email" VARCHAR(200), 
    "for_profit" BOOL,
    "faith_based" BOOL,
    "has_retreat_center" BOOL,
    "linked_in_url" VARCHAR(300),
    "facebook_url" VARCHAR(300), 
    "instagram_url" VARCHAR(300),
    "date_verified" DATE,
    "address_id" INT NOT NULL,
    "verified_by" INT ,
    FOREIGN KEY ("address_id") REFERENCES "address" ("id"),
    FOREIGN KEY ("verified_by") REFERENCES "user" ("id")
);

CREATE TABLE "organization_contact" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "phone" VARCHAR(30),
    "email" VARCHAR(200),
    "title" VARCHAR(150),
    "organization_id" INT NOT NULL,
    FOREIGN KEY ("organization_id") REFERENCES "organization" ("id") ON DELETE CASCADE
);

CREATE TABLE "loss_type" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(100) NOT NULL UNIQUE
);

CREATE TABLE "service_type" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(100) NOT NULL UNIQUE
);

CREATE TABLE "loss_type_by_organization" (
    "id" SERIAL PRIMARY KEY,
    "organization_id" INT NOT NULL,
    "loss_id" INT NOT NULL,
    FOREIGN KEY ("organization_id") REFERENCES "organization" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("loss_id") REFERENCES "loss_type" ("id") ON DELETE CASCADE
);

CREATE TABLE "service_type_by_organization" (
    "id" SERIAL PRIMARY KEY,
    "organization_id" INT NOT NULL,
    "service_id" INT NOT NULL,
    FOREIGN KEY ("organization_id") REFERENCES "organization" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("service_id") REFERENCES "service_type" ("id") ON DELETE CASCADE
);

-------------------------------------------------- END CREATE TABLE -------------------------------------------------

---------------------------------------------- BEGIN INSERT STATEMENTS ----------------------------------------------
    -- user TABLE INSERT
    INSERT INTO "user"
        (
            "username",
            "password",
            "is_admin"
        ) VALUES (
                    'user@fakeData.com',
                    'password',
                    FALSE
                 );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 
    -- YOU CANNOT USE THIS USER TO LOGIN!!!! This is just to seed DB with a single user.
    -- user TABLE INSERT
    INSERT INTO "user"
        (
            "username",
            "password",
            "is_admin"
        ) VALUES (
                    'admin@fakeData.com',
                    'super_password',
                    TRUE
                 );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 

    -- address TABLE INSERT
    INSERT INTO "address"
        (
            "address_line_1",
            "city",
            "state",
            "state_abbreviation",
            "zip_code",
            "latitude",
            "longitude"
        ) VALUES (
                    '123 main street',
                    'Minneapolis',
                    'Minnesota',
                    'MN',
                    '55111',
                    '44.986656',
                    '-93.258133'
                 );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 

    -- organization TABLE INSERT
    INSERT INTO "organization"
        (
            "name",
            "service_explanation",
            "mission",
            "notes",
            "url",
            "phone",
            "email",
            "for_profit",
            "faith_based",
            "has_retreat_center",
            "linked_in_url",
            "facebook_url",
            "instagram_url",
            "date_verified",
            "address_id",
            "verified_by"
        ) VALUES (
                    'Organization Name',
                    'Service Explanation, it could be short or long in char length',
                    'mission section, 1 or 2 sentences in length',
                    'notes section, it is where FL can put internal notes on this organization',
                    'https://www.example.org/services/',
                    '(555)555-5555',
                    'info@fakeData.com',
                    FALSE,
                    TRUE,
                    TRUE,
                    'https://www.linkedin.com/fake_organization',
                    'https://www.facebook.com/fake_organization',
                    'https://www.instagram.com/fake_organization',
                    CURRENT_DATE,
                    1,
                    1
                 );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 

    -- loss_type TABLE INSERT
    INSERT INTO "loss_type"
        (
            "name"
        ) VALUES
                ('Early Pregnancy'),
                ('Stillbirth'),
                ('Infant / toddler Loss(0-3)'),
                ('Child Loss'),
                ('Childhood Cancer / Medically Complex'),
                ('Youth Loss (12-18)'),
                ('Suicide & Substance Abuse'),
                ('Homicide'),
                ('Ambigous Loss / Missing Child'),
                ('Youth Grief'),
                ('Bereaved Mothers'),
                ('BIPOC / Multi-Lingual');

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 

    -- service_type TABLE INSERT
    INSERT INTO "service_type"
        (
            "name"
        ) VALUES 
                ('Grief Counseling'),
                ('Support Groups'),
                ('Retreats'),
                ('Financial Support'),
                ('Peer-to-Peer Support'),
                ('Camps'),
                ('Online Support Groups'),
                ('Education'),
                ('Local Chapters / National Group'),
                ('Surviving Sibling Support'),
                ('Spiritual / Religious Help');

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                 

    -- service_type_by_organization TABLE INSERT
    INSERT INTO "service_type_by_organization"
    (
        "organization_id",
        "service_id"
    ) VALUES (
                1,
                1
                );

    -- service_type_by_organization TABLE INSERT
    INSERT INTO "service_type_by_organization"
    (
        "organization_id",
        "service_id"
    ) VALUES (
                1,
                2
                );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------                

    -- loss_type_by_organization TABLE INSERT
    INSERT INTO "loss_type_by_organization"
    (
        "organization_id",
        "loss_id"
    ) VALUES (
                1,
                1
                );

    -- loss_type_by_organization TABLE INSERT
    INSERT INTO "loss_type_by_organization"
    (
        "organization_id",
        "loss_id"
    ) VALUES (
                1,
                2
                );

----------------------------------------------- INSERT TYPE SEPARATOR -----------------------------------------------

    -- organization_contact TABLE INSERT
    INSERT INTO "organization_contact"
        (
            "first_name",
            "last_name",
            "phone",
            "email",
            "title",
            "organization_id"
        ) VALUES (
                    'John',
                    'Smith',
                    '(555)555-5555',
                    'user@fakeData.com',
                    'Director',
                    1
                 );

----------------------------------------------- END INSERT STATEMENTS -----------------------------------------------