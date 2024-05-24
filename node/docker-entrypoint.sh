#!/bin/sh
set -e

# Instale as dependências
npm install

# Execute o comando original
exec "$@"
la