#!/bin/bash

VM_NAME="venv"
PORT=5944
FULL_DIR="$PWD/$VM_NAME"

python3 -m venv $FULL_DIR

source $FULL_DIR/bin/activate

pip3 install -r requirements.txt

gunicorn -b 127.0.0.1:$PORT "app:create_app()"
