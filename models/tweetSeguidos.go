package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// TweetSeguidos es la estructura con la que devolveremos los tweets
type TweetSeguidos struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	UserID         primitive.ObjectID `bson:"_userId,omitempty" json:"_userId,omitempty"`
	UserRelacionID primitive.ObjectID `bson:"_userRelacionId,omitempty" json:"_userRelacionId,omitempty"`
	Tweet          struct {
		ID      primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
		Mensaje string             `bson:"mensaje,omitempty" json:"mensaje,omitempty"`
		Fecha   time.Time          `bson:"fecha,omitempty" json:"fecha,omitempty"`
	} `bson:"tweet,omitempty" json:"tweet,omitempty"`
}
