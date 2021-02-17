package main

import (
	"log"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/handlers"
)

func main() {
	if bd.ChequeoConnection() == 0 {
		log.Fatal("Sin conexión a la BD")
		return
	}
	handlers.Manejadores()
}
