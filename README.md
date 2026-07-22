# Happy Learn 🎓🌟

**Happy Learn** is a modern, interactive, and bilingual (English/Bangla) educational web application designed specifically for children. It makes learning fun through gamified quizzes covering 12 distinct categories, complete with text-to-speech support, beautiful animations, and a comprehensive parent dashboard to track progress.

## ✨ Features

- **12 Interactive Game Categories**: Colors, Animals, Shapes, Numbers, Emotions, Vehicles, Food, Alphabet, Weather, Clothing, Sports, and Body Parts.
- **Bilingual Support (English & Bangla)**: Seamlessly toggle the entire application's UI, game prompts, and text-to-speech audio between English and native Bengali.
- **Text-to-Speech (TTS)**: Automatically reads questions out loud with child-friendly pitch and speed (supports native Google Bengali voices).
- **Multi-Child Profiles**: Parents can create separate profiles for different children on the same device. Each child gets a unique avatar and their own progress tracker.
- **Parent Dashboard**: A dedicated dashboard for parents to monitor each child's learning accuracy (%), total stars earned, time spent learning, and AI-driven recommendations based on their strengths and weaknesses.
- **Gamification**: Children earn stars and are rewarded with beautiful confetti animations upon successful answers!

## 🧠 Human-Computer Interaction (HCI) Principles Applied

This project was built with a strong foundation in **Human-Computer Interaction (HCI)**, specifically targeting children with mild intellectual disabilities and ADHD. Here is what we did and how we applied HCI methodologies to our design and implementation:

- **User Personas & Empathy Mapping**: We designed the application around specific personas (e.g., a 7-year-old with ADHD and their parent), ensuring the UI addresses their pain points such as cognitive overload and anxiety from timers.
- **Accessibility & Cognitive Load Reduction**:
  - **No Countdowns or Punishments**: We removed time limits and harsh error sounds to prevent anxiety. Mistakes gently bounce back with a supportive "Try again" prompt.
  - **Large Touch Targets & Clear Typography**: All interactive elements are large (48px+), and we use rounded, dyslexia-friendly fonts (Nunito/Quicksand) with high-contrast, calming pastel color palettes.
  - **Minimalist Navigation**: Only one primary action is presented per screen, avoiding hidden menus or complex settings that could accidentally trap the user.
- **Nielsen's Heuristics**:
  - *Visibility of System Status*: Simple, visual progress bars are always visible during games.
  - *User Control and Freedom*: A ubiquitous, easy-to-find "Back/Home" button allows users to safely exit any game.
  - *Match Between System and Real World*: We use universally understood icons (Home, Speaker, Stars) paired with text.
- **Multimodal Feedback**: We integrated the **Web Speech API** for Text-to-Speech (TTS) to provide spoken instructions and positive reinforcement, reducing reliance on text reading. Visual rewards (confetti) and auditory praises ("Great Job!") are used to maximize engagement and sense of accomplishment.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite (TypeScript)
- **State Management**: Zustand
- **Styling**: Tailwind CSS + Shadcn UI components
- **Routing**: React Router DOM
- **Extras**: `react-confetti` for animations, Web Speech API for TTS, Dicebear for dynamic avatars.

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (via Neon) / SQLite (for local development)
- **ORM**: SQLAlchemy
- **Migrations**: Alembic

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.10+)
- PostgreSQL Database (Optional, defaults to local SQLite)

### 1. Clone the Repository
```bash
git clone https://github.com/Emon-X/Happy_Learn.git
cd happy-learn
```

### 2. Backend Setup
The backend runs on Python and FastAPI.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Create a .env file based on .env.example (or manually)
echo 'DATABASE_URL="sqlite:///./happy_learn.db"' > .env
# For Neon PostgreSQL, use: DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require"

# Run database migrations
alembic upgrade head

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
*The backend will be running at `http://localhost:8000`*

### 3. Frontend Setup
The frontend runs on React and Vite.

```bash
cd ../frontend

# Install dependencies
npm install

# Configure Environment Variables (if needed to point to backend)
echo 'VITE_API_URL="http://localhost:8000"' > .env

# Start the development server
npm run dev
```
*The frontend will be running at `http://localhost:5173`*

---

## 📂 Project Structure

```text
happy-learn/
├── backend/
│   ├── app/                 # FastAPI application (routers, models, schemas)
│   ├── alembic/             # Database migrations
│   └── .env                 # Backend environment variables (DB connections)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components (Shadcn UI)
│   │   ├── data/            # Game prompt definitions (En & Bn)
│   │   ├── pages/           # Main Views (Login, Home, Game, Parent Dashboard)
│   │   └── store/           # Zustand global state manager
│   ├── index.html
│   └── package.json
└── README.md
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/your-username/happy-learn/issues).

## 📝 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
