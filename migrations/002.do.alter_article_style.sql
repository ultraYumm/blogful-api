CREATE TYPE article_category AS ENUM (
    'Listicle',
    'How-to',
    'News',
    'Interview',
    'Story'
);

ALTER TABLE blogful_articles
  ADD COLUMN
    style article_category;

ALTER TABLE blogful_articles
  ADD COLUMN
    author INTEGER REFERENCES blogful_users(id)
    ON DELETE SET NULL;