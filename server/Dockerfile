# שלב 1: התקנת התלויות ובניית הקוד של NestJS
FROM node:18-alpine AS builder

WORKDIR /app

# העתקת קבצי הקונפיגורציה והחבילות
COPY nx.json tsconfig.base.json package*.json ./
COPY apps ./apps
COPY server ./server
COPY timesheet ./timesheet
COPY api-gateway ./api-gateway

# העתקת קבצי הקונפיגורציה של ESLint
COPY .eslintrc.json ./
COPY apps/front/.eslintrc.json ./apps/front/.eslintrc.json
COPY server/.eslintrc.json ./server/.eslintrc.json
COPY timesheet/.eslintrc.json ./timesheet/.eslintrc.json
COPY api-gateway/.eslintrc.json ./api-gateway/.eslintrc.json

# התקנת התלויות
RUN npm install

# ניקוי קאש של Nx
RUN npx nx reset

# בניית הקוד של NestJS לכל השירותים
RUN npx nx build server --prod --verbose
RUN npx nx build timesheet --prod --verbose
RUN npx nx build api-gateway --prod --verbose

# בדיקה אם /app/dist קיים לאחר הבנייה לצורך דיבוג
RUN ls -la /app/dist 

# שלב 2: הפעלת האפליקציה
FROM node:18-alpine

WORKDIR /app

# התקנה גלובלית של nx
RUN npm install -g @nrwl/cli

# התקנת @nrwl/workspace (אם נדרש)
RUN npm install @nrwl/workspace --legacy-peer-deps

# העתקת המוצרים מהשלב הקודם
COPY --from=builder /app/dist /app/dist 

# העתקת החבילות הדרושות רק לפרודקשן
COPY package*.json ./
RUN npm install --only=production

# הפעלת השירותים
CMD ["sh", "-c", "node dist/server/main.js & node dist/timesheet/main.js & node dist/api-gateway/main.js"]
