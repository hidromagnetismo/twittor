package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/hidromagnetismo/twittor/models"
)

// GeneroJWT genera el ecriptado con JWT
func GeneroJWT(u models.Usuario) (string, error) {

	miClave := []byte("MastersDelDesarrollo_grupoDeFacebook")

	// https://jwt.io/
	// Seteamos el PAYLOAD del token
	payload := jwt.MapClaims{
		"email":            u.Email,
		"nombre":           u.Nombre,
		"apellidos":        u.Apellidos,
		"fecha_nacimiento": u.FechaNacimiento,
		"biografia":        u.Biografia,
		"ubicacion":        u.Ubicacion,
		"sitioweb":         u.SitioWeb,
		"_id":              u.ID.Hex(),
		"exp":              time.Now().Add(30 * time.Minute).Unix(),
		// "exp":              time.Now().Add(24 * time.Hour).Unix(),
	}

	// Juntamos el HEADER y el PAYLOAD del token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)

	// Anexamos la firma (SIGNATURE) al token
	tokenStr, err := token.SignedString(miClave)

	if err != nil {
		return tokenStr, err
	}

	return tokenStr, nil

}
