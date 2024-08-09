FROM node:22.4-slim
WORKDIR /work
COPY ./package.json ./package-lock.json .
RUN npm install
COPY ./ .
CMD ["npx", "ts-node", "index.ts"]
