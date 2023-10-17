//------------------------------------------------------------------------------
// Traveler Model Class for MongoDB
//
// Author: Rashmi Bhagya
// Created: October 10, 2023
// Modified: October 13, 2023
// Version: 1.0
//
// Description: This class represents the "Traveler" model for MongoDB, used in a travel booking system.
// It defines the structure of a traveler document, including properties like name, address, email, contact number,
// NIC, and active status, with default values.
//
//------------------------------------------------------------------------------
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TravelBookingSystem.Models
{
    [BsonIgnoreExtraElements]
    public class Traveler
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = "Traveler Name";

        [BsonElement("address")]
        public string Address { get; set; } = "Traveler Address";

        [BsonElement("email")]
        public string Email { get; set; } = "Traveler Email";

        [BsonElement("contactNo")]
        public string ContactNo { get; set; } = "Traveler Contact Number";

        [BsonElement("nic")]
        public string NIC { get; set; } = "Traveler NIC";

        [BsonElement("activeStatus")]
        public string ActiveStatus { get; set; } = "Active"; //default value
    }
}
