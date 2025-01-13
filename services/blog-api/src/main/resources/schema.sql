CREATE TABLE question (
      id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
      user_id RAW(16) NOT NULL, -- UUID için RAW(16)
      content CLOB NOT NULL,
      title VARCHAR2(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answer (
        id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
        content CLOB NOT NULL,
        user_id RAW(16) NOT NULL, -- UUID için RAW(16)
        question_id RAW(16) REFERENCES question (id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tag (
     id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
     name VARCHAR2(255) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_tags (
               question_id RAW(16) NOT NULL REFERENCES question (id) ON DELETE CASCADE,
               tag_id RAW(16) NOT NULL REFERENCES tag (id) ON DELETE CASCADE,
               PRIMARY KEY (question_id, tag_id)
);

CREATE TABLE question_view (
               id RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
               user_id RAW(16) NOT NULL, -- UUID için RAW(16)
               question_id RAW(16) REFERENCES question (id) ON DELETE CASCADE,
               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
