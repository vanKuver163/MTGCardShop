namespace backend.Token
{
    public class RefreshToken
    {
        public string Token {get; set;}
        public string Username { get; set; }
        public DateTime ExpirationDate { get; set; }

    }
}