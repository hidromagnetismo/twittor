package routers

import (
	"encoding/json"
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ConsultaRelacion chequea si hay relacion entre 2 usuarios
func ConsultaRelacion(w http.ResponseWriter, r *http.Request) {
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

	var resp models.RespuestaConsultaRelacion

	status, err := bd.ConsultoRelacion(rel)
	if err != nil || status == false {
		resp.Status = false
	} else {
		resp.Status = true
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}
