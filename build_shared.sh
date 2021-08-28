#!/bin/zsh

cd shared/ && npm run build && cd ..
cd gateway/ && npm install ../shared && cd ..
cd orders/ && npm install ../shared && cd ..
cd account-transactions/ && npm install ../shared && cd ..
cd market/ && npm install ../shared && cd ..
cd fees/ && npm install ../shared && cd ..
cd alerts/ && npm install ../shared && cd ..

echo "Built shared objects and installed across the board"