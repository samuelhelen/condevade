FROM python:3

WORKDIR /usr/src/app

# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt

RUN [ "apt", "update" ]
RUN [ "apt", "install", "iproute2", "-y" ]

COPY . .

EXPOSE 8080

CMD [ "python", "./service2.py" ]

