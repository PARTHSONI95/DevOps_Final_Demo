# FROM python:3.8-slim
# COPY . /app
# WORKDIR /app
# RUN pip install -r uber-backend/requirements.txt && \
# pip uninstall bson -y && \
# pip uninstall pymongo -y && \
# pip3 install bson && \
# pip3 install pymongo
# RUN pwd && \
# echo '------XXXXXX------'
# EXPOSE 5000
# CMD gunicorn --threads=3 --bind 0.0.0.0:5000 wsgi:app
#ENTRYPOINT ["python"]
#CMD ["uberbe.py"]
FROM python:3.8-slim
WORKDIR /app
ADD . .
#RUN apk update
RUN apt-get update
RUN pip install -r requirements.txt && \
pip uninstall bson -y && \
pip uninstall pymongo -y && \
pip3 install bson && \
pip3 install pymongo


# run as non-root user
RUN adduser --disabled-password myuser
USER myuser



# run gunicorn with 3 threads listening on port 5000.
EXPOSE 5000
CMD gunicorn --threads=3 --bind 0.0.0.0:5000 wsgi:app