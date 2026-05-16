package core

type UnixConverterError struct {
	IsUnixConverterError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewUnixConverterError(code string, msg string, ctx *Context) *UnixConverterError {
	return &UnixConverterError{
		IsUnixConverterError: true,
		Sdk:              "UnixConverter",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *UnixConverterError) Error() string {
	return e.Msg
}
