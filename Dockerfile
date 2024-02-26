FROM node:18.16.0

WORKDIR /app

# Copy package.json and lockfile
COPY . .
RUN yarn cache clean
# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Create .env file dynamically
ARG MEDUSA_BACKEND_URL=https://admin.bildeopc.com
ARG STRIPE_KEY
ARG SEARCH_APP_ID
ARG SEARCH_API_KEY
ARG SEARCH_INDEX_NAME
ARG OPENAI_API_KEY
ARG URLSHORT_USERNAME
ARG URLSHORT_PASSWORD

RUN echo "NEXT_PUBLIC_MEDUSA_BACKEND_URL=$MEDUSA_BACKEND_URL" > .env && \
    echo "NEXT_PUBLIC_STRIPE_KEY=$STRIPE_KEY" >> .env && \
    echo "NEXT_PUBLIC_SEARCH_APP_ID=$SEARCH_APP_ID" >> .env && \
    echo "NEXT_PUBLIC_SEARCH_API_KEY=$SEARCH_API_KEY" >> .env && \
    echo "NEXT_PUBLIC_SEARCH_INDEX_NAME=$SEARCH_INDEX_NAME" >> .env \
    echo "URLSHORT_USERNAME=$URLSHORT_USERNAME" >> .env \
    echo "URLSHORT_PASSWORD=$URLSHORT_PASSWORD" >> .env \
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> .env

# Build the app
RUN yarn run build

# Expose port
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]