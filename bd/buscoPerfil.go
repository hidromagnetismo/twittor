package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// BuscoPerfil busca un perfil en la BD
func BuscoPerfil(userID string) (models.Usuario, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("usuarios")

	var perfil models.Usuario

	objID, _ := primitive.ObjectIDFromHex(userID)

	condicion := bson.M{
		"_id": objID,
	}

	err := col.FindOne(ctx, condicion).Decode(&perfil)
	// Testing
	// perfil.Password = ""
	perfil.Password = ""
	if err != nil {
		fmt.Println("Registro no encontrado " + err.Error())
		return perfil, err
	}
	return perfil, nil
}
