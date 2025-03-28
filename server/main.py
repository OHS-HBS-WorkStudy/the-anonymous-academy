from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sqlite3
import uuid
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class SignIn(BaseModel):
    email: str 
    password: str
    f_name: str
    l_name: str

class User(BaseModel):
    email: str
    password: str

class Thread(BaseModel):
    title: str 
    content: str
    user_id: str

class ThreadList(BaseModel):
    size: int
    count: int
    tag: str

class Comment(BaseModel):
    content: str
    user_id: str
    thread_id: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/sign_up")
def sign_user_up(sign_info: SignIn):
    user_id = uuid.uuid4()
    conn = sqlite3.connect("forum.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (id TEXT, email TEXT, password TEXT, f_name TEXT, l_name TEXT)")
    c.execute("INSERT INTO users (id, email, password, f_name, l_name) VALUES (?, ?, ?, ?, ?)", (user_id, sign_info.email, sign_info.password, sign_info.f_name, sign_info.l_name))
    conn.commit()
    conn.close()
    return {"user_id": user_id}

@app.post("/sign_in")
def sign_user_in(user: User):
    conn = sqlite3.connect("forum.db")
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ? AND password = ?", (user.email, user.password))
    user = c.fetchone()
    conn.close()
    if user:
        return {"user_id": user[0]}
    else:
        return {"error": "Invalid email or password"}

@app.post("/create thread")
def create_thread(thread: Thread):
    thread_id = uuid.uuid4()
    conn = sqlite3.connect("forum.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS threads (id TEXT, title TEXT, content TEXT, user_id TEXT)")
    c.execute("INSERT INTO threads (id, title, content, user_id) VALUES (?, ?, ?, ?)", (thread_id, thread.title, thread.content, thread.user_id))
    conn.commit()
    conn.close()
    return {"thread_id": thread_id}

@app.get("/get threads")
def get_threads(thread_list: ThreadList):
    conn = sqlite3.connect("forum.db")
    c = conn.cursor()
    c.execute("SELECT * FROM threads")
    threads = c.fetchall()
    conn.close()
    return {"threads": threads}

@app.get("comment")
def comment(comment: Comment):
    comment_id = uuid.uuid4()
    conn = sqlite3.connect("forum.db")
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS comments (id TEXT, content TEXT, user_id TEXT, thread_id TEXT)")
    c.execute("INSERT INTO comments (id, content, user_id, thread_id) VALUES (?, ?, ?, ?)", (comment_id, comment.content, comment.user_id, comment.thread_id))
    conn.commit()
    conn.close()
    return {"comment_id": comment_id}