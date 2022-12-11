# docker build  -t ng-backend-chemita .
# docker run  ng-backend-chemita

FROM node:19

WORKDIR /backend
EXPOSE 3000

COPY ["package.json", "package-lock.json", "index.js", "queries.js",  "/backend/"]

RUN npm install
CMD ["node",  "index.js"]