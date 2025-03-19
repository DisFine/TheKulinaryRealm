CREATE DATABASE Dishes;
\c Dishes;

CREATE TABLE recipe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250),
  description VARCHAR(250),
  instructions TEXT,
  prep_time INT,
  cook_time INT,
  serving_min INT,
  serving_max INT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE measure (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE recipe_ingredient (
  recipe_id INT REFERENCES recipe(id),
  ingredient_id INT REFERENCES ingredient(id),
  measure_id INT REFERENCES measure(id),
  amount DECIMAL,
  PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE tag (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE
);

CREATE TABLE recipe_tag (
  recipe_id INT REFERENCES recipe(id),
  tag_id INT REFERENCES tag(id),
  PRIMARY KEY (recipe_id, tag_id)
);

CREATE TABLE chef (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  bio TEXT
);

CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  recipe_id INT REFERENCES recipe(id),
  media_link VARCHAR(255),
  media_type VARCHAR(50)
);

-- Add chef_id to recipe table
ALTER TABLE recipe ADD COLUMN chef_id INT REFERENCES chef(id);

-- Insert some sample measures
INSERT INTO measure (name) VALUES 
  ('cup'), ('teaspoon'), ('tablespoon'), ('gram'), 
  ('kilogram'), ('milliliter'), ('liter'), ('ounce'), 
  ('pound'), ('pinch');

-- Create view for recipe search
CREATE VIEW recipe_details AS
SELECT 
  r.id, r.name, r.description, r.instructions, 
  r.prep_time, r.cook_time, 
  c.first_name || ' ' || c.last_name AS chef_name,
  string_agg(DISTINCT t.name, ', ') AS tags
FROM recipe r
LEFT JOIN chef c ON r.chef_id = c.id
LEFT JOIN recipe_tag rt ON r.id = rt.recipe_id
LEFT JOIN tag t ON rt.tag_id = t.id
GROUP BY r.id, c.id;

-- Create view for recipe ingredients
CREATE VIEW recipe_ingredients AS
SELECT 
  r.id AS recipe_id, 
  r.name AS recipe_name,
  i.name AS ingredient,
  ri.amount,
  m.name AS measure
FROM recipe r
JOIN recipe_ingredient ri ON r.id = ri.recipe_id
JOIN ingredient i ON ri.ingredient_id = i.id
JOIN measure m ON ri.measure_id = m.id;
