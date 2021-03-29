package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/hidromagnetismo/twittor/bd"
)

// ListaUsuarios retorna la lista de usuarios que se estan(follow)/o nó (new) siguiendo por el usuario
func ListaUsuarios(w http.ResponseWriter, r *http.Request) {

	req := r.URL.Query()

	typeUser := req.Get("type")
	search := req.Get("search")

	limit, err := strconv.ParseInt(req.Get("limit"), 10, 64)
	if err != nil {
		http.Error(w, "Debe enviar al parámetro limite como entero mayor a 0", http.StatusBadRequest)
		return
	}

	page, err := strconv.ParseInt(req.Get("page"), 10, 64)
	if err != nil {
		http.Error(w, "Debe enviar al parámetro página como entero mayor a 0", http.StatusBadRequest)
		return
	}

	result, status := bd.LeoUsuariosTodos(IDUsuario, search, typeUser, limit, page)
	if status == false {
		http.Error(w, "Error al leer los usuarios", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}
