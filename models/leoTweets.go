package models

import (
	"time"
)

// LeoTweets es el formato o estructura que tendrán los Tweets en la respuesta JSON
type LeoTweets struct {
	UserID  string    `json:"userId,omitempty"`
	Mensaje string    `json:"mensaje,omitempty"`
	Fecha   time.Time `json:"fecha,omitempty"`
}
