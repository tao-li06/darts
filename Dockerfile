FROM node:6.14.1

RUN mkdir /workspace
WORKDIR /workspace
copy . /workspace
ENV NODE_ENV production
RUN npm install
EXPOSE 5000
CMD npm run dev