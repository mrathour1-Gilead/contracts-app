FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (using ci for deterministic builds)
RUN npm ci

# Copy source code
COPY src ./src

EXPOSE 8000

CMD ["npm", "start"]
