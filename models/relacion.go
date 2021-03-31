package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Relacion modelo para grabar la relacion de un usuario con otro
type Relacion struct {
	UserID         primitive.ObjectID `bson:"_userId,omitempty" json:"_userId,omitempty"`
	UserRelacionID primitive.ObjectID `bson:"_userRelacionId,omitempty" json:"_userRelacionId,omitempty"`
}
