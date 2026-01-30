FROM mcr.microsoft.com/playwright:v1.58.1-jammy AS base

WORKDIR /app

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN apt-get update \
  && apt-get install -y --no-install-recommends pandoc \
  && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install

FROM base AS app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

CMD ["npm", "run", "build"]
