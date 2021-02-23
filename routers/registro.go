package routers

import (
	"encoding/json"
	"net/http"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
)

// Registro es la funcion para crear en la BD el registro de usuario
func Registro(w http.ResponseWriter, r *http.Request) {
	var u models.Usuario
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Error en los datos recibidos. "+err.Error(), 400)
		return
	}

	if len(u.Email) == 0 {
		http.Error(w, "El email de usuario es requerido", 400)
		return
	}

	if len(u.Password) < 6 {
		http.Error(w, "Debe especificar una contraseña de al menos 6 caracteres", 400)
		return
	}

	_, encontrado, _ := bd.ChequeoYaExisteUsuario(u.Email)
	if encontrado == true {
		http.Error(w, "Ya existe un usuario registrado con ese email", 400)
		return
	}

	_, status, err := bd.InsertoRegistro(u)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar realizar el registro de usuario. "+err.Error(), 400)
		return
	}

	if status == false {
		http.Error(w, "No se ha logrado insertar el registro del usuario", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
