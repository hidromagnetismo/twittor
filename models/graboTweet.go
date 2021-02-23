package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GraboTweet es el modelo de un Tweet en la base datos MongoDB
type GraboTweet struct {
	ID               primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID           primitive.ObjectID `bson:"_userId,omitempty" json:"userId"`
	Titulo           string             `bson:"titulo" json:"titulo,omitempty"`
	Descripcion      string             `bson:"descripcion" json:"descripcion,omitempty"`
	FechaPublicacion time.Time          `bson:"fechaPublicacion" json:"fechaPublicacion,omitempty"`
	Image            string             `bson:"image" json:"image,omitempty"`
}
