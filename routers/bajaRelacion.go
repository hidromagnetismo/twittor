package routers

import (
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// BajaRelacion realiza el borrado de la relacion entre usuarios
func BajaRelacion(w http.ResponseWriter, r *http.Request) {

	userRelacionId := r.URL.Query().Get("userRelacionId")
	if len(userRelacionId) < 1 {
		http.Error(w, "El parámetro \"userRelacionId\" es obligatorio", http.StatusBadRequest)
		return
	}

	if IDUsuario == userRelacionId {
		http.Error(w, "\"userRelacionId\" debe ser diferente del ID del usuario ", http.StatusBadRequest)
		return
	}

	var rel models.Relacion
	objID, _ := primitive.ObjectIDFromHex(IDUsuario)
	rel.UserID = objID
	objID, _ = primitive.ObjectIDFromHex(userRelacionId)
	rel.UserRelacionID = objID

	status, err := bd.BorroRelacion(rel)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar borrar la relación "+err.Error(), http.StatusBadRequest)
		return
	}
	if status == false {
		http.Error(w, "No se ha logrado borrar la relación "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
