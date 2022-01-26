#!/bin/bash

# Check if needed env vars are available
if [[ -z $FTP_USER || -z $FTP_PASSWORD || -z $FTP_DOMAIN || -z $LOCAL_FOLDER || -z $REMOTE_FOLDER ]]; then
  echo 'One or more needed env vars are undefined! Take a look at the example usage declaration.'
  exit 1
fi

echo "Making sure all files are cloned by previous workflow step"
ls -al

echo 'Installing packages and building'
npm install && npm run build # Output built files in /me/dist/kc

echo 'Replacing content'
lftp -e "mirror --reverse --delete-first $LOCAL_FOLDER $REMOTE_FOLDER; quit" -u $FTP_USER,$FTP_PASSWORD $FTP_DOMAIN

echo 'New build succesfully deployed!'