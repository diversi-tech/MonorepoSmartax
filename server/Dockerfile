
# Step 1: Installing the dependencies and building the NestJS code
FROM node:18-alpine AS builder

WORKDIR /app

# Copying the configuration files and packages
COPY nx.json tsconfig.base.json package*.json ./
COPY apps ./apps
COPY server ./server

# Copy ESLint configuration files
COPY .eslintrc.json ./
COPY apps/front/.eslintrc.json ./apps/front/.eslintrc.json
COPY server/.eslintrc.json ./server/.eslintrc.json
# COPY .eslintignore ./

# Install the dependencies
RUN npm install

# Clear Nx cache
RUN npx nx reset

# Building the NestJS code
RUN npx nx build server --prod --verbose

# Check if /app/dist exists after building for debugging
RUN ls -la /app/dist 

# Step 2: Launching the application
FROM node:18-alpine

WORKDIR /app

# Global nx installation
RUN npm install -g @nrwl/cli

# Install @nrwl/workspace (if required)
RUN npm install @nrwl/workspace --legacy-peer-deps

# Copying the products from the previous step
COPY --from=builder /app/dist /app/dist 
 # Ensure we copy the entire dist folder

# Copy the packages required for production only
COPY package*.json ./
RUN npm install --only=production

# Starting the application
CMD ["node", "dist/server/main.js"] 
 # Updated path to main.js
