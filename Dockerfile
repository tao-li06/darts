FROM node:8.11.1

RUN mkdir /workspace
WORKDIR /workspace
copy . /workspace
ENV NODE_ENV production
RUN npm install
RUN npm run build
EXPOSE 80
CMD npm run dev