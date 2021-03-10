package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GraboTweet permite grabar el tweet en la base de datos
func GraboTweet(w http.ResponseWriter, r *http.Request) {

	var mensaje models.Tweet
	err := json.NewDecoder(r.Body).Decode(&mensaje)

	userObjID, _ := primitive.ObjectIDFromHex(IDUsuario)

	registro := models.GraboTweet{
		UserID:  userObjID,
		Mensaje: mensaje.Mensaje,
		Fecha:   time.Now(),
	}

	_, status, err := bd.InsertoTweet(registro)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar guardar el registro, reintente nuevamente "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "No se ha logrado insertar el Tweet", 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
