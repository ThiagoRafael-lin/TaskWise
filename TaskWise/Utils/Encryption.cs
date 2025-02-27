namespace TaskWise.Utils
{
    public static class Encryption
    {
        public static String GenerateHash(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool CompareHash(string passwordForm, string passwordBank)
        {
            return BCrypt.Net.BCrypt.Verify(passwordForm, passwordBank);
        }

    }
}
