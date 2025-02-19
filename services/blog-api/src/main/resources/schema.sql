CREATE TABLE question (
          id BINARY(16) NOT NULL PRIMARY KEY, -- UUID için BINARY(16)
          userName VARCHAR(100) NOT NULL,
          content TEXT NOT NULL,
          shortContent VARCHAR(300) NOT NULL,
          title VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE answer (
        id BINARY(16) NOT NULL PRIMARY KEY, -- UUID için BINARY(16)
        content TEXT NOT NULL,
        userName VARCHAR(100) NOT NULL, -- UUID için BINARY(16)
        question_id BINARY(16) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE
);

CREATE TABLE tag (
     id BINARY(16) NOT NULL PRIMARY KEY, -- UUID için BINARY(16)
     name VARCHAR(255) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE question_tags (
               question_id BINARY(16) NOT NULL,
               tag_id BINARY(16) NOT NULL,
               PRIMARY KEY (question_id, tag_id),
               FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE,
               FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE
);

CREATE TABLE question_view (
           id BINARY(16) NOT NULL PRIMARY KEY, -- UUID için BINARY(16)
           userName VARCHAR(100) NOT NULL,
           question_id BINARY(16) NOT NULL,
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
           FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE
);

CREATE TABLE answer_status (
            id UUID PRIMARY KEY DEFAULT default_uuid(),
            answer_id UUID UNIQUE REFERENCES comment (id) ON DELETE CASCADE,
            users VARCHAR(100)[] DEFAULT ARRAY[]::VARCHAR(100)[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_status (
        id UUID PRIMARY KEY DEFAULT default_uuid(),
        question_id UUID UNIQUE REFERENCES post (id) ON DELETE CASCADE,
        users VARCHAR(100)[] DEFAULT ARRAY[]::VARCHAR(100)[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
