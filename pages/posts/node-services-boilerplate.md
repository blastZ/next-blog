# Node Typescript

```bash
npm init

npm install koa @koa/router @koa/cors koa-body

npm install -D typescrip

tsc --init

# edit target to es2018
# outDir to dist
# moduleResolution to node
# include ['src/**/*']

npm install -D @types/koa @types/koa__router



# For local config
npm install dotenv
```

## Format code

```bash
touch .prettierrc
```

init prettier config

```json
{
  "printWidth": 140,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

## Fetch Data

```bash
npm install axios
```

## Connect Database

```bash
npm install mongoose

npm install -D @types/mongoose
```

## Authorization

```bash
npm install jsonwebtoken bcrypt
npm install -D @types/jsonwebtoken @types/bcrypt
```
