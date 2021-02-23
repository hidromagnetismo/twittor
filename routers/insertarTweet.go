package routers

import (
	"encoding/json"
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
)

// InsertarTweet es la funcion para crear en la BD un Tweet enviado por un usuario
func InsertarTweet(w http.ResponseWriter, r *http.Request) {

	var t models.GraboTweet

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Error en los datos recibidos. "+err.Error(), 400)
		return
	}

	_, status, err := bd.InsertoTweet(t, IDUsuario)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar guardar el Tweet del usuario. "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "No se ha logrado guardar el Tweet del usuario", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
