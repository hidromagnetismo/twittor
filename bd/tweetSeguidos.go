package bd

import (
	"context"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// TweetSeguidos lee los tweets de todos los que seguimos
func TweetSeguidos(userID string, limit int, page int) ([]models.TweetSeguidos, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("relacion")

	skip := (page - 1) * limit

	userObjID, _ := primitive.ObjectIDFromHex(userID)

	condiciones := make([]bson.M, 0)
	condiciones = append(condiciones, bson.M{"$match": bson.M{"_userId": userObjID}})
	condiciones = append(condiciones, bson.M{
		"$lookup": bson.M{
			"from":         "tweet",
			"localField":   "_userRelacionId",
			"foreignField": "_userId",
			"as":           "tweet",
		},
	})
	condiciones = append(condiciones, bson.M{"$unwind": "$tweet"})
	condiciones = append(condiciones, bson.M{"$sort": bson.M{"tweet.fecha": -1}})
	condiciones = append(condiciones, bson.M{"$skip": skip})
	condiciones = append(condiciones, bson.M{"$limit": limit})

	cursor, err := col.Aggregate(ctx, condiciones)
	var result []models.TweetSeguidos
	err = cursor.All(ctx, &result)
	if err != nil {
		return result, false
	}
	return result, true
}
