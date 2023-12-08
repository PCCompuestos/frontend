# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the current directory to /app
COPY . .

# Install dependencies
RUN npm install

# Build the Nuxt.js project
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Command to run the application
CMD ["node", ".output/server/index.mjs"]
