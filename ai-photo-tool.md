\# AI Headshots SaaS – MVP Specification



\## Project Overview



Build a SaaS web application that generates professional AI headshots from user uploaded photos.



Users upload multiple selfies, the system trains a personalized AI model, and then generates professional headshots.



Use cases:



\* LinkedIn profile photos

\* Resume photos

\* Professional headshots

\* Social media profile photos



Reference idea:

AI headshot generators such as unrealphotos.io.



---



\# Tech Stack



Frontend:

Next.js

React

TailwindCSS



Backend:

Supabase

Supabase Auth

Supabase Database (Postgres)

Supabase Storage



AI:

Replicate API



Model:

FLUX fine-tuning (LoRA training)



Deployment:

Vercel



---



\# Core MVP Features



\## 1 User Authentication



Use Supabase Auth.



Features:



\* Email signup

\* Email login

\* Password reset

\* User dashboard



---



\## 2 Photo Upload



Users upload 10–20 photos.



Requirements:



\* Accept JPG or PNG

\* Max file size 10MB

\* Minimum 10 images required



Photos stored in:



Supabase Storage



Bucket name:



user-training-images



---



\## 3 AI Model Training



After user uploads photos:



Trigger training pipeline.



Steps:



1 Collect user photos

2 Send dataset to Replicate training API

3 Train FLUX fine-tuned model (LoRA)

4 Save model ID in database



Expected training time:



30–90 minutes.



---



\## 4 AI Headshot Generation



Users generate headshots using prompts or preset styles.



Example styles:



\* Professional LinkedIn headshot

\* Corporate office portrait

\* Studio lighting portrait

\* Business casual photo

\* Clean background headshot



Generation flow:



User request → Replicate API → Image generated → Save image to Supabase Storage.



---



\## 5 Preset Styles



Preset prompt templates:



Corporate headshot

Studio portrait

Startup founder style

Business casual portrait

Clean LinkedIn headshot



Example prompt:



"Professional studio portrait of a person wearing business attire with soft lighting and clean background"



---



\## 6 User Dashboard



Dashboard sections:



Upload photos

Training status

Generate headshots

Image gallery

Download images



---



\# Database Schema



Profiles Table



Fields:



id

email

created\_at

plan\_type



---



Models Table



Fields:



id

user\_id

replicate\_model\_id

status

created\_at



Status values:



training

ready

failed



---



Images Table



Fields:



id

user\_id

model\_id

image\_url

prompt

created\_at



---



\# AI Integration



Use Replicate API.



Workflow:



User uploads photos → training job created → model trained → generation enabled.



---



\# Pages



Landing Page



Sections:



Hero

How it works

Example images

Pricing

FAQ



---



Auth Pages



Signup

Login



---



Dashboard Pages



Upload photos

Training status

Generate images

Gallery



---



\# Security



Limit generation requests.



Example:



Max 500 generations per user per month.



---



\# Future Features



\* Background replacement

\* Outfit generation

\* AI resume photo optimization

\* Multiple style packs

\* Faster generation queue



---



\# Deployment



Frontend:



Vercel



Backend:



Supabase



AI:



Replicate API



---



\# MVP Timeline



Week 1:



Supabase setup

Auth system

Dashboard

Photo upload



Week 2:



Replicate integration

Training pipeline

Image generation

Gallery



Deploy MVP



