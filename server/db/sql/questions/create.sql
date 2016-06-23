/*
    Creates table Users. Uses JSONB for holding object of answers array
*/

CREATE TABLE ${schema~}.Questions
(
    question_id serial PRIMARY KEY,
    body text NOT NULL,
    frequency text NOT NULL,
    category text NOT NULL,
    answers json
);