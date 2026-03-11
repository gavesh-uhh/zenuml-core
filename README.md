# ZenUML/AI

A fork of ZenUML/Core enhanced with Google Gemini 3.5 Flash to generate sequence diagrams from natural language descriptions.

## What's Different

This fork adds an AI layer on top of ZenUML Core that lets you describe a sequence diagram in plain English and have Gemini generate the ZenUML DSL for you automatically.

## Usage

Instead of writing ZenUML DSL by hand, just describe your diagram:
> *"A user logs in, the frontend calls the auth service, which checks the database and returns a token."*

Gemini will generate the corresponding ZenUML code, which is then rendered by the core engine.
