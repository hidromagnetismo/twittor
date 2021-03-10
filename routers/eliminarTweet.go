package routers

import (
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
)

// EliminarTweet elimina un Tweet de un usuario
func EliminarTweet(w http.ResponseWriter, r *http.Request) {

	req := r.URL.Query()

	ID := req.Get("id")
	if len(ID) < 1 {
		http.Error(w, "Debe enviar el parámetro ID", http.StatusBadRequest)
		return
	}

	err := bd.EliminoTweet(ID, IDUsuario)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar eliminar el Tweet. Reintente nuevamente "+err.Error(), 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
