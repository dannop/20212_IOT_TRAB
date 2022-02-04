from socket import *
import time
import paho.mqtt.publish as publish

mqtt_broker = 'broker.mqttdashboard.com'
mqtt_port = 1883
mqtt_topic = "iot2022/danno"

HOST = ''
PORT = 5555

gateway_socket = socket(AF_INET, SOCK_DGRAM)
gateway_address = (HOST, PORT)
gateway_socket.bind((HOST, PORT))

def createConnection():    
    print('Gateway aguardando dados ...')
    
    while True:
        try:
            message, address = gateway_socket.recvfrom(8192)
            ts = int(time.time())
            
            if ts%5 == 0:
                sensor_data = str(message).split(",")
                print(sensor_data)
                
                if len(sensor_data) > 5:
                    # print(sensor_data[2], sensor_data[3])
                    msg = "{},{}".format(sensor_data[2],sensor_data[3])
                    publish.single(mqtt_topic, msg, hostname=mqtt_broker, port=mqtt_port)                
        
        except Exception as e: 
            print("Houve um problema no servidor!", e) 
            gateway_socket.close()
            break

if __name__ == "__main__":
    createConnection()