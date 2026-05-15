package core

type PlaceholderImageError struct {
	IsPlaceholderImageError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPlaceholderImageError(code string, msg string, ctx *Context) *PlaceholderImageError {
	return &PlaceholderImageError{
		IsPlaceholderImageError: true,
		Sdk:              "PlaceholderImage",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PlaceholderImageError) Error() string {
	return e.Msg
}
