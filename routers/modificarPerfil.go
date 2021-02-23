package routers

import (
	"encoding/json"
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
)

// ModificarPerfil modifica el perfil de usuario
func ModificarPerfil(w http.ResponseWriter, r *http.Request) {

	var u models.Usuario

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Datos Incorrectos "+err.Error(), 400)
		return
	}

	var status bool
	status, err = bd.ModificoRegistro(u, IDUsuario)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar modificar el registro. Reintente nuevamente "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "No se ha logrado modificar el registro del usuario ", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
