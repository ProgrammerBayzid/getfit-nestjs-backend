# Use the official Node.js image with Yarn as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package*.json yarn.lock ./

# Install NestJS CLI globally
RUN yarn global add @nestjs/cli

# Install dependencies
RUN yarn install

# Copy the application code to the container
COPY . .

# Build the NestJS application
RUN nest build

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
