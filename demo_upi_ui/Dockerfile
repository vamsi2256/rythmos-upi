FROM node:12

# set working directory
WORKDIR /app/upi

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]