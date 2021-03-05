package bd

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoCN contiene la conexion a la base de datos
var MongoCN = ConectarBD()

// Localhost
// var clientOptions = options.Client().ApplyURI("mongodb://root:123456@localhost:27017")

// Digital Ocean
// var clientOptions = options.Client().ApplyURI("mongodb://root:123456@134.209.66.168:27017")

// mongodb.com
var clientOptions = options.Client().ApplyURI("mongodb+srv://root:XWBXgUne3U2OmMax@cluster0.lji8t.mongodb.net/twittor?retryWrites=true&w=majority")

// ConectarBD conecta a la base de datos
func ConectarBD() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	log.Println("Conexión Exitosa con la BD")
	return client
}

// ChequeoConnection hace ping a la BD
func ChequeoConnection() int {
	err := MongoCN.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
