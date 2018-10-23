FROM node:alpine 

WORKDIR /usr/app
COPY ./ ./
run npm install -g @angular/cli 
EXPOSE 4400
run npm install 

CMD ["ng", "serve", "-H", "0.0.0.0", "--port", "4400"]