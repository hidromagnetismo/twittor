package routers

import (
	"io"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"

	"github.com/hidromagnetismo/twittor/bd"
	"github.com/hidromagnetismo/twittor/models"
)

// SubirAvatar sube el Avatar al servidor
func SubirAvatar(w http.ResponseWriter, r *http.Request) {

	file, handler, err := r.FormFile("avatar")
	switch err {
	case nil:
		// do nothing
	case http.ErrMissingFile:
		http.Error(w, "No se encontro la KEY asociada al archivo! http.ErrMissingFile "+err.Error(), http.StatusBadRequest)
		log.Println("http.ErrMissingFile")
		return
	default:
		http.Error(w, "Ocurrió un error al obtener el archivo "+err.Error(), http.StatusBadRequest)
		log.Println(err)
		return
	}

	var array = strings.Split(handler.Filename, ".")
	var extension = strings.ToLower(array[len(array)-1])

	if extension == "jpg" {
		extension = "jpeg"
	}

	mached, err := regexp.MatchString("jpeg|png|gif", extension)

	if !mached {
		extension = ""
	} else {
		extension = "." + extension
	}

	var archivo string = "uploads/avatars/" + IDUsuario + extension

	f, err := os.OpenFile(archivo, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Error al subir la imagen ! "+err.Error(), http.StatusBadRequest)
		return
	}

	_, err = io.Copy(f, file)
	if err != nil {
		http.Error(w, "Error al copiar la imagen ! "+err.Error(), http.StatusBadRequest)
		return
	}

	var usuario models.Usuario
	var status bool

	usuario.Avatar = IDUsuario + extension
	status, err = bd.ModificoRegistro(usuario, IDUsuario)
	if err != nil || status == false {
		http.Error(w, "Error al grabar el avatar en la BD ! "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	// w.Write([]byte(`Test`))
}
