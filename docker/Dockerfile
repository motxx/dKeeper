FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:16 as builder
WORKDIR /usr/app
COPY package.json index.ts response.ts ./
COPY data/ data/
COPY contexts/ contexts/
RUN npm install
RUN npm run build

FROM --platform=linux/amd64 public.ecr.aws/lambda/nodejs:16
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/* ./
COPY --from=builder /usr/app/contexts/* /var/contexts/
CMD ["index.handler"]

#COPY lambda-entrypoint.sh /lambda-entrypoint.sh
#RUN chmod +x /lambda-entrypoint.sh

#ADD aws-lambda-rie-arm64 /usr/local/bin/aws-lambda-rie

#ENTRYPOINT [ "/lambda-entrypoint.sh" ]
