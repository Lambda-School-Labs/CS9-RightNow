package main

import (
	"net/http"
	"encoding/json"
	// "strings"
	"os"
	"log"
	"fmt"
	
	// JWT verification
	"github.com/gorilla/mux"
	"github.com/gorilla/context"
	"github.com/dgrijalva/jwt-go"
	"github.com/mitchellh/mapstructure"

	// mongodb
	// "github.com/mongodb/mongo-go-driver/mongo"

)


// Create user data first
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	// can add other parameter later
}

// this holds all the token data
type JwtToken struct {
	Token string `json:"token"`
}

// holds any error message that we want to return to user (specific to the error)
type Exception struct {
	Message string `json:"message"`
}

// user DB
var usersDB = []User{
	User{Username: "JamesMay", Password: "random1"},
	User{Username: "RichardHammond", Password: "random2"},
	User{Username: "JeremyClarkson", Password: "random3"},
}

// create token
func CreateTokenEndpoint(w http.ResponseWriter, req *http.Request) {
	var user User
    _ = json.NewDecoder(req.Body).Decode(&user) // decode json then assign to 'user'
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{ // jwt type, HS256 Algo; username/password
		"username": user.Username,
        "password": user.Password,
    })
    tokenString, error := token.SignedString([]byte("secret"))
    if error != nil {
        fmt.Println(error)
	}
    json.NewEncoder(w).Encode(JwtToken{Token: tokenString})
}

// protect endpoint: sample
// look for token parameter
func ProtectedEndpoint(w http.ResponseWriter, req *http.Request) {
	params := req.Header.Get("Authorization")
    token, _ := jwt.Parse(params, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("There was an error")
        }
        return []byte("secret"), nil
    })
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        var user User
        mapstructure.Decode(claims, &user)
        json.NewEncoder(w).Encode(user)
    } else {
        json.NewEncoder(w).Encode(Exception{Message: "Invalid authorization token"})
    }
} 

// middleware for user validation for every endpoint
func ValidateMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			authHeader := req.Header.Get("authorization")
			if authHeader != "" {
					if len(authHeader) == 1 {
							token, error := jwt.Parse(authHeader, func(token *jwt.Token) (interface{}, error) {
									if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
											return nil, fmt.Errorf("There was an error")
									}
									return []byte("secret"), nil
							})
							if error != nil {
									json.NewEncoder(w).Encode(Exception{Message: error.Error()})
									return
							}
							if token.Valid {
									context.Set(req, "decoded", token.Claims)
									next(w, req)
							} else {
									json.NewEncoder(w).Encode(Exception{Message: "Invalid authorization token"})
							}
					}
			} else {
					json.NewEncoder(w).Encode(Exception{Message: "An authorization header is required"})
			}
	})
}

func TestEndpoint(w http.ResponseWriter, req *http.Request) {
	decoded := context.Get(req, "decoded")
	var user User
	mapstructure.Decode(decoded.(jwt.MapClaims), &user)
	json.NewEncoder(w).Encode(user)
}

// invoked when user calls /status route; confirms API running
var StatusHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("API is up and running")) // confirm API running for now.
})

func main() {

	// instantiating gorilla/mux router
	r := mux.NewRouter()
	fmt.Println("Starting the application...")

	// On the default page we will simply serve our static index page.

	r.Handle("/status", StatusHandler).Methods("GET")

	r.HandleFunc("/authenticate", CreateTokenEndpoint).Methods("POST")
	r.HandleFunc("/protected", ProtectedEndpoint).Methods("GET")
	r.HandleFunc("/test", ValidateMiddleware(TestEndpoint)).Methods("GET")
	log.Fatal(http.ListenAndServe(":5000", r))
	
}