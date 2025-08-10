# ✈️ Airport Security Wait Times - (_In Progress_)

A modern, cross-platform mobile app that helps travelers check **real-time TSA security wait times** at airports across the United States — so you can plan your arrival and skip unnecessary stress.  

Built with **React Native & Expo** for a smooth mobile experience, integrated with **TSA and airport APIs** for accurate, live updates.

---

## 🚀 Features

- 📍 **Real-Time Wait Times** — Get up-to-the-minute TSA security checkpoint wait times.
- 🗺 **Interactive Airport Map** — See checkpoints and estimated wait times visually.
- 🔔 **Live Alerts** — Get notified when wait times exceed your preferred threshold.
- 🌐 **Multi-Airport Search** — Look up security wait times for any airport in the U.S.
- 📊 **Historical Trends** — View past wait time patterns to better plan future trips.
- 📱 **Offline Mode** — Last known data is cached for use without internet.
- 🛠 **Cross-Platform** — Works seamlessly on iOS and Android.

---

## 🛠️ Tech Stack

| Layer              | Technology |
|--------------------|------------|
| **Frontend**       | React Native, Expo, React Navigation |
| **Backend**        | Node.js, Express |
| **APIs**           | TSA Wait Times API, OpenWeatherMap API (optional for weather at airports) |
| **Database**       | Firebase Firestore (real-time sync) |
| **Push Notifications** | Expo Notifications |
| **Maps & Location**| Mapbox / Google Maps SDK |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- Expo CLI (`npm install -g expo-cli`)
- Firebase project configured
- API keys for TSA Wait Times API & Mapbox (or Google Maps)

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/airport-security-wait-times.git

# 2. Navigate to the project folder
cd airport-security-wait-times

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Fill in your API keys

# 5. Start the development server
expo start
