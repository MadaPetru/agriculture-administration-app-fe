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

#Build Angular application in PROD mode
RUN npm run build --production

#Download NGINX Image
FROM nginx:alpine

#Copy built angular app files to NGINX HTML folder
COPY --from=build /usr/src/app/dist/agriculture-administration-app-fe/* /usr/share/nginx/html
