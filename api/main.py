from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_mqtt import FastMQTT, MQTTConfig
import haversine as hs
from haversine import Unit

mqtt_broker = 'broker.mqttdashboard.com'
mqtt_port = 1883
mqtt_topic = "iot2022/danno"

FILE_NAME = "data.txt"

app = FastAPI()

origins = [
  "http://localhost",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

fast_mqtt = FastMQTT(config=MQTTConfig(host=mqtt_broker, port=mqtt_port, keepalive = 60))

fast_mqtt.init_app(app)

# Mensagem de conecção
@fast_mqtt.on_connect()
def connect(client, flags, rc, properties):
  # fast_mqtt.client.subscribe("/mqtt") #subscribing mqtt topic 
  print("Connected: ", client, flags, rc, properties)

# Quando uma mensagem é postada no tópíco
@fast_mqtt.on_message()
async def message(client, topic, payload, qos, properties):
  print("Received message: ",topic, payload.decode(), qos, properties)
  return 0

# Mensagem de desconexão
@fast_mqtt.on_disconnect()
def disconnect(client, packet, exc=None):
  print("Disconnected")

# Mensagem de subscrição
@fast_mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
  print("subscribed", client, mid, qos, properties)

# Subscrição em um determinado tópíco
@fast_mqtt.subscribe(mqtt_topic)
async def get_topic_data(client, topic, payload, qos, properties):
  print("data: ", topic, payload.decode(), qos, properties)
  text_file = open(FILE_NAME, "a+")
  n = text_file.write(payload.decode()+"\n")
  text_file.close()
  latlng = payload.decode().split(",")
  loc1=(-22.9045472,-43.1310969)
  loc2=(float(latlng[0]), float(latlng[1]))
  distance = hs.haversine(loc1,loc2,unit=Unit.METERS)
  print(distance)

  return 0

@app.get("/locations")
async def get_data():
  mf = open(FILE_NAME, "r+")
  file_content = mf.readlines()

  ret_pos = []

  for line in file_content:
    aux = line.replace("\n","")
    aux = aux.split(",")
    ret_pos.append({
      "lat": float(aux[0]),
      "lng": float(aux[1]),
    })

  return ret_pos