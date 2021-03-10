package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GraboTweet es el formato o estructura que tendrá nuestro Tweet en la BD
type GraboTweet struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"     json:"_id,omitempty"`
	UserID  primitive.ObjectID `bson:"_userId,omitempty" json:"_userId,omitempty"`
	Mensaje string             `bson:"mensaje,omitempty" json:"mensaje,omitempty"`
	Fecha   time.Time          `bson:"fecha,omitempty"   json:"fecha,omitempty"`
}
