package bd

import (
	"context"
	"errors"
	"time"

	"github.com/hidromagnetismo/twittor/models"
)

// InsertoRelacion graba la relacion en la BD
func InsertoRelacion(rel models.Relacion) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relacion")

	var result models.Relacion

	err := col.FindOne(ctx, rel).Decode(&result)
	if err == nil {
		return false, errors.New("Ya existe el registro en la BD")
	}
	_, err = col.InsertOne(ctx, rel)
	if err != nil {
		return false, err
	}

	return true, nil
}
