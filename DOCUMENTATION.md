# Minnestunder Documentation

## 🎨 Design Principles

### Glassmorphism
- Subtle blur (10-16px) behind all elements
- Semi-transparent backgrounds (rgba)
- Soft borders with low opacity
- Creates depth without heaviness

### Color Palette
```
Primary: Slate-950 (dark background)
Secondary: Slate-900 (containers)
Accent: Blue-600 (interactive elements)
Text: Slate-100 (light text)
```

### Typography
- **Font**: Inter
- **Display**: 4xl-5xl (bold)
- **Body**: Base (regular)
- **Small**: xs-sm (subtle)
- **Line Height**: 1.5

### Spacing
- Base unit: 4px
- Small gap: 2-3 units (8-12px)
- Medium gap: 4-6 units (16-24px)
- Large gap: 8-12 units (32-48px)

## 🚀 Features Implemented

### Frontend
✅ Vue 3 with Composition API
✅ Pinia state management
✅ Tailwind CSS styling
✅ Glassmorphism design
✅ Responsive layout (mobile-first)
✅ Dark mode (default)
✅ Smooth animations (200-400ms)
✅ Hero banner with parallax
✅ Quick action buttons
✅ Memory feed with social features
✅ Comment system
✅ Modal for memory words
✅ Authentication UI
✅ Admin panel
✅ Gallery view
✅ Filter pills
✅ Profile card

### Backend
✅ Firebase integration
✅ Express API server
✅ Firestore database
✅ Firebase Storage
✅ Authentication
✅ CORS configuration
✅ Error handling
✅ Admin routes

## 📁 Project Structure

```
minestunder/
├── src/
│   ├── components/          # Vue components
│   ├── views/              # Page components
│   ├── stores/             # Pinia stores
│   ├── lib/                # Firebase setup
│   ├── styles/             # CSS files
│   ├── utils/              # Helper functions
│   ├── App.vue
│   └── main.js
├── server/                 # Express backend
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── index.html              # HTML entry point
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase account

### Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Firebase credentials to .env

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Download Firebase service account key and add to .env

# Start server
npm run dev
```

## 🗄️ Firebase Setup

### 1. Create Firebase Project
- Go to https://console.firebase.google.com
- Create new project
- Enable Email/Password authentication
- Create Firestore database in test mode
- Enable Storage

### 2. Get Credentials
- Frontend: Copy Web SDK config from Project Settings
- Backend: Generate service account key from Project Settings > Service Accounts

### 3. Create Firestore Collections

```javascript
// users
{
  email: string
  displayName: string
  profileImage: string (URL)
  role: 'user' | 'admin'
  postsCount: number
  candlesLit: number
  createdAt: timestamp
}

// posts
{
  userId: string
  author: { name, image }
  content: string
  type: 'text' | 'image' | 'video'
  image: string (URL, optional)
  likes: number
  comments: number
  candles: number
  createdAt: timestamp
}

// posts/{postId}/comments
{
  userId: string
  author: { name, image }
  content: string
  likes: number
  createdAt: timestamp
}

// memorial/main
{
  name: string
  birthDate: string
  deathDate: string
  subtitle: string
  bannerImage: string (URL)
  profileImage: string (URL)
  biography: string
}
```

## 🎯 API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `DELETE /api/posts/:postId` - Delete post (admin)

### Comments
- `GET /api/posts/:postId/comments` - Get comments
- `POST /api/posts/:postId/comments` - Add comment
- `DELETE /api/posts/:postId/comments/:commentId` - Delete comment (admin)

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile

### Memorial
- `GET /api/memorial` - Get memorial info
- `PUT /api/memorial` - Update memorial info (admin)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change color scheme

### Fonts
Edit `src/styles/main.css` to change typography

### Animations
Edit `src/styles/animations.css` to adjust timing

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Security Considerations

1. **Authentication**
   - Use Firebase Authentication
   - Never store tokens in localStorage (use httpOnly cookies)
   - Validate all requests on backend

2. **Authorization**
   - Check user role before admin operations
   - Validate ownership before allowing edits
   - Use Firestore security rules

3. **Data Validation**
   - Validate input on frontend and backend
   - Sanitize user content
   - Rate limit API endpoints

4. **Images**
   - Validate file types
   - Compress before upload
   - Use CDN for delivery

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel
```

### Backend (Firebase Functions or Railway)
```bash
# Deploy to Firebase Functions
firebase deploy --only functions

# Or deploy to Railway
railway up
```

## 📊 Performance

- Code splitting for faster initial load
- Lazy loading for images and routes
- Caching strategy with Pinia persistence
- Optimized animations (GPU-accelerated)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For questions or issues, please open an issue on GitHub.
