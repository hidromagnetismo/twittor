package models

// Relacion modelo para grabar la relacion de un usuario con otro
type Relacion struct {
	UsuarioID         string `bson:"usuarioId" json:"usuarioId"`
	UsuarioRelacionID string `bson:"usuarioRelacionId" json:"usuarioRelacionId"`
}
