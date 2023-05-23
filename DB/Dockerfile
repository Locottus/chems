# docker build  -t ng-backend-chemita .
# docker run --p 3000:3000 -d ng-backend-chemita  
# docker exec -it ng-backend-chemita /bin/bash
FROM node:20-alpine
WORKDIR /usr/src/app
EXPOSE 3000
COPY package*.json ./

RUN npm install
COPY . .

# If you are building your code for production
# RUN npm ci --only=production

CMD [ "npm", "start" ]

