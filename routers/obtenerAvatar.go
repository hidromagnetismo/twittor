package routers

import (
	"io"
	"net/http"
	"os"

	"github.com/hidromagnetismo/twittor/bd"
)

// ObtenerAvatar envia el Avatar al HTTP
func ObtenerAvatar(w http.ResponseWriter, r *http.Request) {

	userID := r.URL.Query().Get("userId")
	if len(userID) < 1 {
		http.Error(w, "Debe enviar el parámetro userId", http.StatusBadRequest)
		return
	}

	perfil, err := bd.BuscoPerfil(userID)
	if err != nil {
		http.Error(w, "Usuario no encontrado", http.StatusBadRequest)
		return
	}

	OpenFile, err := os.Open("uploads/avatars/" + perfil.Avatar)
	if err != nil {
		http.Error(w, "Imagen no encontrada", http.StatusBadRequest)
		return
	}

	_, err = io.Copy(w, OpenFile)
	if err != nil {
		http.Error(w, "Error al copiar la imagen", http.StatusBadRequest)
	}
}
