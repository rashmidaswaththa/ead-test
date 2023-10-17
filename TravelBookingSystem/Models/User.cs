//------------------------------------------------------------------------------
// User Model Class
//
// Author: Rashmi Bhagya
// Created: October 10, 2023
// Modified: October 13, 2023
// Version: 1.0
//
// Description: This file defines the "User" model class used in the Travel Booking System application.
// It represents a user with properties such as name, email, password, and role. It is also configured
// for MongoDB with Bson attributes for serialization and data storage.
//
//------------------------------------------------------------------------------
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace TravelBookingSystem.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        [Required]
        public string Name { get; set; } = "User Name";

        [BsonElement("nic")]
        [Required]
        public string NIC { get; set; } = "User NIC";

        [BsonElement("email")]
        [Required]
        public string Email { get; set; } = "User Email";

        [BsonElement("password")]
        [Required]
        public string Password { get; set; } = "User Password";

        [BsonElement("role")]
        [Required]
        public string Role { get; set; } = "User Role";
    }

}
