package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/hidromagnetismo/twittor/bd"
)

// LeoTweets permite leer los tweets de un usuario por su userID
func LeoTweets(w http.ResponseWriter, r *http.Request) {

	defer r.Body.Close()

	req := r.URL.Query()

	userID := req.Get("userId")
	if len(userID) < 1 {
		http.Error(w, "Debe enviar el parámetro userId", http.StatusBadRequest)
		return
	}

	limit, err := strconv.ParseInt(req.Get("limit"), 10, 64)
	if err != nil {
		http.Error(w, "limit debe ser un numero "+err.Error(), 400)
		return
	}
	if limit > 18 || limit < 1 {
		http.Error(w, "limit debe estar comprendido entre 1 y 18", http.StatusBadRequest)
		return
	}

	page, err := strconv.ParseInt(req.Get("page"), 10, 64)
	if err != nil {
		http.Error(w, "page debe ser un numero "+err.Error(), 400)
		return
	}
	if page < 1 {
		http.Error(w, "page debe ser mayor o igual a 1", http.StatusBadRequest)
		return
	}

	tweets, err := bd.BuscoTweets(userID, limit, page)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar buscar los tweets "+err.Error(), 400)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(tweets)
}
