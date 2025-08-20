FROM node:20-alpine AS development
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

RUN mkdir -p /opt/faco-times/app && chown node:node /opt/faco-times/app
WORKDIR /opt/faco-times

COPY --chown=node:node package.json package-lock.json* ./

RUN apk add --no-cache --virtual .gyp python3 make g++ \
  && npm install glob rimraf node-gyp \
  && apk del .gyp

RUN npm install --no-optional && npm cache clean --force

ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR /opt/faco-times/app

COPY --chown=node:node . .

RUN npm run build

USER node

CMD ["node", "dist/main"]

FROM node:20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=3000
ENV PORT $PORT

RUN mkdir -p /opt/faco-times/app && chown node:node /opt/faco-times/app
WORKDIR /opt/faco-times

COPY --chown=node:node package.json package-lock.json* ./

RUN npm install --only=production --ignore-scripts

WORKDIR /opt/faco-times/app

COPY --chown=node:node . .

COPY --from=development /opt/faco-times/app/dist ./dist

USER node

CMD ["node", "dist/main"]
