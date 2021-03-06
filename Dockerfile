FROM node:12-alpine

# Create app directory
RUN mkdir -p constant
WORKDIR /constant

# Installing dependencies
COPY package*.json yarn.lock ./
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn build


# Running the app
CMD [ "yarn", "dev" ]