package bd

import (
	"context"
	"time"

	"github.com/hidromagnetismo/twittor/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// InsertoTweet graba Tweet en la BD
func InsertoTweet(t models.GraboTweet, ID string) (string, bool, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twittor")
	col := db.Collection("tweet")

	objUserID, _ := primitive.ObjectIDFromHex(ID)

	t.UserID = objUserID

	result, err := col.InsertOne(ctx, t)
	if err != nil {
		return "", false, err
	}

	ObjID, _ := result.InsertedID.(primitive.ObjectID)
	return ObjID.String(), true, nil
}
