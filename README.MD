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

Entre em "gateway" ou "api" parte do projeto e execute:

```shell
sudo python3 -m pip install -r packages.txt
```