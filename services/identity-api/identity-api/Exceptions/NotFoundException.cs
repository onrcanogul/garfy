namespace identity_api.Exceptions;

public class NotFoundException(string message) : Exception(message)
{
}