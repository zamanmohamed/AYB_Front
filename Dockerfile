# 1. Use Node base image
FROM node::current

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy project files
COPY . .

# 5. Expose development port
EXPOSE 3000

# 6. Start the app
CMD ["npm", "start"]
