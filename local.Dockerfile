#Download Node Alpine image
FROM node:alpine As build

#Setup the working directory
WORKDIR /usr/src/app

#Copy package.json
COPY package.json package-lock.json ./

#Install dependencies
RUN npm install

#Copy other files and folder to working directory
COPY . .

#Build Angular application in local mode
RUN npm run build:local

#Download NGINX Image
FROM nginx:alpine

#Copy built angular app files to NGINX HTML folder
COPY --from=build /usr/src/app/dist/agriculture-administration-app-fe/* /usr/share/nginx/html

# Copy the custom NGINX configuration
COPY local-nginx.conf /etc/nginx/conf.d/default.conf
