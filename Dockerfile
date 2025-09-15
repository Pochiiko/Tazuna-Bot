# Use alpine nodejs image for smaller images
FROM node:alpine3.22

# Update apk repo, install git and some other things 
RUN apk update
RUN apk add nano curl

# Standard working directory
WORKDIR /app

# Pull git repo
COPY . .

# Install deps
RUN npm i

# Entrypoint

ENTRYPOINT ["npm", "run", "start"]