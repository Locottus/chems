# docker build  -t ng-backend-chemita .
# docker run --publish 3000:3000 -d ng-backend-chemita  
FROM node:19
WORKDIR /backend
EXPOSE 3000
COPY package.json /backend/
RUN npm install
COPY . /backend/
CMD [ "npm", "start" ]