package models

import (
	"time"
)

// LeoTweets es el formato o estructura que tendrán los Tweets en la respuesta JSON
type LeoTweets struct {
	ID      string    `json:"_id,omitempty"`
	UserID  string    `json:"_userId,omitempty"`
	Mensaje string    `json:"mensaje,omitempty"`
	Fecha   time.Time `json:"fecha,omitempty"`
}
