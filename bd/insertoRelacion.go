package bd

import (
	"context"
	"time"

	"github.com/hidromagnetismo/twittor/models"
)

// InsertoRelacion graba la relacion en la BD
func InsertoRelacion(r models.Relacion) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relacion")

	_, err := col.InsertOne(ctx, r)
	if err != nil {
		return false, err
	}

	return true, nil
}
