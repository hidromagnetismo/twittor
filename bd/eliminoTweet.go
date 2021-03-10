package bd

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// EliminoTweet permite modificar el perfil del usuario
func EliminoTweet(ID string, userID string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	objID, _ := primitive.ObjectIDFromHex(ID)
	userObjID, _ := primitive.ObjectIDFromHex(userID)

	filtro := bson.M{
		"_id":     bson.M{"$eq": objID},
		"_userId": bson.M{"$eq": userObjID},
	}

	_, err := col.DeleteOne(ctx, filtro)
	if err != nil {
		return false, err
	}

	return true, nil

}
