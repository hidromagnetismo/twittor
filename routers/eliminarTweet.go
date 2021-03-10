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

	var status bool
	status, err := bd.EliminoTweet(ID, IDUsuario)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar eliminar el Tweet. Reintente nuevamente "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "No se ha logrado eliminar el Tweet del usuario ", 400)
		return
	}

	w.WriteHeader(http.StatusOK)

}
