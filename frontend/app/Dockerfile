FROM node:16 as build

WORKDIR '/app'

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx
COPY --from=build /app/dist/app /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d
COPY nginx/uwsgi_params /etc/nginx/uwsgi_params
EXPOSE 80
