#!/usr/bin/env bash

# Change connector from the first Argument to the second argument
# eg: ./change-connector.sh merlins sfcc
# sed 's/'$1'/'$2'/; /^\/\/ import initConnector.*$/d' ../app/main.jsx > ../app/main.$2.jsx
# mv -f ../app/main.$2.jsx ../app/main.jsx

sed 's/'$1'/'$2'/;' ../app/main.jsx > ../app/main.$2.jsx
# mv -f ../app/main.$2.jsx ../app/main.jsx