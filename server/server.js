// Backend Server Setup for Minnestunder
// Run with: npm run dev (from server directory)
// or: node server.js

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Firebase Admin Setup
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}')
if (Object.keys(serviceAccount).length > 0) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

const db = getFirestore()
const auth = getAuth()

// Routes

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Posts Routes
app.get('/api/posts', async (req, res) => {
  try {
    const snapshot = await db.collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/posts', async (req, res) => {
  try {
    const { userId, content, type, image } = req.body
    
    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()

    const newPost = {
      userId,
      author: {
        name: userData.displayName,
        image: userData.profileImage,
      },
      content,
      type,
      image: image || null,
      likes: 0,
      comments: 0,
      candles: 0,
      createdAt: new Date().toISOString(),
    }

    const docRef = await db.collection('posts').add(newPost)
    res.status(201).json({ id: docRef.id, ...newPost })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    await db.collection('posts').doc(postId).delete()
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Comments Routes
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params
    const snapshot = await db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .get()
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params
    const { userId, content } = req.body

    const userDoc = await db.collection('users').doc(userId).get()
    const userData = userDoc.data()

    const newComment = {
      userId,
      author: {
        name: userData.displayName,
        image: userData.profileImage,
      },
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
    }

    const docRef = await db.collection('posts')
      .doc(postId)
      .collection('comments')
      .add(newComment)
    
    res.status(201).json({ id: docRef.id, ...newComment })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Users Routes
app.get('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const userDoc = await db.collection('users').doc(userId).get()
    if (userDoc.exists()) {
      res.json({ id: userDoc.id, ...userDoc.data() })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    await db.collection('users').doc(userId).update(req.body)
    const userDoc = await db.collection('users').doc(userId).get()
    res.json({ id: userDoc.id, ...userDoc.data() })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Memorial Routes
app.get('/api/memorial', async (req, res) => {
  try {
    const memorialDoc = await db.collection('memorial').doc('main').get()
    if (memorialDoc.exists()) {
      res.json(memorialDoc.data())
    } else {
      res.status(404).json({ error: 'Memorial not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.put('/api/memorial', async (req, res) => {
  try {
    await db.collection('memorial').doc('main').set(req.body, { merge: true })
    const memorialDoc = await db.collection('memorial').doc('main').get()
    res.json(memorialDoc.data())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Admin Routes
app.delete('/api/admin/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params
    // Verify admin status here
    await db.collection('posts').doc(postId).delete()
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/api/admin/posts/:postId/comments/:commentId', async (req, res) => {
  try {
    const { postId, commentId } = req.params
    await db.collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(commentId)
      .delete()
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🔥 Minnestunder API server running on http://localhost:${PORT}`)
  console.log(`📚 Available at http://localhost:${PORT}/health`)
})

export default app
