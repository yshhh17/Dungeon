FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
build-essential \
gcc \
libffi-dev \
libssl-dev \
libpq-dev \
python3-dev \
&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN python -m pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/uploads

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
