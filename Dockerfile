FROM node:8.11.1

RUN mkdir /workspace
WORKDIR /workspace
copy . /workspace
ENV NODE_ENV production
RUN npm install
RUN npm install node-sass@latest
RUN npm run build
EXPOSE 3000
CMD npm run start