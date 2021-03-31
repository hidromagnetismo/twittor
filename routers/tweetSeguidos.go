package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/hidromagnetismo/twittor/bd"
)

// TweetSeguidos lee los tweets de todos los que seguimos
func TweetSeguidos(w http.ResponseWriter, r *http.Request) {

	if len(r.URL.Query().Get("limit")) < 1 {
		http.Error(w, "Debe enviar el parámetro \"limit\"", http.StatusBadRequest)
		return
	}
	limit, err := strconv.Atoi(r.URL.Query().Get("limit"))
	if err != nil {
		http.Error(w, "Debe enviar el parámetro \"limit\" como entero mayor a 0", http.StatusBadRequest)
		return
	}

	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "Debe enviar el parámetro \"page\"", http.StatusBadRequest)
		return
	}
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "Debe enviar el parámetro \"page\" como entero mayor a 0", http.StatusBadRequest)
		return
	}
	respuesta, correcto := bd.TweetSeguidos(IDUsuario, limit, page)
	if correcto == false {
		http.Error(w, "Error al leer los tweets", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(respuesta)
}
