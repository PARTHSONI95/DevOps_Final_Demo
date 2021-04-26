FROM python:3.8-slim
COPY . /app
WORKDIR /app
RUN pip install -r uber-backend/requirements.txt && \
pip uninstall bson -y && \
pip uninstall pymongo -y && \
pip3 install bson && \
pip3 install pymongo
EXPOSE 5000
CMD gunicorn --threads=3 --bind 0.0.0.0:5000 wsgi:app
#ENTRYPOINT ["python3"]
#CMD ["uberbe.py"]