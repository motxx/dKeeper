FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package.json index.ts response.ts ./
COPY data/ data/
RUN npm install
RUN npm run build
    

FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
# CMD ["index.handler"]

COPY lambda-entrypoint.sh /lambda-entrypoint.sh
RUN chmod +x /lambda-entrypoint.sh

ENTRYPOINT ["/lambda-entrypoint.sh"]