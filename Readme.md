## Requirements:

### 6TO5
  - [Github-6TO5](https://github.com/6to5/6to5)
  `npm install --global 6to5`

### NODEMON
  - [Github-Nodemon](https://github.com/remy/nodemon)
  `npm install --global nodemon`

## Once you have those installed:

### OPTIONAL:

## Like to use iojs?

### Want to manage it similar to nvm for node?

You should as of now probably use nodebrew alongside nvm:

### NODEBREW
  - [Github-Nodebrew](https://github.com/hokaccha/nodebrew)
  `curl -L git.io/nodebrew | perl - setup`

  - Add path to your shell config:
  `export PATH=$HOME/.nodebrew/current/bin:$PATH`

  - Rerun your source config or open new terminal
  `source ~/.zshrc` (or ~/.bashrc depending)

  - Install iojs
  ```
  $ nodebrew selfupdate
  $ nodebrew install-binary io@v1.0.0 (or whatever version you want)
  $ nodebrew use io@v1.0.0
  $ nodebrew ls
  ```

## Running The API

  `npm install`
  `npm start`

## Testing the API

  `npm test`

