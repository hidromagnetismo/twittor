package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GraboTweet es el formato o estructura que tendrá nuestro Tweet en la BD
type GraboTweet struct {
	UserID  primitive.ObjectID `bson:"_userId" json:"userId,omitempty"`
	Mensaje string             `bson:"mensaje" json:"mensaje,omitempty"`
	Fecha   time.Time          `bson:"fecha" json:"fecha,omitempty"`
}
