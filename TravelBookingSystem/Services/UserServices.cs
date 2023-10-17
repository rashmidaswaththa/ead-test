using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TravelBookingSystem.Data;
using TravelBookingSystem.Models;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace TravelBookingSystem.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IConfiguration _userconfig;

        public UserServices(IConfiguration config)
        {
            _userconfig = config;
            var mongoClient = new MongoClient(_userconfig.GetConnectionString("ConnectionDB"));
            var mongoDb = mongoClient.GetDatabase("ticketbookingdb");

            _userCollection = mongoDb.GetCollection<User>("user");
            
        }

        //get all users
        public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

        //get user by id
        public async Task<User> GetAsync(string id) => await _userCollection.Find(t => t.Id == id).FirstOrDefaultAsync();

        //add new user
        public async Task CreateAsync(User newUser)
        {
            // Hash the password before storing it
            newUser.Password = HashPassword(newUser.Password);

            await _userCollection.InsertOneAsync(newUser);
        }

        //password hashing method
        private string HashPassword(string password)
        {
            // Generate a salt and hash the password with it using BCrypt
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        //update user
        public async Task UpdateAsync(string id, User updateUser) => await _userCollection.ReplaceOneAsync(t => t.Id == id, updateUser);

        //delete user
        public async Task RemoveAsync(string id) => await _userCollection.DeleteOneAsync(t => t.Id == id);

        //login user
        public async Task<Authentication> LoginAsync(UserLoginDto userLoginDto)
        {

            var user = await _userCollection
              .Find(u => u.Email == userLoginDto.Email)
              .FirstOrDefaultAsync();

            if (user != null && BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.Password))
            {
                var token = GenerateJwtToken(user);

                // Retrieve the user role from the user object or another source, and assign it to the role variable.
                string role = user.Role;
                string email = user.Email;
                string name = user.Name;// Replace this with how you retrieve the user's role.

                return new Authentication
                {
                    Token = token,
                    Role = role,
                    Email = email,
                    Name = name
                };
            }

            return null;
        }


        private string GenerateJwtToken(User user)
        {
            // Create a JWT security token.
            var token = new JwtSecurityToken(
                issuer: _userconfig["Jwt:Issuer"],
                audience: _userconfig["Jwt:Audience"],
                claims: new[]
                {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                },
                expires: DateTime.Now.AddMilliseconds(4 * 60 * 1000), // Set the expiration time to 30 minutes
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_userconfig["Jwt:Key"])), SecurityAlgorithms.HmacSha256));

            // Write the token to a string.
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }
    }
}

