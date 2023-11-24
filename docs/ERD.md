# ERD: Documentation-System

## Entity Relationship Diagram

-   [ERD](/ERD.dio)

## Table of Contents

**project:**

| Column          | Type         |
| --------------- | ------------ |
| id              | string: uuid |
| title           | string       |
| startIn         | Date         |
| endIn           | Date         |
| objective       | string       |
| project_manager | string       |
| budget          | number       |
| scope           | string       |

**SRS:**

| Column            | Type         |
| ----------------- | ------------ |
| id                | string: uuid |
| p_id              | string: uuid |
| introduction      | string       |
| purpose           | string       |
| intended_audience | string       |
| description       | string       |
| requirements      | string       |
| use_case          | string       |

**SDD:**

| Column | Type         |
| ------ | ------------ |
| id     | string: uuid |
| p_id   | string: uuid |
| uml    | string[]     |
