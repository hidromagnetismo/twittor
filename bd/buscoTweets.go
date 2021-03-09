package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// BuscoTweets busca los tweets con usuario ID en la BD
func BuscoTweets(userID string, limit int64, page int64) ([]models.LeoTweets, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	var tweetsGT []models.GraboTweet
	var tweetsLT []models.LeoTweets

	userObjID, _ := primitive.ObjectIDFromHex(userID)

	condicion := bson.M{
		"_userId": userObjID,
	}

	opciones := options.Find()
	opciones.SetSort(bson.D{{Key: "fecha", Value: -1}})
	opciones.SetLimit(limit)
	opciones.SetSkip((page - 1) * limit)

	results, err := col.Find(ctx, condicion, opciones)
	if err != nil {
		fmt.Println("Tweets no encontrados " + err.Error())
		return tweetsLT, err
	}

	err = results.All(ctx, &tweetsGT)
	if err != nil {
		fmt.Println("Error al procesar los Tweets " + err.Error())
		return tweetsLT, err
	}

	var tweetLT models.LeoTweets

	for _, tweetGT := range tweetsGT {
		tweetLT.UserID = tweetGT.UserID.Hex()
		tweetLT.Mensaje = tweetGT.Mensaje
		tweetLT.Fecha = tweetGT.Fecha
		tweetsLT = append(tweetsLT, tweetLT)
	}

	return tweetsLT, nil
}
