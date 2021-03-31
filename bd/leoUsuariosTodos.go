package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	b "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// LeoUsuariosTodos obtiene los usuarios que se estan siguien (follow) o nó (new) por el usuario
func LeoUsuariosTodos(userID string, search string, typeUser string, limit int64, page int64) ([]*models.Usuario, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("usuarios")

	var results []*models.Usuario

	userObjID, _ := primitive.ObjectIDFromHex(userID)

	operator := map[string]string{
		"new":    "$ne",
		"follow": "$eq",
	}

	query := b.A{
		b.M{"$match": b.M{"$and": b.A{
			b.M{"nombre": b.M{"$regex": `(?i)` + search}},
			b.M{"_id": b.M{"$ne": userObjID}},
		}}},
		b.M{"$lookup": b.M{
			"from": "relacion",
			"let":  b.M{"local_id": "$_id"},
			"pipeline": b.A{
				b.M{"$match": b.M{"$expr": b.M{"$eq": b.A{"$_userRelacionId", "$$local_id"}}}},
				b.M{"$project": b.M{"_userId": 1, "_id": 0}},
			},
			"as": "relaciones",
		}},
		b.M{"$match": b.M{"relaciones._userId": b.M{operator[typeUser]: userObjID}}},
		b.M{"$project": b.M{"relaciones": 0}},
		b.M{"$sort": b.M{"nombre": 1}},
		b.M{"$skip": (page - 1) * limit},
		b.M{"$limit": limit},
	}

	cur, err := col.Aggregate(ctx, query)
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}

	err = cur.All(ctx, &results)
	if err != nil {
		fmt.Println("Error al procesar los Usuarios " + err.Error())
		return results, false
	}

	err = cur.Err()
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}

	cur.Close(ctx)

	return results, true
}
