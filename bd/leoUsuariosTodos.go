package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// LeoUsuariosTodos Lee los usuarios registrados en el sistema, si se recibe "R" en quienes trae solo los que se relacionan conmigo
func LeoUsuariosTodos(ID string, page int64, search string, tipo string) ([]*models.Usuario, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("usuarios")

	var results []*models.Usuario

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)

	query := bson.M{
		"nombre": bson.M{"$regex": `(?i)` + search},
	}

	cur, err := col.Find(ctx, query, findOptions)
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}

	var encontrado, incluir bool

	for cur.Next(ctx) {
		var u models.Usuario
		err := cur.Decode(&u)
		if err != nil {
			fmt.Println(err.Error())
			return results, false
		}

		var rel models.Relacion
		rel.UsuarioID = ID
		rel.UsuarioRelacionID = u.ID.Hex()

		incluir = false

		encontrado, err = ConsultoRelacion(rel)
		if tipo == "new" && encontrado == false {
			incluir = true
		}
		if tipo == "follow" && encontrado == true {
			incluir = true
		}

		if rel.UsuarioRelacionID == ID {
			incluir = false
		}

		if incluir == true {
			u.Password = ""
			u.Biografia = ""
			u.SitioWeb = ""
			u.Ubicacion = ""
			u.Banner = ""
			u.Banner = ""

			results = append(results, &u)
		}
	}

	err = cur.Err()
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}
	cur.Close(ctx)
	return results, true
}
