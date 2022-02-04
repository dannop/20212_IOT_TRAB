# Trabalho Final de IoT
Daniel Lessa e Eduardo Martins

## Dispositivo 
Abra o app "IMU+GPS+Stream" e ative o "Switch Stream" 

## Client
Iniciando o cliente

```bash
npm run dev
```

## Gateway
Iniciando o Gateway para resgatar a posição do dispositivo

```shell
cd gateway
python3 main.py
```

## API
Iniciando a API

```shell
cd api
uvicorn main:app --reload
```

### Dependencias

No cliente rode:

```bash
npm install
```

Entre em "gateway" ou "api" parte do projeto e execute:

```shell
sudo python3 -m pip install -r packages.txt
```